'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingCart, Package, Shield, 
  Tag, ArrowLeft, UserCheck, Lock, Sparkles, QrCode, BookOpen 
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { userRole, setUserRole } = useStore();

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      
      {/* Top Admin Bar */}
      <header className="bg-stone-900 text-white border-b border-stone-800 py-3 px-6 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors bg-stone-800 px-3 py-1.5 rounded-full">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Website Bán Hoa</span>
          </Link>
          <div className="h-4 w-px bg-stone-700"></div>
          <span className="font-serif font-extrabold text-lg text-amber-300">
            HỆ THỐNG QUẢN TRỊ LIN FLOWER
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-stone-300">
            Vai trò hiện tại: <strong className={`capitalize px-2 py-0.5 rounded-md font-bold ${userRole === 'admin' ? 'bg-amber-400 text-stone-950' : 'bg-blue-500 text-white'}`}>{userRole === 'admin' ? 'Admin (Toàn Quyền)' : 'Nhân Viên (Đơn/Kho)'}</strong>
          </div>

          <button
            onClick={() => setUserRole(userRole === 'admin' ? 'staff' : 'admin')}
            className="text-xs bg-stone-800 hover:bg-stone-700 text-amber-200 px-3 py-1.5 rounded-xl font-bold border border-amber-300/30 transition-all flex items-center gap-1 active:scale-95"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Đổi sang {userRole === 'admin' ? 'Nhân Viên' : 'Admin'}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-stone-900 text-stone-300 p-4 border-r border-stone-800 space-y-6 flex-shrink-0 hidden md:block">
          
          <div className="px-3 pt-2">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">Bảng Điều Khiển</div>
            <nav className="space-y-1 text-xs font-semibold">
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${pathname === '/admin' ? 'bg-brand-600 text-white font-bold shadow-sm' : 'hover:bg-stone-800 text-stone-400 hover:text-white'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard (Tổng quan)</span>
              </Link>

              <Link
                href="/admin/orders"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${pathname === '/admin/orders' ? 'bg-brand-600 text-white font-bold shadow-sm' : 'hover:bg-stone-800 text-stone-400 hover:text-white'}`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Quản Lý Đơn Hàng</span>
              </Link>

              <Link
                href="/admin/products"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${pathname === '/admin/products' ? 'bg-brand-600 text-white font-bold shadow-sm' : 'hover:bg-stone-800 text-stone-400 hover:text-white'}`}
              >
                <Package className="w-4 h-4" />
                <span>Quản Lý Sản Phẩm</span>
              </Link>

              <Link
                href="/admin/integrations"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${pathname === '/admin/integrations' ? 'bg-brand-600 text-white font-bold shadow-sm' : 'hover:bg-stone-800 text-stone-400 hover:text-white'}`}
              >
                <QrCode className="w-4 h-4 text-amber-300" />
                <span className="text-amber-200">Tích Hợp QR & Telegram</span>
              </Link>

              <Link
                href="/admin/blogs"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${pathname === '/admin/blogs' ? 'bg-brand-600 text-white font-bold shadow-sm' : 'hover:bg-stone-800 text-stone-400 hover:text-white'}`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Quản Lý Cẩm Nang</span>
              </Link>

              <Link
                href="/admin/roles"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${pathname === '/admin/roles' ? 'bg-brand-600 text-white font-bold shadow-sm' : 'hover:bg-stone-800 text-stone-400 hover:text-white'}`}
              >
                <Shield className="w-4 h-4" />
                <span>Quản Lý Phân Quyền</span>
              </Link>

              <Link
                href="/admin/vouchers"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${pathname === '/admin/vouchers' ? 'bg-brand-600 text-white font-bold shadow-sm' : 'hover:bg-stone-800 text-stone-400 hover:text-white'}`}
              >
                <Tag className="w-4 h-4" />
                <span>Mã Giảm Giá</span>
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-stone-800 px-3 space-y-2 text-xs">
            <div className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">Quyền Hạn Đang Mở:</div>
            {userRole === 'admin' ? (
              <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-500/30 text-amber-200 text-[11px] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Admin (Toàn Quyền)
                </div>
                <div>• Quản lý QR & Telegram Bot</div>
                <div>• Đăng/Sửa/Xóa bài cẩm nang</div>
                <div>• Báo cáo doanh thu & Kho hoa</div>
              </div>
            ) : (
              <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-500/30 text-blue-200 text-[11px] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-blue-400" /> Nhân Viên (Staff)
                </div>
                <div>• Xem & cập nhật đơn hàng</div>
                <div>• Xem kho sản phẩm hoa</div>
              </div>
            )}
          </div>

        </aside>

        {/* Right Main Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
