'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Heart, ShoppingBag, Truck, ShieldCheck, 
  Clock, PhoneCall, Gift, CheckCircle2, Star, MapPin, Search, Award, Flower2, Gem, Crown
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/products/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';
import { FloralVineBackground } from '@/components/common/FloralVineBackground';
import { FlowerFinderWizard } from '@/components/common/FlowerFinderWizard';

export default function HomePage() {
  const { products, categories, reviews } = useStore();
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.occasions.includes(activeTab) || p.categoryId === activeTab);

  return (
    <PageTransition>
      <div className="relative space-y-16 sm:space-y-24 lg:space-y-28 pb-20 sm:pb-28 overflow-hidden">
        
        {/* Background Glowing Floral Vine SVG Path */}
        <FloralVineBackground />

        {/* ======================================================== */}
        {/* 1. PARISIAN LUXURY HERO SHOWCASE */}
        {/* ======================================================== */}
        <section className="relative z-10 pt-2 sm:pt-6 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Hero Left Content */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
              >
                {/* Imperial Gold Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-pink-500/15 to-amber-500/10 backdrop-blur-xl text-stone-900 text-xs sm:text-sm font-bold px-5 py-2 rounded-full border border-amber-300/60 shadow-xs max-w-full">
                  <Crown className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="tracking-wide text-brand-900 font-extrabold">Tiệm Hoa Tươi Thượng Hạng Quế Võ - Bắc Ninh</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 animate-pulse" />
                </div>

                {/* Hero Title with Luxury Monogram Gradient */}
                <div className="space-y-3">
                  <h1 className="font-serif font-semibold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-stone-900 leading-[1.05] tracking-tight">
                    LIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-rose-600 to-amber-600 font-black">FLOWER</span>
                  </h1>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-amber-600">
                    <span className="h-[1px] w-8 bg-amber-400/60 hidden sm:inline-block"></span>
                    <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-brand-700 tracking-widest font-normal">
                      ❦ Trao Trọn Yêu Thương – Gửi Trọn Tâm Ý ❦
                    </p>
                    <span className="h-[1px] w-8 bg-amber-400/60 hidden sm:inline-block"></span>
                  </div>
                </div>

                {/* Description Glass Box */}
                <p className="text-stone-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-amber-200/60 shadow-sm">
                  Chuyên cung cấp <strong className="text-stone-900 font-bold">Tráp cưới hỏi 5-7-9 lễ rồng phượng</strong>, <strong className="text-stone-900 font-bold">Giỏ trái cây nhập khẩu cao cấp</strong>, <strong className="text-stone-900 font-bold">Lẵng khai trương hồng phát</strong>, <strong className="text-stone-900 font-bold">Bó hoa sinh nhật nhập khẩu</strong> & <strong className="text-stone-900 font-bold">Trang trí sự kiện độc bản</strong>.
                </p>

                {/* Luxury Feature Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold">
                  <div className="flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full border border-pink-200/80 text-stone-800 shadow-2xs">
                    <Gem className="w-4 h-4 text-brand-600" /> 100% Hoa Nhập Mới Loại 1
                  </div>
                  <div className="flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full border border-pink-200/80 text-stone-800 shadow-2xs">
                    <Award className="w-4 h-4 text-amber-600" /> Cắm Hoa Nghệ Thuật Độc Bản
                  </div>
                  <div className="flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full border border-pink-200/80 text-stone-800 shadow-2xs">
                    <Truck className="w-4 h-4 text-emerald-600" /> Giao Hoa Hoả Tốc 2H
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-600 via-rose-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold text-base px-9 py-4.5 rounded-full shadow-xl shadow-pink-500/20 active:scale-95 transition-all tracking-wide"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Khám Phá Mẫu Hoa Tươi</span>
                  </Link>

                  <Link
                    href="/custom-order"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/95 backdrop-blur-md hover:bg-stone-50 text-stone-900 font-bold text-base px-8 py-4.5 rounded-full border-2 border-amber-300/80 hover:border-brand-400 active:scale-95 transition-all shadow-xs"
                  >
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Thiết Kế Theo Mẫu Riêng</span>
                  </Link>
                </div>

                {/* Hotline Info Pill */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-stone-600">
                  <a href="tel:0363819228" className="flex items-center gap-2 text-brand-700 hover:underline active:scale-95 bg-white/90 px-4 py-2 rounded-full border border-pink-200 shadow-xs">
                    <PhoneCall className="w-4 h-4 text-brand-600" />
                    <span>Hotline Đặt Hoa: <strong className="font-bold text-stone-900">0363 819 228</strong></span>
                  </a>
                  <span className="text-stone-300 hidden sm:inline">•</span>
                  <span className="flex items-center gap-2 text-stone-600 bg-white/90 px-4 py-2 rounded-full border border-stone-200 shadow-xs">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Thị trấn Phố Mới, Quế Võ, Bắc Ninh</span>
                  </span>
                </div>
              </motion.div>

              {/* Hero Right Asymmetric Luxury Gallery Showcase */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="lg:col-span-5 relative mt-6 lg:mt-0"
              >
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Main Curved Arch Photo Frame */}
                  <div className="relative overflow-hidden rounded-t-[10rem] rounded-b-3xl shadow-2xl aspect-[3/4] border-4 border-white bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=1000"
                      alt="Lin Flower Premium Roses Presentation"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-pink-100 shadow-lg text-center">
                      <p className="font-serif font-bold text-stone-900 text-sm sm:text-base">Nghệ Thuật Cắm Hoa Độc Bản Lin Flower</p>
                      <p className="text-[11px] text-brand-600 font-semibold mt-0.5">Tuyển chọn hoa tươi nhập khẩu chọn lọc loại 1</p>
                    </div>
                  </div>

                  {/* Offset Floating Badge Circle Overlay */}
                  <div className="absolute -bottom-6 -left-6 bg-gradient-to-tr from-brand-600 to-rose-500 text-white rounded-2xl p-4 shadow-xl border-2 border-white flex items-center gap-3 hidden sm:flex">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                      🌸
                    </div>
                    <div>
                      <p className="font-serif font-extrabold text-white text-sm">Giao Hoa Tươi 2H</p>
                      <p className="text-[10px] text-pink-100">Bắc Ninh & Toàn Quốc</p>
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FLORAL CONNECTOR NODE 1 */}
        <div className="relative z-10 flex items-center justify-center my-4">
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-7 py-2.5 rounded-full border border-amber-200/80 shadow-xs">
            <span className="text-amber-500">❀</span>
            <span className="font-serif italic text-sm text-stone-800 font-semibold">Cành hoa vươn mầm kết nối yêu thương</span>
            <span className="text-amber-500">❀</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. FLOWER FINDER WIZARD TOOL */}
        {/* ======================================================== */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlowerFinderWizard />
        </section>

        {/* FLORAL CONNECTOR NODE 2 */}
        <div className="relative z-10 flex items-center justify-center my-4">
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-7 py-2.5 rounded-full border border-pink-200 shadow-xs">
            <span className="text-brand-500">❀</span>
            <span className="font-serif italic text-sm text-stone-800 font-semibold">Danh mục hoa tươi phong phú & chất lượng</span>
            <span className="text-brand-500">❀</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. BEST SELLERS & CATEGORY TABS WITH LUXURY SPACING */}
        {/* ======================================================== */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-pink-200/60 pb-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> BỘ SƯU TẬP NỔI BẬT
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight">
                Danh Mục Hoa Được Đặt Mua Nhất 🌸
              </h2>
            </div>

            {/* Occasion Tabs Filter */}
            <div className="flex flex-wrap gap-3">
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
                  className={`px-5 py-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-brand-600 via-rose-600 to-amber-600 text-white shadow-md scale-105 font-bold'
                      : 'bg-white hover:bg-pink-50 text-stone-700 border border-pink-200/80 shadow-2xs'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid with Generous Spacing */}
          <div className="min-h-[540px] sm:min-h-[660px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 sm:gap-8 transform-gpu"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Radiant Rose Gold Action Button */}
          <div className="text-center pt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-600 via-rose-500 to-amber-500 hover:from-brand-700 hover:to-amber-600 text-white font-bold text-base px-10 py-4.5 rounded-full shadow-xl shadow-pink-500/20 active:scale-95 transition-all tracking-wide"
            >
              <span>Xem Tất Cả 100+ Mẫu Hoa Lin Flower</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* FLORAL CONNECTOR NODE 3 */}
        <div className="relative z-10 flex items-center justify-center my-4">
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-7 py-2.5 rounded-full border border-pink-200 shadow-xs">
            <span className="text-brand-500">❀</span>
            <span className="font-serif italic text-sm text-stone-800 font-semibold">Độc quyền dịch vụ thiết kế hoa theo mẫu yêu cầu</span>
            <span className="text-brand-500">❀</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. CUSTOM DESIGN CTA BANNER (WARM BURGUNDY & GOLD) */}
        {/* ======================================================== */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-800 via-rose-800 to-brand-900 text-white rounded-[2.5rem] p-8 sm:p-14 lg:p-16 shadow-2xl border border-pink-300/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10">
            <div className="space-y-5 max-w-2xl text-center md:text-left z-10">
              <span className="bg-amber-400/20 text-amber-200 border border-amber-300/40 text-xs font-bold px-4 py-1.5 rounded-full inline-block tracking-wider uppercase">
                ✨ Dịch Vụ Thiết Kế Hoa Độc Bản
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Bạn Muốn Đặt Hoa Theo Mẫu Riêng Hoặc Ngân Sách Tùy Chọn?
              </h2>
              <p className="text-rose-100 text-sm leading-relaxed font-normal">
                Gửi ảnh mẫu hoa bạn thích hoặc ngân sách mong muốn. Nghệ nhân hoa tươi Lin Flower sẽ thiết kế riêng và gửi ảnh duyệt thực tế trước khi giao!
              </p>
              <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start text-xs font-medium">
                <span className="flex items-center gap-2 text-pink-100"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Duyệt ảnh chụp hoa thực tế</span>
                <span className="flex items-center gap-2 text-pink-100"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tặng kèm thiệp & băng rôn</span>
                <span className="flex items-center gap-2 text-pink-100"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Miễn phí vận chuyển</span>
              </div>
            </div>

            <div className="z-10 flex-shrink-0 w-full md:w-auto">
              <Link
                href="/custom-order"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-serif font-bold text-base px-9 py-4.5 rounded-full shadow-lg shadow-amber-400/20 active:scale-95 transition-all tracking-wide"
              >
                <span>Gửi Mẫu Đặt Hoa Ngay</span>
                <ArrowRight className="w-5 h-5 text-stone-950" />
              </Link>
            </div>
          </div>
        </section>

        {/* FLORAL CONNECTOR NODE 4 */}
        <div className="relative z-10 flex items-center justify-center my-4">
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-7 py-2.5 rounded-full border border-pink-200 shadow-xs">
            <span className="text-brand-500">❀</span>
            <span className="font-serif italic text-sm text-stone-800 font-semibold">Đánh giá chân thực từ hàng ngàn khách hàng yêu quý</span>
            <span className="text-brand-500">❀</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. CUSTOMER REVIEWS (PERFECT 3-COLUMN SPACING) */}
        {/* ======================================================== */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> KHÁCH HÀNG NÓI VỀ CHÚNG TÔI
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900">
              Hơn 10.000+ Bó Hoa Đã Đến Tay Người Nhận 💖
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="bg-white/95 backdrop-blur-md p-7 sm:p-8 rounded-[2rem] border border-pink-200/80 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-400 font-mono">{rev.createdAt}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed sm:leading-loose font-normal">"{rev.comment}"</p>
                </div>
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">{rev.customerName}</span>
                  <span className="text-brand-600 font-semibold bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200/60 text-[11px]">✓ Khách mua thực tế</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
