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

        {/* 1. Hero Banner Section */}
        <section className="relative z-10 pt-2 sm:pt-3 pb-6 sm:pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xl text-brand-900 text-xs sm:text-sm font-semibold px-5 py-2 rounded-full border border-amber-200/80 shadow-md">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <span className="tracking-wide">Tiệm Hoa Tươi Cao Cấp Hàng Đầu Tại Quế Võ - Bắc Ninh</span>
                </div>

                <div className="space-y-3">
                  <h1 className="font-serif font-semibold text-5xl sm:text-6xl lg:text-7xl text-stone-900 leading-[1.08] tracking-tight">
                    LIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-rose-600 to-amber-600 font-extrabold">FLOWER</span>
                  </h1>
                  <p className="font-serif italic text-xl sm:text-2xl text-brand-700 tracking-wider font-normal">
                    TRAO TRỌN YÊU THƯƠNG – GỬI TRỌN TÂM Ý ♡
                  </p>
                </div>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-pink-100/80 shadow-xs">
                  Chuyên cung cấp <strong className="text-stone-900 font-semibold">Tráp cưới hỏi nghệ thuật</strong>, <strong className="text-stone-900 font-semibold">Giỏ trái cây nhập khẩu</strong>, <strong className="text-stone-900 font-semibold">Lẵng khai trương hồng phát</strong>, <strong className="text-stone-900 font-semibold">Bó hoa sinh nhật</strong> & <strong className="text-stone-900 font-semibold">Trang trí sự kiện trọn gói</strong>.
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2.5 rounded-2xl border border-pink-100 text-stone-800 shadow-xs">
                    <span className="text-brand-600 text-sm">💎</span> Hoa Tươi Nhập Mới Mỗi Ngày
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2.5 rounded-2xl border border-pink-100 text-stone-800 shadow-xs">
                    <span className="text-rose-600 text-sm">💖</span> Phục Vụ Tận Tâm & Tinh Tế
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2.5 rounded-2xl border border-pink-100 text-stone-800 shadow-xs">
                    <span className="text-amber-600 text-sm">✨</span> Thiết Kế Mẫu Hoa Riêng
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                  <Link
                    href="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-600 via-brand-500 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-semibold text-base px-8 py-4 rounded-full shadow-pink-soft hover:shadow-pink-glow active:scale-95 transition-all tracking-wide"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Xem Bố Bộ Mẫu Hoa</span>
                  </Link>

                  <Link
                    href="/custom-order"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/95 backdrop-blur-md hover:bg-stone-50 text-stone-800 font-semibold text-base px-8 py-4 rounded-full border-2 border-brand-200 hover:border-brand-400 active:scale-95 transition-all shadow-xs"
                  >
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Thiết Kế Theo Yêu Cầu</span>
                  </Link>
                </div>

                {/* Contact info pill */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-stone-600">
                  <a href="tel:0363819228" className="flex items-center gap-2 text-brand-700 hover:underline active:scale-95 bg-white/90 px-3.5 py-2 rounded-full border border-pink-200 shadow-xs">
                    <PhoneCall className="w-4 h-4 text-brand-600" />
                    <span>Hotline: <strong className="font-bold">0363 819 228</strong></span>
                  </a>
                  <span className="text-stone-300 hidden sm:inline">•</span>
                  <span className="flex items-center gap-2 text-stone-600 bg-white/90 px-3.5 py-2 rounded-full border border-stone-200 shadow-xs">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Khu phố 5, Thị trấn Phố Mới, Quế Võ, Bắc Ninh</span>
                  </span>
                </div>
              </motion.div>

              {/* Right Hero Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="lg:col-span-5 relative"
              >
                <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-3xl shadow-2xl aspect-[4/3] sm:aspect-square group border border-pink-100">
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
        <div className="relative z-10 flex items-center justify-center my-4">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-pink-200 shadow-sm">
            <span className="text-brand-500">❀</span>
            <span className="font-serif italic text-sm text-stone-700">Cành hoa vươn mầm kết nối yêu thương</span>
            <span className="text-brand-500">❀</span>
          </div>
        </div>

        {/* 2. FLOWER FINDER WIZARD TOOL */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlowerFinderWizard />
        </section>

        {/* FLORAL CONNECTOR NODE 2 */}
        <div className="relative z-10 flex items-center justify-center my-4">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-pink-200 shadow-sm">
            <span className="text-brand-500">❀</span>
            <span className="font-serif italic text-sm text-stone-700">Danh mục hoa tươi phong phú & chất lượng</span>
            <span className="text-brand-500">❀</span>
          </div>
        </div>

        {/* 3. BEST SELLERS & CATEGORY TABS WITH STABLE FIXED MIN-HEIGHT & SMOOTH MORPH ANIMATION */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-pink-100 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> BỘ SƯU TẬP NỔI BẬT
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight">
                Danh Mục Hoa Được Đặt Mua Nhất 🌸
              </h2>
            </div>

            {/* Occasion Tabs Filter */}
            <div className="flex flex-wrap gap-2.5">
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
                  className={`px-4.5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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
          <div className="text-center pt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-600 via-rose-500 to-amber-500 hover:from-brand-700 hover:to-amber-600 text-white font-bold text-base px-9 py-4 rounded-full shadow-pink-soft hover:shadow-pink-glow active:scale-95 transition-all tracking-wide"
            >
              <span>Xem Tất Cả 100+ Mẫu Hoa Lin Flower</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* FLORAL CONNECTOR NODE 3 */}
        <div className="relative z-10 flex items-center justify-center my-4">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-pink-200 shadow-sm">
            <span className="text-brand-500">❀</span>
            <span className="font-serif italic text-sm text-stone-700">Độc quyền dịch vụ thiết kế hoa theo mẫu yêu cầu</span>
            <span className="text-brand-500">❀</span>
          </div>
        </div>

        {/* 4. CUSTOM DESIGN CTA BANNER (WARM LUXURY ROSE & BURGUNDY GRADIENT - 0% PITCH BLACK) */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-800 via-rose-800 to-brand-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-pink-300/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center md:text-left z-10">
              <span className="bg-amber-400/20 text-amber-200 border border-amber-300/40 text-xs font-bold px-4 py-1.5 rounded-full inline-block tracking-wider uppercase">
                ✨ Dịch Vụ Thiết Kế Hoa Độc Bản
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Bạn Muốn Đặt Hoa Theo Mẫu Riêng Hoặc Ngân Sách Tùy Chọn?
              </h2>
              <p className="text-rose-100 text-xs sm:text-sm leading-relaxed font-normal">
                Gửi ảnh mẫu hoa bạn thích hoặc ngân sách mong muốn. Nghệ nhân hoa tươi Lin Flower sẽ thiết kế riêng và gửi ảnh duyệt thực tế trước khi giao!
              </p>
              <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start text-xs font-medium">
                <span className="flex items-center gap-1.5 text-pink-100"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Duyệt ảnh chụp hoa thực tế</span>
                <span className="flex items-center gap-1.5 text-pink-100"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tặng kèm thiệp & băng rôn</span>
                <span className="flex items-center gap-1.5 text-pink-100"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Miễn phí vận chuyển</span>
              </div>
            </div>

            <div className="z-10 flex-shrink-0">
              <Link
                href="/custom-order"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-serif font-bold text-base px-8.5 py-4 rounded-full shadow-lg shadow-amber-400/20 active:scale-95 transition-all tracking-wide"
              >
                <span>Gửi Mẫu Đặt Hoa Ngay</span>
                <ArrowRight className="w-5 h-5 text-stone-950" />
              </Link>
            </div>
          </div>
        </section>

        {/* FLORAL CONNECTOR NODE 4 */}
        <div className="relative z-10 flex items-center justify-center my-4">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-pink-200 shadow-sm">
            <span className="text-brand-500">❀</span>
            <span className="font-serif italic text-sm text-stone-700">Đánh giá chân thực từ hàng ngàn khách hàng yêu quý</span>
            <span className="text-brand-500">❀</span>
          </div>
        </div>

        {/* 5. CUSTOMER REVIEWS (PERFECT 3-COLUMN SPACING & RATIO BALANCED) */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> KHÁCH HÀNG NÓI VỀ CHÚNG TÔI
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900">
              Hơn 10.000+ Bó Hoa Đã Đến Tay Người Nhận 💖
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="bg-white/95 backdrop-blur-md p-6.5 rounded-3xl border border-pink-200/80 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">{rev.createdAt}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed font-normal">"{rev.comment}"</p>
                </div>
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">{rev.customerName}</span>
                  <span className="text-brand-600 font-semibold bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200/60">✓ Khách mua thực tế</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
