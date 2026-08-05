'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, Share2, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PageTransition } from '@/components/common/PageTransition';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { blogPosts } = useStore();
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find((b) => b.slug === slug || b.id === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-stone-800">Không tìm thấy bài viết này</h2>
        <p className="text-sm text-stone-500">Bài viết có thể đã tạm thời ẩn hoặc đổi đường dẫn.</p>
        <Link href="/blog" className="inline-block bg-brand-600 text-white font-bold px-6 py-3 rounded-full text-xs">
          Về danh sách cẩm nang
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((b) => b.id !== post.id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <PageTransition>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Back Link & Category */}
        <div className="flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-brand-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Cẩm Nang Chọn Hoa</span>
          </Link>
          <span className="bg-brand-50 text-brand-700 font-bold text-xs px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 border-b border-stone-200 pb-4">
            <span className="flex items-center gap-1.5 font-bold text-stone-800">
              <User className="w-4 h-4 text-brand-600" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-stone-400" />
              {post.createdAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-amber-600" />
              {post.readTime || '4 phút đọc'}
            </span>

            <button
              onClick={handleCopyLink}
              className="ml-auto flex items-center gap-1.5 text-brand-700 hover:underline font-bold bg-brand-50 px-3 py-1 rounded-full border border-brand-200"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? '✓ Đã chép link' : 'Chia sẻ bài viết'}</span>
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-stone-200 shadow-md">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Excerpt Lead Box */}
        <div className="bg-brand-50/70 p-5 rounded-2xl border border-brand-200 text-sm font-semibold text-stone-800 italic leading-relaxed">
          "{post.excerpt}"
        </div>

        {/* Article Body Content */}
        <div className="prose prose-stone max-w-none text-sm sm:text-base text-stone-700 leading-relaxed space-y-4">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-serif font-bold text-xl text-stone-900 pt-3 border-b border-stone-100 pb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n');
              return (
                <ul key={idx} className="space-y-1.5 list-disc pl-5 text-sm">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-stone-200">
            <Bookmark className="w-4 h-4 text-stone-400" />
            <span className="text-xs font-bold text-stone-500">Thẻ:</span>
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Callout */}
        <div className="bg-gradient-to-r from-stone-900 via-brand-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Dịch Vụ Hoa Tươi Bắc Ninh
            </div>
            <h4 className="font-serif font-bold text-xl text-white mt-1">Bạn Cần Tìm Bó Hoa Tươi Thắm Nhất?</h4>
            <p className="text-xs text-stone-300">Khám phá ngay bộ sưu tập lẵng hoa khai trương, bó hoa sinh nhật tại Lin Flower</p>
          </div>
          <Link
            href="/products"
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow-pink-soft whitespace-nowrap active:scale-95 transition-all"
          >
            Xem Mẫu Hoa Ngay
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 border-t border-stone-200 space-y-6">
            <h3 className="font-serif font-bold text-xl text-stone-900">Các Bài Viết Cẩm Nang Khác</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group bg-white p-4 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex gap-4 items-center"
                >
                  <img src={rel.coverImage} alt="" className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded-md">
                      {rel.category}
                    </span>
                    <h5 className="font-bold text-xs text-stone-800 group-hover:text-brand-600 line-clamp-2 mt-1">
                      {rel.title}
                    </h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </PageTransition>
  );
}
