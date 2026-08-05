'use client';

import React, { useState } from 'react';
import { QrCode, Send, Sparkles, CheckCircle2, AlertCircle, Shield, RefreshCw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminIntegrationsPage() {
  const { 
    vietQRConfig, 
    updateVietQRConfig, 
    telegramConfig, 
    updateTelegramConfig, 
    sendTelegramNotification,
    userRole 
  } = useStore();

  // VietQR form state
  const [accountNo, setAccountNo] = useState(vietQRConfig.accountNo);
  const [accountName, setAccountName] = useState(vietQRConfig.accountName);
  const [bankCode, setBankCode] = useState(vietQRConfig.bankCode);
  const [bankName, setBankName] = useState(vietQRConfig.bankName);
  const [qrEnabled, setQrEnabled] = useState(vietQRConfig.enabled);
  const [vietQRSuccessMsg, setVietQRSuccessMsg] = useState(false);

  // Telegram form state
  const [botToken, setBotToken] = useState(telegramConfig.botToken);
  const [chatId, setChatId] = useState(telegramConfig.chatId);
  const [telegramEnabled, setTelegramEnabled] = useState(telegramConfig.enabled);
  const [notifyOnNewOrder, setNotifyOnNewOrder] = useState(telegramConfig.notifyOnNewOrder);
  const [notifyOnStatusChange, setNotifyOnStatusChange] = useState(telegramConfig.notifyOnStatusChange);
  
  const [telegramTestStatus, setTelegramTestStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const handleSaveVietQR = (e: React.FormEvent) => {
    e.preventDefault();
    updateVietQRConfig({
      accountNo,
      accountName,
      bankCode,
      bankName,
      enabled: qrEnabled,
    });
    setVietQRSuccessMsg(true);
    setTimeout(() => setVietQRSuccessMsg(false), 3000);
  };

  const handleSaveTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    updateTelegramConfig({
      botToken,
      chatId,
      enabled: telegramEnabled,
      notifyOnNewOrder,
      notifyOnStatusChange,
    });
    setTelegramTestStatus({ type: 'success', text: 'Đã lưu cấu hình Telegram Bot thành công!' });
    setTimeout(() => setTelegramTestStatus(null), 3000);
  };

  const handleTestTelegram = async () => {
    setIsSendingTest(true);
    setTelegramTestStatus(null);

    const testMsg = `
<b>🌸 THÔNG BÁO THỬ NGHIỆM TỪ LIN FLOWER!</b>
---------------------------------
<b>Hệ thống:</b> Kết nối Telegram Bot thành công!
<b>Thời gian:</b> ${new Date().toLocaleString('vi-VN')}
<b>Trạng thái:</b> Sẵn sàng nhận thông báo đơn hàng mới.
---------------------------------
<i>Trao trọn yêu thương – Gửi trọn tâm ý ♡</i>
    `;

    const res = await sendTelegramNotification(testMsg);
    setIsSendingTest(false);
    if (res.success) {
      setTelegramTestStatus({ type: 'success', text: '✓ ' + res.message });
    } else {
      setTelegramTestStatus({ type: 'error', text: '❌ ' + res.message });
    }
  };

  const previewQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STK:${accountNo}-${bankCode}-ND:TEST-AM:500000`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="border-b pb-4 border-stone-200">
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
          Cài Đặt Tích Hợp VietQR & Telegram Bot
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Cấu hình mã QR thanh toán ngân hàng tự động và hệ thống đẩy thông báo đơn hàng live qua Telegram
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Section 1: VietQR Bank Config */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b pb-3">
            <QrCode className="w-5 h-5 text-brand-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900">1. Cấu Hình VietQR Thanh Toán</h3>
          </div>

          <form onSubmit={handleSaveVietQR} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Tên Chủ Tài Khoản *</label>
              <input
                type="text"
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="LIN FLOWER - BAC NINH"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Số Tài Khoản *</label>
                <input
                  type="text"
                  required
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  placeholder="0363819228"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono font-bold text-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mã Ngân Hàng *</label>
                <select
                  value={bankCode}
                  onChange={(e) => {
                    setBankCode(e.target.value);
                    if (e.target.value === 'MBBANK') setBankName('Ngân Hàng Quân Đội (MB Bank)');
                    if (e.target.value === 'VCB') setBankName('Ngân Hàng Vietcombank');
                    if (e.target.value === 'TCB') setBankName('Ngân Hàng Techcombank');
                    if (e.target.value === 'VPB') setBankName('Ngân Hàng VPBank');
                  }}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                >
                  <option value="MBBANK">MB Bank (MB)</option>
                  <option value="VCB">Vietcombank (VCB)</option>
                  <option value="TCB">Techcombank (TCB)</option>
                  <option value="VPB">VPBank (VPB)</option>
                  <option value="ACB">ACB</option>
                  <option value="BIDV">BIDV</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Tên Đầy Đủ Ngân Hàng</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-800">
                <input
                  type="checkbox"
                  checked={qrEnabled}
                  onChange={(e) => setQrEnabled(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>Kích hoạt phương thức thanh toán VietQR trên trang Checkout</span>
              </label>
            </div>

            {vietQRSuccessMsg && (
              <div className="p-2.5 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200">
                ✓ Đã lưu cài đặt VietQR thành công!
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl shadow-pink-soft transition-colors"
              >
                Lưu Cấu Hình VietQR
              </button>
            </div>
          </form>

          {/* Live Preview Card */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-center">
            <div className="text-xs font-bold text-stone-700">Xem Trước Mã QR Ngân Hàng</div>
            <img src={previewQRUrl} alt="Live QR Preview" className="w-36 h-36 mx-auto rounded-xl border bg-white p-1" />
            <div className="text-[11px] text-stone-500">{bankName} - STK: {accountNo}</div>
          </div>
        </div>

        {/* Section 2: Telegram Bot Config */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b pb-3">
            <Send className="w-5 h-5 text-blue-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900">2. Cấu Hình Telegram Bot Thông Báo</h3>
          </div>

          <form onSubmit={handleSaveTelegram} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Telegram Bot Token *</label>
              <input
                type="text"
                required
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                placeholder="7123456789:AAF_xxxxxxx..."
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
              <span className="text-[10px] text-stone-400">Tạo bot từ @BotFather trên Telegram để lấy Token</span>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Telegram Chat ID / Group ID *</label>
              <input
                type="text"
                required
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                placeholder="-100987654321 hoặc 123456789"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
              />
              <span className="text-[10px] text-stone-400">Thêm bot vào nhóm thông báo Lin Flower để lấy Chat ID</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-800">
                <input
                  type="checkbox"
                  checked={telegramEnabled}
                  onChange={(e) => setTelegramEnabled(e.target.checked)}
                  className="accent-blue-600 rounded"
                />
                <span>Bật tính năng gửi thông báo tự động qua Telegram</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-700 pl-4">
                <input
                  type="checkbox"
                  checked={notifyOnNewOrder}
                  onChange={(e) => setNotifyOnNewOrder(e.target.checked)}
                  className="accent-blue-600 rounded"
                />
                <span>Gửi tin nhắn khi có Đơn hàng mới</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-700 pl-4">
                <input
                  type="checkbox"
                  checked={notifyOnStatusChange}
                  onChange={(e) => setNotifyOnStatusChange(e.target.checked)}
                  className="accent-blue-600 rounded"
                />
                <span>Gửi tin nhắn khi đổi trạng thái đơn (Đang cắm, Đang giao...)</span>
              </label>
            </div>

            {telegramTestStatus && (
              <div className={`p-2.5 font-bold rounded-xl border ${telegramTestStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                {telegramTestStatus.text}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleTestTelegram}
                disabled={isSendingTest}
                className="bg-stone-800 hover:bg-black text-amber-300 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                {isSendingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Gửi Thử Tin Nhắn</span>
              </button>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Lưu Cấu Hình Telegram
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}
