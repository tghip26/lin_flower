'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Sparkles, Trophy, CheckCircle, AlertCircle, ShieldCheck, Laptop, Disc } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import confetti from 'canvas-confetti';

export const LuckyWheelModal: React.FC = () => {
  const { luckyWheelConfig, applyVoucher, addLuckyWheelSpinLog } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<{ code: string; label: string; discountText: string } | null>(null);
  
  const [clientIp, setClientIp] = useState<string>('Đang kiểm tra IP...');
  const [deviceId, setDeviceId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [spinsLeftToday, setSpinsLeftToday] = useState(luckyWheelConfig.dailyLimit);

  const activePrizes = luckyWheelConfig.prizes.filter((p) => p.active);

  // Initialize or retrieve persistent device fingerprint UUID
  useEffect(() => {
    try {
      let dId = localStorage.getItem('lin_flower_device_id');
      if (!dId) {
        dId = 'DEV-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
        localStorage.setItem('lin_flower_device_id', dId);
        document.cookie = `lin_flower_device_id=${dId}; path=/; max-age=31536000`;
      }
      setDeviceId(dId);

      const todayStr = new Date().toISOString().split('T')[0];
      const savedSpinCount = localStorage.getItem(`lin_flower_spins_${todayStr}_${dId}`);
      const count = savedSpinCount ? parseInt(savedSpinCount, 10) : 0;
      setSpinsLeftToday(Math.max(0, luckyWheelConfig.dailyLimit - count));
    } catch (e) {
      setSpinsLeftToday(luckyWheelConfig.dailyLimit);
    }
  }, [luckyWheelConfig.dailyLimit, isOpen]);

  if (!luckyWheelConfig.enabled || activePrizes.length === 0) return null;

  const handleSpin = async () => {
    if (isSpinning || wonPrize || spinsLeftToday <= 0) return;

    setIsSpinning(true);
    setErrorMessage(null);

    try {
      // Call Server Anti-Cheat IP API
      const res = await fetch('/api/lucky-wheel/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId,
          dailyLimit: luckyWheelConfig.dailyLimit,
          prizes: activePrizes,
        }),
      });

      const data = await res.json();
      if (data.clientIp) setClientIp(data.clientIp);

      if (!res.ok || !data.allowed) {
        setIsSpinning(false);
        setErrorMessage(data.message || 'Máy hoặc địa chỉ IP của bạn đã dùng hết lượt quay hôm nay!');
        setSpinsLeftToday(0);
        return;
      }

      const { wonPrize: prizeResult, wonIndex } = data;

      // Animate Rotation to align pointer with winner
      const extraRounds = 6 * 360;
      const segmentAngle = 360 / activePrizes.length;
      const targetAngle = rotation + extraRounds + (activePrizes.length - wonIndex) * segmentAngle - segmentAngle / 2;

      setRotation(targetAngle);

      setTimeout(() => {
        setIsSpinning(false);
        setWonPrize(prizeResult);

        // Record persistent Local Device Spin Limit
        const todayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem(`lin_flower_spins_${todayStr}_${deviceId}`, '1');
        setSpinsLeftToday(0);

        // Auto apply voucher & record admin log
        applyVoucher(prizeResult.code);
        addLuckyWheelSpinLog({
          prizeLabel: prizeResult.label,
          code: prizeResult.code,
          clientIp: data.clientIp || '14.226.18.92',
          deviceId,
        });

        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 }
        });
      }, 4200);

    } catch (e: any) {
      setIsSpinning(false);
      setErrorMessage('Lỗi kết nối kiểm tra IP máy. Bạn thử lại nhé!');
    }
  };

  return (
    <>
      {/* Redesigned Sleek & Compact Floating Button on BOTTOM-LEFT Corner */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 left-6 z-40 flex items-center"
          >
            {/* Soft Glowing Ring */}
            <span className="absolute inset-0 rounded-full bg-amber-400/40 opacity-70 animate-ping pointer-events-none"></span>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-stone-950 px-3.5 py-2.5 rounded-full shadow-xl shadow-amber-500/30 border border-amber-200/90 active:scale-95 transition-all cursor-pointer group backdrop-blur-md"
            >
              <div className="relative flex items-center justify-center w-7 h-7 bg-stone-950 text-amber-300 rounded-full shadow-inner">
                <Disc className="w-4 h-4 animate-[spin_8s_linear_infinite]" />
              </div>

              <div className="text-left hidden sm:block">
                <div className="text-xs font-serif font-black text-stone-950 flex items-center gap-1">
                  <span>Vòng Quay Lộc</span>
                  <Sparkles className="w-3 h-3 text-rose-800" />
                </div>
                <div className="text-[10px] text-stone-900 font-bold">
                  {spinsLeftToday > 0 ? '🎁 Còn 1 lượt quay' : '🔒 Đã quay hôm nay'}
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-5 shadow-2xl border border-brand-100 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Khóa IP Theo Máy Bảo Mật
                </div>
                <h3 className="font-serif font-extrabold text-2xl text-stone-900">Vòng Quay May Mắn</h3>
                <p className="text-xs text-stone-500">
                  Mỗi thiết bị / IP chỉ được <strong className="text-brand-600 font-bold">1 lượt quay miễn phí / ngày</strong>
                </p>
              </div>

              {/* Dynamic SVG Wheel */}
              <div className="relative w-60 h-60 mx-auto flex items-center justify-center">
                {/* Pointer Arrow */}
                <div className="absolute -top-3 z-30 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[22px] border-t-brand-600 filter drop-shadow-md"></div>

                {/* SVG Rotatable Wheel */}
                <div
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 4.2s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
                  }}
                  className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden relative"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {activePrizes.map((p, idx) => {
                      const total = activePrizes.length;
                      const sliceAngle = 360 / total;
                      const startAngle = idx * sliceAngle;
                      const endAngle = (idx + 1) * sliceAngle;

                      const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                      const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                      const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                      const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);
                      const largeArc = sliceAngle > 180 ? 1 : 0;

                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;
                      const textAngle = startAngle + sliceAngle / 2;

                      return (
                        <g key={p.id}>
                          <path d={pathData} fill={p.color} stroke="#ffffff" strokeWidth="0.8" />
                          <text
                            x="50"
                            y="22"
                            fill="#ffffff"
                            fontSize="5.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            transform={`rotate(${textAngle}, 50, 50)`}
                          >
                            {p.label.length > 12 ? p.label.substring(0, 12) + '..' : p.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Center Spin Trigger Button */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || spinsLeftToday <= 0 || !!wonPrize}
                  className="absolute z-20 w-16 h-16 rounded-full bg-stone-900 hover:bg-black text-amber-300 font-serif font-extrabold text-xs border-2 border-amber-400 shadow-2xl flex flex-col items-center justify-center active:scale-90 transition-all disabled:opacity-80 cursor-pointer"
                >
                  {isSpinning ? '...' : wonPrize ? 'Đã Quay' : spinsLeftToday <= 0 ? 'Hết Lượt' : 'QUAY'}
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 p-3.5 rounded-2xl border border-red-200 text-xs text-red-700 font-bold flex items-center gap-2 text-left animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Won Result Notice */}
              {wonPrize && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1.5 text-xs text-amber-950 animate-in fade-in">
                  <div className="font-bold flex items-center justify-center gap-1 text-amber-800">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>Chúc mừng! Bạn nhận được:</span>
                  </div>
                  <div className="font-serif font-extrabold text-lg text-brand-700">{wonPrize.label}</div>
                  <div className="text-[11px] text-stone-600">
                    Mã <strong className="bg-white px-2 py-0.5 rounded font-mono font-bold border border-amber-300">{wonPrize.code}</strong> đã tự động được áp dụng vào giỏ hàng!
                  </div>
                </div>
              )}

              {/* Device IP Badge */}
              <div className="flex items-center justify-between bg-stone-100 px-3 py-2 rounded-xl text-[10px] text-stone-500 font-semibold border border-stone-200">
                <span className="flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5 text-stone-400" />
                  <span>IP Máy: {clientIp}</span>
                </span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{spinsLeftToday > 0 ? 'Khả dụng 1/1' : 'Đã dùng 1/1'}</span>
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-stone-900 hover:bg-black text-white font-bold text-xs py-3 rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                Đóng & Xem Giỏ Hàng
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
