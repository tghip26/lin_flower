'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Facebook, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSent(true);
    setName('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-2 border-b border-stone-200 pb-6">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Tiệm hoa tươi uy tín Bắc Ninh</span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900">
          Liên Hệ & Ghé Thăm Lin Flower
        </h1>
        <p className="text-sm text-stone-500 max-w-xl mx-auto">
          Rất hân hạnh được tư vấn và phục vụ quý khách trực tiếp tại cửa hàng hoặc giao tận nơi trên toàn tỉnh Bắc Ninh.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl border border-stone-800">
            <h3 className="font-serif font-bold text-xl text-amber-300">CỬA HÀNG LIN FLOWER</h3>
            
            <ul className="space-y-4 text-xs sm:text-sm text-stone-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Địa chỉ tiệm hoa:</div>
                  <div>Khu phố 5, Thị trấn Phố Mới, Quế Võ, Bắc Ninh</div>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">Hotline Đặt Hàng & Tư Vấn:</div>
                  <a href="tel:0363819228" className="text-amber-300 font-extrabold text-base hover:underline">
                    0363 819 228
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">Fanpage Facebook:</div>
                  <div>Lin Flower (Quế Võ, Bắc Ninh)</div>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-stone-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">Giờ Phục Vụ:</div>
                  <div>07:00 – 21:30 (Mở cửa tất cả các ngày trong tuần)</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive map card */}
          <div className="bg-stone-100 rounded-3xl p-4 border border-stone-200 text-center space-y-2">
            <div className="font-bold text-xs text-stone-700">📍 Vị Trí Cửa Hàng Tại Thị Trấn Phố Mới</div>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-200 relative flex items-center justify-center">
              <iframe
                title="Lin Flower Map"
                src="https://maps.google.com/maps?q=Thị+trấn+Phố+Mới,+Quế+Võ,+Bắc+Ninh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Send Message Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-900 border-b pb-3">Gửi Tin Nhắn Cho Lin Flower</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Họ tên của bạn *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ tên"
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Nội dung thắc mắc hoặc góp ý</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bạn cần tư vấn về loại hoa nào, giá cả hay thời gian giao hàng..."
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
              ></textarea>
            </div>

            {sent && (
              <div className="p-3 bg-green-50 text-green-700 text-xs font-bold rounded-xl border border-green-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Cảm ơn bạn! Đã gửi lời nhắn thành công. Chúng tôi sẽ phản hồi trong ít phút.
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-black text-white font-bold py-3.5 rounded-2xl shadow-sm text-xs transition-all"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Gửi Lời Nhắn Ngay</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
