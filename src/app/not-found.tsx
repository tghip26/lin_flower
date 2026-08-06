import React from 'react';
import Link from 'next/link';
import { PageTransition } from '@/components/common/PageTransition';
import { LinFlowerLogo } from '@/components/common/LinFlowerLogo';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
        <LinFlowerLogo size={64} showText={false} />
        <div className="space-y-2 max-w-md">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            Lỗi 404 - Trang Không Tồn Tại
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-stone-900">
            Rất Tiếc! Không Tìm Thấy Trang Này 🌸
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            Trang bạn đang truy cập có thể đã đổi đường dẫn hoặc tạm thời ẩn. Vui lòng quay về trang chủ để khám phá các bộ sưu tập hoa tươi mới nhất.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ Lin Flower</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
