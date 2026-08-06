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
            <span>Cẩm Nang Lin Flower</span>
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
                    src={post.coverImage || post.image || 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800'} 
                    alt={post.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-brand-700 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-xs border border-pink-200">
                    {post.category || 'Mẹo Chọn Hoa'}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-brand-600" />
                      {post.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {post.createdAt}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt || post.summary || ''}
                  </p>
                </div>
              </div>

              {/* Action Button Link */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-brand-600">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-brand-500" />
                  <span>Đọc bài viết ({post.readTime || '3 phút đọc'})</span>
                </span>
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-brand-600 font-extrabold">
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </PageTransition>
  );
}
