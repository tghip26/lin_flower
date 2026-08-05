'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Heart, ShoppingBag, Truck, ShieldCheck, 
  Clock, PhoneCall, Gift, CheckCircle2, Star, MapPin, Search 
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/products/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';
import { FloralVineBackground } from '@/components/common/FloralVineBackground';
import { FlowerFinderWizard } from '@/components/common/FlowerFinderWizard';

export default function HomePage() {
  const { products, categories, reviews } = useStore();
  const [activeTab, setActiveTab] = useState<string>('all');

  const bestSellers = products.filter(p => p.isBestSeller);

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.occasions.includes(activeTab) || p.categoryId === activeTab);

  return (
    <PageTransition>
      <div className="relative space-y-8 sm:space-y-16 pb-16 sm:pb-24 overflow-hidden">
        
        {/* Background Glowing Floral Vine SVG Path Spanning Top to Bottom */}
        <FloralVineBackground />

        {/* 1. Hero Banner Section (Optimized for Mobile & Desktop) */}
        <section className="relative z-10 pt-1 sm:pt-3 pb-6 sm:pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left"
              >
                {/* Top Badge */}
                <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xl text-brand-900 text-[11px] sm:text-sm font-semibold px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full border border-amber-200/80 shadow-xs max-w-full">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0 animate-spin" />
                  <span className="tracking-tight sm:tracking-wide truncate">Tiệm Hoa Tươi Cao Cấp Quế Võ - Bắc Ninh</span>
                </div>

                {/* Hero Title & Slogan */}
                <div className="space-y-1.5 sm:space-y-3">
                  <h1 className="font-serif font-semibold text-4xl sm:text-6xl lg:text-7xl text-stone-900 leading-[1.1] tracking-tight">
                    LIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-rose-600 to-amber-600 font-extrabold">FLOWER</span>
                  </h1>
                  <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-brand-700 tracking-wide font-normal">
                    TRAO TRỌN YÊU THƯƠNG – GỬI TRỌN TÂM Ý ♡
                  </p>
                </div>

                {/* Description Box */}
                <p className="text-stone-700 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal bg-white/85 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl border border-pink-100/90 shadow-xs">
                  Chuyên cung cấp <strong className="text-stone-900 font-semibold">Tráp cưới hỏi nghệ thuật</strong>, <strong className="text-stone-900 font-semibold">Giỏ trái cây nhập khẩu</strong>, <strong className="text-stone-900 font-semibold">Lẵng khai trương hồng phát</strong>, <strong className="text-stone-900 font-semibold">Bó hoa sinh nhật</strong> & <strong className="text-stone-900 font-semibold">Trang trí sự kiện trọn gói</strong>.
                </p>

                {/* Compact Feature Badges on Mobile */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold">
                  <div className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full border border-pink-100 text-stone-800 shadow-2xs">
                    <span className="text-brand-600">💎</span> Hoa Tươi Nhập Mới Mỗi Ngày
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full border border-pink-100 text-stone-800 shadow-2xs">
                    <span className="text-rose-600">💖</span> Phục Vụ Tận Tâm & Tinh Tế
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full border border-pink-100 text-stone-800 shadow-2xs">
                    <span className="text-amber-600">✨</span> Thiết Kế Mẫu Hoa Riêng
                  </div>
                </div>

                {/* CTA Buttons (Clean text & responsive sizes) */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-3">
                  <Link
                    href="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 via-brand-500 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-semibold text-sm sm:text-base px-6 py-3.5 sm:px-8 sm:py-4 rounded-full shadow-pink-soft hover:shadow-pink-glow active:scale-95 transition-all tracking-wide"
                  >
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Xem Tất Cả Mẫu Hoa</span>
                  </Link>

                  <Link
                    href="/custom-order"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/95 backdrop-blur-md hover:bg-stone-50 text-stone-800 font-semibold text-sm sm:text-base px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border-2 border-brand-200 hover:border-brand-400 active:scale-95 transition-all shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                    <span>Thiết Kế Theo Yêu Cầu</span>
                  </Link>
                </div>

                {/* Contact info pill */}
                <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-[11px] sm:text-xs font-semibold text-stone-600">
                  <a href="tel:0363819228" className="flex items-center gap-1.5 text-brand-700 hover:underline active:scale-95 bg-white/90 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-pink-200 shadow-xs">
                    <PhoneCall className="w-3.5 h-3.5 text-brand-600" />
                    <span>Hotline: <strong className="font-bold">0363 819 228</strong></span>
                  </a>
                  <span className="text-stone-300 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5 text-stone-600 bg-white/90 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-stone-200 shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Khu phố 5, Thị trấn Phố Mới, Quế Võ, Bắc Ninh</span>
                  </span>
                </div>
              </motion.div>

              {/* Right Hero Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="lg:col-span-5 relative mt-2 lg:mt-0"
              >
                <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-3xl shadow-xl aspect-[4/3] sm:aspect-square group border border-pink-100">
                  <img
                    src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=1000"
                    alt="Lin Flower Premium Roses Presentation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FLORAL CONNECTOR NODE 1 */}
        <div className="relative z-10 flex items-center justify-center my-2 sm:my-4">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-pink-200 shadow-xs">
            <span className="text-brand-500 text-xs">❀</span>
            <span className="font-serif italic text-xs sm:text-sm text-stone-700">Cành hoa vươn mầm kết nối yêu thương</span>
            <span className="text-brand-500 text-xs">❀</span>
          </div>
        </div>

        {/* 2. FLOWER FINDER WIZARD TOOL */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlowerFinderWizard />
        </section>

        {/* FLORAL CONNECTOR NODE 2 */}
        <div className="relative z-10 flex items-center justify-center my-2 sm:my-4">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-pink-200 shadow-xs">
            <span className="text-brand-500 text-xs">❀</span>
            <span className="font-serif italic text-xs sm:text-sm text-stone-700">Danh mục hoa tươi phong phú & chất lượng</span>
            <span className="text-brand-500 text-xs">❀</span>
          </div>
        </div>

        {/* 3. BEST SELLERS & CATEGORY TABS WITH STABLE FIXED MIN-HEIGHT & SMOOTH MORPH ANIMATION */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 border-b border-pink-100 pb-4 sm:pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> BỘ SƯU TẬP NỔI BẬT
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-5xl text-stone-900 tracking-tight">
                Danh Mục Hoa Được Đặt Mua Nhất 🌸
              </h2>
            </div>

            {/* Occasion Tabs Filter */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {[
                { id: 'all', label: 'Tất Cả Mẫu Hoa' },
                { id: 'Sinh nhật', label: '🎂 Sinh Nhật' },
                { id: 'Khai trương', label: '🎉 Khai Trương' },
                { id: 'Tình yêu', label: '❤️ Tình Yêu' },
                { id: 'Giỏ trái cây', label: '🍇 Giỏ Trái Cây' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-brand-600 to-rose-600 text-white shadow-md scale-105 font-bold'
                      : 'bg-white hover:bg-pink-50 text-stone-700 border border-pink-200/80 shadow-xs'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid with Fixed Stable Height and Smooth AnimatePresence Transition */}
          <div className="min-h-[520px] sm:min-h-[640px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6.5 transform-gpu"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RADIANT NON-BLACK BUTTON */}
          <div className="text-center pt-4 sm:pt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-brand-600 via-rose-500 to-amber-500 hover:from-brand-700 hover:to-amber-600 text-white font-bold text-sm sm:text-base px-7 py-3.5 sm:px-9 sm:py-4 rounded-full shadow-pink-soft hover:shadow-pink-glow active:scale-95 transition-all tracking-wide"
            >
              <span>Xem Tất Cả 100+ Mẫu Hoa Lin Flower</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </section>

        {/* FLORAL CONNECTOR NODE 3 */}
        <div className="relative z-10 flex items-center justify-center my-2 sm:my-4">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-pink-200 shadow-xs">
            <span className="text-brand-500 text-xs">❀</span>
            <span className="font-serif italic text-xs sm:text-sm text-stone-700">Độc quyền dịch vụ thiết kế hoa theo mẫu yêu cầu</span>
            <span className="text-brand-500 text-xs">❀</span>
          </div>
        </div>

        {/* 4. CUSTOM DESIGN CTA BANNER */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-800 via-rose-800 to-brand-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-pink-300/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 max-w-2xl text-center md:text-left z-10">
              <span className="bg-amber-400/20 text-amber-200 border border-amber-300/40 text-[11px] sm:text-xs font-bold px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full inline-block tracking-wider uppercase">
                ✨ Dịch Vụ Thiết Kế Hoa Độc Bản
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Bạn Muốn Đặt Hoa Theo Mẫu Riêng Hoặc Ngân Sách Tùy Chọn?
              </h2>
              <p className="text-rose-100 text-xs sm:text-sm leading-relaxed font-normal">
                Gửi ảnh mẫu hoa bạn thích hoặc ngân sách mong muốn. Nghệ nhân hoa tươi Lin Flower sẽ thiết kế riêng và gửi ảnh duyệt thực tế trước khi giao!
              </p>
              <div className="pt-1 sm:pt-2 flex flex-wrap gap-3 justify-center md:justify-start text-xs font-medium">
                <span className="flex items-center gap-1.5 text-pink-100"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Duyệt ảnh chụp hoa thực tế</span>
                <span className="flex items-center gap-1.5 text-pink-100"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tặng kèm thiệp & băng rôn</span>
                <span className="flex items-center gap-1.5 text-pink-100"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Miễn phí vận chuyển</span>
              </div>
            </div>

            <div className="z-10 flex-shrink-0 w-full md:w-auto">
              <Link
                href="/custom-order"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-serif font-bold text-sm sm:text-base px-7 py-3.5 sm:px-8.5 sm:py-4 rounded-full shadow-lg shadow-amber-400/20 active:scale-95 transition-all tracking-wide"
              >
                <span>Gửi Mẫu Đặt Hoa Ngay</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-stone-950" />
              </Link>
            </div>
          </div>
        </section>

        {/* FLORAL CONNECTOR NODE 4 */}
        <div className="relative z-10 flex items-center justify-center my-2 sm:my-4">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-pink-200 shadow-xs">
            <span className="text-brand-500 text-xs">❀</span>
            <span className="font-serif italic text-xs sm:text-sm text-stone-700">Đánh giá chân thực từ hàng ngàn khách hàng yêu quý</span>
            <span className="text-brand-500 text-xs">❀</span>
          </div>
        </div>

        {/* 5. CUSTOMER REVIEWS */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> KHÁCH HÀNG NÓI VỀ CHÚNG TÔI
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-5xl text-stone-900">
              Hơn 10.000+ Bó Hoa Đã Đến Tay Người Nhận 💖
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6.5">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="bg-white/95 backdrop-blur-md p-5 sm:p-6.5 rounded-3xl border border-pink-200/80 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all space-y-3.5 flex flex-col justify-between">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between border-b border-pink-100 pb-2.5 sm:pb-3">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-stone-400 font-mono">{rev.createdAt}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed font-normal">"{rev.comment}"</p>
                </div>
                <div className="pt-2.5 sm:pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">{rev.customerName}</span>
                  <span className="text-brand-600 font-semibold bg-pink-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-pink-200/60 text-[11px]">✓ Khách mua thực tế</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
