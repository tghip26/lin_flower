'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, Heart, ShoppingBag, ArrowRight, Gift, Award, 
  Flower2, Star, CheckCircle, PhoneCall, MapPin 
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/products/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';

export default function HomePage() {
  const { products, categories, reviews } = useStore();
  const [activeTab, setActiveTab] = useState<string>('all');

  const bestSellers = products.filter(p => p.isBestSeller);

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.occasions.includes(activeTab) || p.categoryId === activeTab);

  return (
    <PageTransition>
      <div className="space-y-16 pb-16">

        {/* Hero Banner Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-pink-50/40 to-[#FFFDF9] pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="lg:col-span-7 space-y-6 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-100 to-amber-100 text-brand-800 text-xs sm:text-sm font-bold px-4 py-2 rounded-full border border-brand-200 shadow-sm animate-pulse">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Tiệm Hoa Tươi Hàng Đầu Tại Quế Võ - Bắc Ninh</span>
                </div>

                <div className="space-y-2">
                  <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-tight">
                    <span className="text-brand-700">LIN</span> FLOWER
                  </h1>
                  <p className="font-serif italic text-lg sm:text-2xl text-brand-600 font-medium tracking-wide">
                    TRAO TRỌN YÊU THƯƠNG – GỬI TRỌN TÂM Ý ♡
                  </p>
                </div>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Chuyên cung cấp <strong className="text-stone-800">Tráp cưới hỏi</strong>, <strong className="text-stone-800">Giỏ trái cây nhập khẩu</strong>, <strong className="text-stone-800">Lẵng khai trương</strong>, <strong className="text-stone-800">Bó hoa sinh nhật</strong> & <strong className="text-stone-800">Trang trí sự kiện trọn gói</strong>.
                </p>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/80 p-3 rounded-2xl border border-brand-100 shadow-sm text-center transform hover:scale-105 transition-transform">
                    <div className="text-brand-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1">
                      💎 <span>HOA TƯƠI MỖI NGÀY</span>
                    </div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-2xl border border-brand-100 shadow-sm text-center transform hover:scale-105 transition-transform">
                    <div className="text-brand-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1">
                      💖 <span>DỊCH VỤ TẬN TÂM</span>
                    </div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-2xl border border-brand-100 shadow-sm text-center transform hover:scale-105 transition-transform">
                    <div className="text-brand-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1">
                      ✏️ <span>THIẾT KẾ YÊU CẦU</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    href="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-pink-soft hover:shadow-pink-glow active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Xem Tất Cả Mẫu Hoa</span>
                  </Link>

                  <Link
                    href="/custom-order"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-800 font-bold text-base px-7 py-4 rounded-full border-2 border-brand-200 hover:border-brand-400 active:scale-95 transition-all shadow-sm"
                  >
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Thiết Kế Theo Yêu Cầu</span>
                  </Link>
                </div>

                {/* Contact info pill */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-stone-600">
                  <a href="tel:0363819228" className="flex items-center gap-1.5 text-brand-700 hover:underline active:scale-95">
                    <PhoneCall className="w-4 h-4 text-brand-600" />
                    <span>Hotline: <strong>0363 819 228</strong></span>
                  </a>
                  <span className="text-stone-300">•</span>
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Khu phố 5, Thị trấn Phố Mới, Quế Võ, Bắc Ninh</span>
                  </span>
                </div>
              </motion.div>

              {/* Right Hero Image Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="lg:col-span-5 relative"
              >
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Floating badges */}
                  <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-brand-100 z-10 hidden sm:flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-100 text-brand-600 flex items-center justify-center font-bold">
                      100%
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-800">Hoa Tươi Mới</div>
                      <div className="text-[10px] text-stone-500">Nhập trực tiếp Đà Lạt</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-brand-100 z-10 hidden sm:flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                      🚀
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-800">Giao Nhanh 2H</div>
                      <div className="text-[10px] text-stone-500">Tận tay người nhận</div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-stone-100 aspect-[4/3] sm:aspect-square">
                    <img
                      src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=1000"
                      alt="Lin Flower Hero Presentation"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FLOWER MENU SECTION (Visual Match of Prompt Banner) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <div className="font-serif italic text-lg text-brand-600 tracking-wider">
              ~ FLOWER MENU ~
            </div>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900">
              Danh Mục Sản Phẩm & Dịch Vụ Hoa
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent mx-auto rounded-full"></div>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  href={`/products?category=${cat.id}`}
                  className="group bg-white rounded-3xl p-6 border border-brand-100/80 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between h-full active:scale-98"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                        {cat.id === 'trap-cuoi-hoi' && <Gift className="w-7 h-7" />}
                        {cat.id === 'gio-lang-trai-cay' && <ShoppingBag className="w-7 h-7" />}
                        {cat.id === 'lang-chuc-mung' && <Award className="w-7 h-7" />}
                        {cat.id === 'hoa-bo' && <Heart className="w-7 h-7" />}
                        {cat.id === 'hoa-hieu' && <Flower2 className="w-7 h-7" />}
                        {cat.id === 'trang-tri-su-kien' && <Sparkles className="w-7 h-7" />}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-brand-600 transition-colors">
                          {cat.name}
                        </h3>
                        <span className="text-xs text-brand-600 font-semibold">Xem chi tiết & đặt mẫu →</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                      {cat.description}
                    </p>

                    <ul className="space-y-1.5 text-xs text-stone-500">
                      {cat.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 overflow-hidden rounded-2xl aspect-[16/9]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BEST SELLERS SHOWCASE */}
        <section className="bg-stone-50 py-16 border-y border-stone-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-brand-600 uppercase tracking-widest">Sản phẩm yêu thích nhất</span>
                <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900 mt-1">
                  Mẫu Hoa Bán Chạy Tại Lin Flower
                </h2>
              </div>

              <Link
                href="/products?bestseller=true"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 active:scale-95"
              >
                <span>Xem tất cả mẫu hot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>

        {/* OCCASION FILTERING SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif font-extrabold text-3xl text-stone-900">
              Chọn Hoa Theo Dịp Kỷ Niệm
            </h2>
            <p className="text-sm text-stone-500">
              Tìm kiếm mẫu hoa phù hợp cho từng khoảnh khắc đáng nhớ trong cuộc sống
            </p>

            {/* Occasion Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: 'all', label: 'Tất cả mẫu hoa' },
                { id: 'Sinh nhật', label: '🎂 Sinh nhật' },
                { id: 'Khai trương', label: '🎉 Khai trương' },
                { id: 'Cưới hỏi', label: '💒 Cưới hỏi' },
                { id: 'Tình yêu', label: '💖 Tình yêu' },
                { id: 'Chia buồn', label: '🕊️ Chia buồn' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${activeTab === tab.id ? 'bg-brand-600 text-white shadow-pink-soft' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* CUSTOM FLOWER REQUEST BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-brand-900 to-stone-900 text-white p-8 sm:p-12 shadow-2xl border border-amber-400/30">
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-300/40">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Dịch Vụ Cá Nhân Hóa Độc Bản
                </div>

                <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white">
                  Bạn Muốn Đặt Mẫu Hoa Theo Yêu Cầu Riêng?
                </h2>

                <p className="text-stone-300 text-sm leading-relaxed max-w-xl">
                  Gửi hình mẫu hoa bạn yêu thích hoặc đưa ra ngân sách & tông màu mong muốn, các thợ hoa giàu kinh nghiệm tại <strong className="text-amber-200">Lin Flower</strong> sẽ thiết kế tác phẩm hoa độc nhất dành riêng cho bạn!
                </p>

                <div className="pt-2">
                  <Link
                    href="/custom-order"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-8 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
                  >
                    <Sparkles className="w-5 h-5 text-stone-900" />
                    <span>Gửi Yêu Cầu Thiết Kế Ngay</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-amber-300/40 overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=600"
                    alt="Custom flower design"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CUSTOMER REVIEWS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Đánh giá thực tế</span>
            <h2 className="font-serif font-extrabold text-3xl text-stone-900">
              Khách Hàng Nói Gì Về Lin Flower
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-3xl p-6 border border-brand-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">{rev.customerName}</span>
                  <span className="text-stone-400">{rev.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
