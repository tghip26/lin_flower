import React from 'react';
import Link from 'next/link';
import { INITIAL_BLOG_POSTS } from '@/data/mockData';
import { Sparkles, Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2 border-b border-stone-200 pb-6">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Kinh nghiệm & Bí quyết</span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900">
          Cẩm Nang Chọn & Bảo Quản Hoa Tươi
        </h1>
        <p className="text-sm text-stone-500 max-w-xl mx-auto">
          Tổng hợp những bài viết hữu ích về nghệ thuật cắm hoa, ý nghĩa các loài hoa và mẹo chăm sóc hoa lâu tàn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_BLOG_POSTS.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-stone-100">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span className="bg-brand-50 text-brand-700 font-bold px-2.5 py-1 rounded-full">{post.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.createdAt}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
              </div>

              <h3 className="font-serif font-bold text-xl text-stone-900 leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline">
                Đọc bài viết chi tiết <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
