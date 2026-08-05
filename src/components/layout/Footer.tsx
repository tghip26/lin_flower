import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Facebook, Heart, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';
import { LinFlowerLogo } from '@/components/common/LinFlowerLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-8 border-t-4 border-brand-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800 text-center md:text-left">
          <div className="flex items-center gap-4 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Hoa Tươi Mỗi Ngày</h4>
              <p className="text-xs text-stone-400">Cam kết 100% hoa tươi mới chọn lọc từ vườn</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Giao Hoa Nhanh 2H</h4>
              <p className="text-xs text-stone-400">Giao hàng đúng hẹn tại Bắc Ninh & lân cận</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Thiết Kế Theo Yêu Cầu</h4>
              <p className="text-xs text-stone-400">Tư vấn mẫu hoa độc bản cá nhân hóa</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Đổi Trả 100% Lỗi Hoa</h4>
              <p className="text-xs text-stone-400">Hoàn tiền hoặc đổi sản phẩm nếu không hài lòng</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <LinFlowerLogo size={42} showText={false} />
              <span className="font-serif font-extrabold text-2xl text-white tracking-wider">
                LIN <span className="text-brand-400 font-serif">FLOWER</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-medium">
              Lin Flower – Trao trọn yêu thương, gửi trọn tâm ý. Chuyên cung cấp tráp cưới hỏi, giỏ trái cây, lẵng hoa khai trương, hoa bó sinh nhật và trang trí sự kiện chuyên nghiệp tại Bắc Ninh.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-brand-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="tel:0363819228" 
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-500 text-stone-300 hover:text-stone-900 flex items-center justify-center transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base text-amber-300">Thông Tin Liên Hệ</h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>Khu phố 5, Thị trấn Phố Mới, Quế Võ, Bắc Ninh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:0363819228" className="hover:text-white font-bold text-amber-300">
                  0363 819 228 (Tư Vấn & Đặt Hàng)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Facebook className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Fanpage: <strong className="text-white">Lin Flower</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-stone-400 flex-shrink-0" />
                <span>Giờ mở cửa: 07:00 – 21:30 (Tất cả các ngày)</span>
              </li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base text-amber-300">Danh Mục Nổi Bật</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/products?category=trap-cuoi-hoi" className="hover:text-white transition-colors">• Tráp Cưới Hỏi Truyền Thống</Link></li>
              <li><Link href="/products?category=gio-lang-trai-cay" className="hover:text-white transition-colors">• Giỏ / Lẵng Trái Cây Nhập Khẩu</Link></li>
              <li><Link href="/products?category=lang-chuc-mung" className="hover:text-white transition-colors">• Lẵng Hoa Khai Trương & Chúc Mừng</Link></li>
              <li><Link href="/products?category=hoa-bo" className="hover:text-white transition-colors">• Hoa Bó Sinh Nhật & Tình Yêu</Link></li>
              <li><Link href="/products?category=hoa-hieu" className="hover:text-white transition-colors">• Hoa Hiếu & Chia Buồn Tang Lễ</Link></li>
              <li><Link href="/products?category=trang-tri-su-kien" className="hover:text-white transition-colors">• Trang Trí Tiệc & Sự Kiện Trọn Gói</Link></li>
            </ul>
          </div>

          {/* Services & Support */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base text-amber-300">Dịch Vụ & Hỗ Trợ</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/custom-order" className="hover:text-white transition-colors font-bold text-amber-200">• Đặt Hoa Theo Yêu Cầu Riêng</Link></li>
              <li><Link href="/tracking" className="hover:text-white transition-colors">• Tra Cứu Tiến Độ Đơn Hàng</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">• Cẩm Nang & Mẹo Giữ Hoa Tươi</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">• Sơ Đồ Chỉ Đường Cửa Hàng</Link></li>
              <li><Link href="/admin" className="hover:text-amber-300 transition-colors">🔒 Cổng Quản Trị Admin / Staff</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Lin Flower. Trao Trọn Yêu Thương – Gửi Trọn Tâm Ý ♡</p>
          <p className="text-stone-600">Đại diện cửa hàng: Phố Mới, Quế Võ, Bắc Ninh</p>
        </div>

      </div>
    </footer>
  );
};
