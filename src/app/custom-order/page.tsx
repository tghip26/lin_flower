'use client';

import React, { useState } from 'react';
import { Sparkles, Upload, CheckCircle2, PhoneCall, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function CustomOrderPage() {
  const { submitCustomRequest } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('1.000.000đ - 1.500.000đ');
  const [mainColor, setMainColor] = useState('Hồng Pastel & Trắng');
  const [occasion, setOccasion] = useState('Sinh nhật');
  const [note, setNote] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [submitted, setSubmitted] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('Vui lòng điền họ tên và số điện thoại liên hệ!');
      return;
    }

    const req = submitCustomRequest({
      customerName,
      phone,
      budget,
      mainColor,
      occasion,
      note,
      imageUrl,
    });

    setSubmitted(req);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-700 to-stone-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-300/30">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Dịch Vụ Thiết Kế Hoa Theo Yêu Cầu Riêng
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-white">
          Sáng Tạo Tác Phẩm Hoa Độc Bản Cùng Lin Flower
        </h1>
        <p className="text-xs sm:text-sm text-stone-200 max-w-xl mx-auto leading-relaxed">
          Gửi cho chúng tôi ý tưởng, tông màu hoặc hình ảnh mẫu hoa bạn ưng ý. Đội ngũ thợ hoa lành nghề sẽ tư vấn & thiết kế chuẩn xác nhất!
        </p>
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-3xl border border-green-200 shadow-lg text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">Đã Gửi Yêu Cầu Thành Công!</h2>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Mã yêu cầu của bạn là <strong className="text-brand-700">{submitted.id}</strong>. Nhân viên chăm sóc khách hàng Lin Flower sẽ gọi điện tư vấn chốt mẫu & báo giá cụ thể qua SĐT <strong className="text-stone-900">{submitted.phone}</strong> trong 15 phút!
          </p>

          <button
            onClick={() => setSubmitted(null)}
            className="bg-brand-600 text-white font-bold text-xs px-6 py-3 rounded-full shadow-pink-soft"
          >
            Gửi Thêm Yêu Cầu Khác
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          
          <h3 className="font-serif font-bold text-xl text-stone-900 border-b pb-3">Điền Thông Tin Thiết Kế Hoa</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Họ và tên của bạn *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Số điện thoại Zalo / Liên hệ *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0988xxxxxx"
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Dịp tặng mừng</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
              >
                <option value="Sinh nhật">Sinh nhật</option>
                <option value="Khai trương">Khai trương</option>
                <option value="Cưới hỏi">Cưới hỏi / Gia tiên</option>
                <option value="Tình yêu / Valentine">Tình yêu / Valentine</option>
                <option value="Chia buồn / Tang lễ">Chia buồn / Tang lễ</option>
                <option value="Sự kiện / Hội nghị">Sự kiện / Hội nghị</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Ngân sách dự kiến</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl font-semibold text-brand-700"
              >
                <option value="500.000đ - 800.000đ">500.000đ - 800.000đ</option>
                <option value="1.000.000đ - 1.500.000đ">1.000.000đ - 1.500.000đ</option>
                <option value="2.000.000đ - 3.500.000đ">2.000.000đ - 3.500.000đ</option>
                <option value="Trên 5.000.000đ (VIP)">Trên 5.000.000đ (Dòng VIP)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Tone màu chủ đạo</label>
              <select
                value={mainColor}
                onChange={(e) => setMainColor(e.target.value)}
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
              >
                <option value="Hồng Pastel & Trắng">Hồng Pastel & Trắng</option>
                <option value="Đỏ Nhượng Rực Rỡ">Đỏ Nhung Rực Rỡ</option>
                <option value="Vàng Hoàng Gia & Cam">Vàng Hoàng Gia & Cam</option>
                <option value="Tím Lãng Mạn">Tím Lãng Mạn</option>
                <option value="Xanh Mint & Cẩm Tú Cầu">Xanh Mint & Cẩm Tú Cầu</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Link hoặc URL ảnh mẫu hoa bạn thích (Tùy chọn)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://domain.com/sample-flower.jpg..."
              className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Ghi chú chi tiết thêm cho thợ hoa</label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi rõ loài hoa bạn yêu thích (ví dụ: dùng hoa Tulip, hoa Baby, gói giấy nơ voan)..."
              className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-3.5 rounded-2xl shadow-pink-soft text-sm transition-all"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Gửi Yêu Cầu Thiết Kế Hoa</span>
          </button>
        </form>
      )}

    </div>
  );
}
