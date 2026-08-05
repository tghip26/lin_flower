'use client';

import React, { useState, useEffect } from 'react';
import { QrCode, Send, Sparkles, CheckCircle2, AlertCircle, Shield, RefreshCw, Bot, Key } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminIntegrationsPage() {
  const { 
    vietQRConfig, 
    updateVietQRConfig, 
    telegramConfig, 
    updateTelegramConfig, 
    sendTelegramNotification,
    geminiConfig,
    updateGeminiConfig,
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

  // Gemini form state
  const [geminiApiKey, setGeminiApiKey] = useState(geminiConfig.apiKey);
  const [geminiModel, setGeminiModel] = useState(geminiConfig.model);
  const [geminiSystemPrompt, setGeminiSystemPrompt] = useState(geminiConfig.systemPrompt);
  const [geminiEnabled, setGeminiEnabled] = useState(geminiConfig.enabled);
  const [geminiSuccessMsg, setGeminiSuccessMsg] = useState(false);

  // Sync form state when store context finishes loading from localStorage
  useEffect(() => {
    setAccountNo(vietQRConfig.accountNo);
    setAccountName(vietQRConfig.accountName);
    setBankCode(vietQRConfig.bankCode);
    setBankName(vietQRConfig.bankName);
    setQrEnabled(vietQRConfig.enabled);
  }, [vietQRConfig]);

  useEffect(() => {
    setBotToken(telegramConfig.botToken);
    setChatId(telegramConfig.chatId);
    setTelegramEnabled(telegramConfig.enabled);
    setNotifyOnNewOrder(telegramConfig.notifyOnNewOrder);
    setNotifyOnStatusChange(telegramConfig.notifyOnStatusChange);
  }, [telegramConfig]);

  useEffect(() => {
    setGeminiApiKey(geminiConfig.apiKey);
    setGeminiModel(geminiConfig.model);
    setGeminiSystemPrompt(geminiConfig.systemPrompt);
    setGeminiEnabled(geminiConfig.enabled);
  }, [geminiConfig]);

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
    setTelegramTestStatus({ type: 'success', text: '✓ Đã lưu cấu hình Telegram Bot thành công!' });
    setTimeout(() => setTelegramTestStatus(null), 3000);
  };

  const handleSaveGemini = (e: React.FormEvent) => {
    e.preventDefault();
    updateGeminiConfig({
      apiKey: geminiApiKey,
      model: geminiModel,
      systemPrompt: geminiSystemPrompt,
      enabled: geminiEnabled,
    });
    setGeminiSuccessMsg(true);
    setTimeout(() => setGeminiSuccessMsg(false), 3000);
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
          Cài Đặt Tích Hợp VietQR, Telegram Bot & AI Chatbot Gemini
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Cấu hình mã QR thanh toán ngân hàng tự động, Telegram thông báo và Chatbot tư vấn AI bằng Google Gemini API
        </p>
      </div>

      {/* Section 3: Gemini AI Chatbot Config */}
      <div className="bg-gradient-to-r from-stone-900 via-brand-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 border border-amber-400/30">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white flex items-center gap-2">
                <span>3. Cấu Hình Gemini AI Chatbot Tư Vấn Khách Hàng</span>
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              </h3>
              <p className="text-xs text-stone-300">Gắn Gemini API Key riêng để trợ lý AI tự động tư vấn mẫu hoa 24/7</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveGemini} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8">
              <label className="font-bold text-amber-300 block mb-1 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-amber-300" />
                <span>Google Gemini API Key *</span>
              </label>
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX..."
                className="w-full p-3 bg-stone-800 text-white border border-stone-700 rounded-xl font-mono text-xs focus:ring-1 focus:ring-amber-400"
              />
              <span className="text-[10px] text-stone-400">Lấy API Key miễn phí từ Google AI Studio (aistudio.google.com)</span>
            </div>

            <div className="sm:col-span-4">
              <label className="font-bold text-amber-300 block mb-1">Mô Hình AI Model</label>
              <select
                value={geminiModel}
                onChange={(e) => setGeminiModel(e.target.value)}
                className="w-full p-3 bg-stone-800 text-white border border-stone-700 rounded-xl font-bold text-xs"
              >
                <option value="gemini-1.5-flash">gemini-1.5-flash (Nhanh & Tối ưu)</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash (Thế hệ mới nhất)</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro (Tư vấn chuyên sâu)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-amber-300 block mb-1">Câu Lệnh Chỉ Dẫn Hệ Thống (System Prompt)</label>
            <textarea
              rows={3}
              value={geminiSystemPrompt}
              onChange={(e) => setGeminiSystemPrompt(e.target.value)}
              placeholder="Nhập prompt điều hướng cho AI..."
              className="w-full p-3 bg-stone-800 text-white border border-stone-700 rounded-xl text-xs font-medium"
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-white">
              <input
                type="checkbox"
                checked={geminiEnabled}
                onChange={(e) => setGeminiEnabled(e.target.checked)}
                className="accent-amber-400 rounded w-4 h-4"
              />
              <span>Hiển thị Bong Bóng Chatbot AI Tư Vấn ở góc màn hình khách hàng</span>
            </label>

            <button
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-6 py-3 rounded-xl shadow-lg active:scale-95 transition-all text-xs"
            >
              Lưu Cấu Hình Gemini AI
            </button>
          </div>

          {geminiSuccessMsg && (
            <div className="p-3 bg-green-500/20 text-green-300 font-bold rounded-xl border border-green-400/40 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Đã lưu Gemini API Key & Cấu hình Chatbot thành công! Chatbot AI đã sẵn sàng hoạt động.</span>
            </div>
          )}
        </form>
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
              <div className="p-2.5 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Đã lưu cấu hình VietQR vào hệ thống thành công!</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl shadow-pink-soft active:scale-95 transition-all text-xs"
              >
                Lưu Cấu Hình VietQR
              </button>
            </div>
          </form>

          {/* Live Preview Card */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-center">
            <div className="text-xs font-bold text-stone-700">Xem Trước Mã QR Ngân Hàng Tự Động</div>
            <img src={previewQRUrl} alt="Live QR Preview" className="w-36 h-36 mx-auto rounded-xl border bg-white p-1 shadow-sm" />
            <div className="text-[11px] text-stone-600 font-semibold">{bankName} - STK: <span className="text-brand-700 font-bold">{accountNo}</span></div>
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
              <div className={`p-2.5 font-bold rounded-xl border flex items-center gap-1.5 ${telegramTestStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                {telegramTestStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                <span>{telegramTestStatus.text}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleTestTelegram}
                disabled={isSendingTest}
                className="bg-stone-800 hover:bg-black text-amber-300 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                {isSendingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Gửi Thử Tin Nhắn</span>
              </button>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-sm active:scale-95"
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
