import { NextResponse } from 'next/server';

// In-memory IP Spin tracker for current server session (IP + YYYY-MM-DD -> spin count)
const ipSpinStore = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const { deviceId, dailyLimit = 1, prizes = [] } = await req.json();

    // Extract client IP address
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfIp = req.headers.get('cf-connecting-ip');
    
    let clientIp = (forwardedFor ? forwardedFor.split(',')[0] : realIp || cfIp || '127.0.0.1').trim();
    if (clientIp === '::1' || clientIp === '127.0.0.1') {
      clientIp = '14.226.18.92 (Local Device IP)'; // Friendly local demo IP
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const ipKey = `${clientIp}_${todayStr}`;
    const deviceKey = `${deviceId || 'unknown_device'}_${todayStr}`;

    const currentIpSpins = ipSpinStore.get(ipKey) || 0;
    const currentDeviceSpins = ipSpinStore.get(deviceKey) || 0;

    // Strict Anti-Cheating IP & Device Verification
    if (currentIpSpins >= dailyLimit || currentDeviceSpins >= dailyLimit) {
      return NextResponse.json({
        allowed: false,
        clientIp,
        message: `⛔ Địa chỉ IP / Máy của bạn (${clientIp}) đã dùng hết ${dailyLimit} lượt quay miễn phí hôm nay!`,
      }, { status: 400 });
    }

    // Filter active prizes
    const activePrizes = prizes.filter((p: any) => p.active);
    if (activePrizes.length === 0) {
      return NextResponse.json({ allowed: false, message: 'Hiện chưa có phần thưởng khả dụng.' }, { status: 400 });
    }

    // Weighted Probability Selection algorithm
    const totalWeight = activePrizes.reduce((sum: number, p: any) => sum + Number(p.probability || 1), 0);
    let randomVal = Math.random() * (totalWeight || 100);
    let wonPrize = activePrizes[0];
    let wonIndex = 0;

    for (let i = 0; i < activePrizes.length; i++) {
      if (randomVal < activePrizes[i].probability) {
        wonPrize = activePrizes[i];
        wonIndex = i;
        break;
      }
      randomVal -= activePrizes[i].probability;
    }

    // Record Spin for IP and Device Key
    ipSpinStore.set(ipKey, currentIpSpins + 1);
    ipSpinStore.set(deviceKey, currentDeviceSpins + 1);

    return NextResponse.json({
      allowed: true,
      clientIp,
      wonPrize,
      wonIndex,
      spinsRemainingToday: Math.max(0, dailyLimit - (currentIpSpins + 1))
    });

  } catch (error: any) {
    return NextResponse.json({ allowed: false, message: error?.message || 'Server error' }, { status: 500 });
  }
}
