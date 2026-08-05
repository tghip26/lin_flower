'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { PageTransition } from '@/components/common/PageTransition';
import { Sparkles, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const { blogPosts } = useStore();

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-pink-100 pb-8">
          <div className="inline-flex items-center gap-1.5 bg-pink-100 text-brand-800 text-xs font-bold px-4 py-1.5 rounded-full border border-pink-200">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Cẩm Nang 花 Lin Flower</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 leading-tight">
            Kinh Nghiệm Chọn & Bảo Quản Hoa Tươi 🌸
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-medium">
            Tổng hợp mẹo chăm hoa lâu tàn, giải mã ý nghĩa các loài hoa tình yêu & nghệ thuật cắm hoa sang trọng từ các nghệ nhân Lin Flower Phố Mới - Quế Võ.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-100/70 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between p-6 cursor-pointer transform-gpu"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-stone-100 relative">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-brand-700 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-xs border border-pink-200">
                    {post.category}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" /> {post.createdAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-stone-400" /> {post.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-700 font-semibold">
                    <BookOpen className="w-3.5 h-3.5" /> {post.readTime || '4 phút đọc'}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-brand-600 transition-colors leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed font-normal">
                  {post.excerpt}
                </p>
              </div>

              {/* Action Link Footer */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-600 group-hover:text-brand-700 group-hover:translate-x-1 transition-all">
                  <span>Đọc bài viết chi tiết</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span className="text-[11px] text-stone-400 font-mono">Xem ngay ➔</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
