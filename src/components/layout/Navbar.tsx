'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  PhoneCall, MapPin, Heart, ShoppingBag, Search, 
  User, ShieldAlert, Sparkles, Menu, X, ChevronDown, CheckCircle, Gift, Award, Flower2, LogOut, Check
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { LinFlowerLogo } from '@/components/common/LinFlowerLogo';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, wishlist, userRole, setUserRole, categories, products } = useStore();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'accounts'>('login');

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const searchResults = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.flowerComposition.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'trap-cuoi-hoi': return <Gift className="w-4 h-4 text-brand-600" />;
      case 'gio-lang-trai-cay': return <ShoppingBag className="w-4 h-4 text-amber-600" />;
      case 'lang-chuc-mung': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'hoa-bo': return <Heart className="w-4 h-4 text-pink-600" />;
      case 'hoa-hieu': return <Flower2 className="w-4 h-4 text-purple-600" />;
      case 'trang-tri-su-kien': return <Sparkles className="w-4 h-4 text-amber-500" />;
      default: return <Flower2 className="w-4 h-4 text-brand-600" />;
    }
  };

  const handleSelectRole = (role: 'customer' | 'admin' | 'staff') => {
    setUserRole(role);
    setIsAuthModalOpen(false);
    if (role === 'admin') {
      router.push('/admin');
    }
  };

  return (
    <>
      {/* Top Announcement Bar - Clean & Professional */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-700 to-brand-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-brand-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin" style={{ animationDuration: '6s' }} />
              Tặng Thiệp & Băng Rôn Chúc Mừng Cao Cấp
            </span>
            <span className="hidden md:inline text-brand-300">|</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              Giao Hoa Nhanh 2H Tại Bắc Ninh & Toàn Quốc
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a 
              href="tel:0363819228" 
              className="flex items-center gap-1.5 bg-brand-gold/20 hover:bg-brand-gold/30 text-amber-200 px-3 py-1 rounded-full border border-amber-300/30 transition-all active:scale-95 font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>Tư Vấn & Đặt hàng: <strong className="text-white">0363 819 228</strong></span>
            </a>

            {/* Login / User Account Trigger */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 px-3 py-1 rounded-full transition-all border border-white/20 text-white font-medium"
            >
              <User className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {userRole === 'admin' ? 'Hi, Admin' : userRole === 'staff' ? 'Hi, Nhân Viên' : 'Đăng Nhập'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile menu trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-stone-700 hover:text-brand-600 p-2 active:scale-90 transition-transform"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo & Slogan */}
            <Link href="/" className="flex items-center gap-2 group">
              <LinFlowerLogo size={46} showText={true} />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Tìm hoa sinh nhật, lẵng khai trương, tráp cưới..."
                className="w-full bg-stone-50 border border-stone-200 focus:border-brand-500 rounded-full py-2 pl-10 pr-4 text-xs font-medium focus:outline-none transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

              {/* Live Search Results Dropdown */}
              {isSearchOpen && searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 p-3 z-50 max-h-80 overflow-y-auto space-y-2">
                  <div className="flex items-center justify-between px-2 pb-2 border-b border-stone-100 text-xs font-bold text-stone-500">
                    <span>Kết quả tìm kiếm ({searchResults.length})</span>
                    <button onClick={() => setIsSearchOpen(false)} className="text-stone-400 hover:text-stone-700">Đóng</button>
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-stone-500">Không tìm thấy mẫu hoa phù hợp</div>
                  ) : (
                    searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2 hover:bg-brand-50 rounded-xl transition-colors"
                      >
                        <img src={item.images[0]} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif font-bold text-xs text-stone-800 truncate">{item.name}</h5>
                          <span className="text-brand-600 font-bold text-xs">{item.price.toLocaleString('vi-VN')}đ</span>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Wishlist */}
              <Link 
                href="/products?wishlist=true" 
                className="relative p-2.5 text-stone-600 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all active:scale-90 hidden sm:block"
                title="Sản phẩm yêu thích"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 active:scale-95 text-white px-4.5 py-2.5 rounded-full shadow-pink-soft hover:shadow-pink-glow transition-all"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span className="text-xs sm:text-sm font-extrabold hidden sm:inline">Giỏ hàng</span>
                <span className="bg-white text-brand-700 text-xs font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                  {cartItemCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:block bg-stone-50/90 border-t border-brand-100/60">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex items-center justify-center gap-8 text-sm font-semibold text-stone-700 py-1.5">
              <li>
                <Link 
                  href="/" 
                  className={`hover:text-brand-600 transition-colors py-1 inline-block ${pathname === '/' ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  Trang Chủ
                </Link>
              </li>

              {/* Polish Dropdown for "Danh Mục Hoa" */}
              <li className="relative group">
                <Link 
                  href="/products" 
                  className={`hover:text-brand-600 transition-colors py-1 inline-flex items-center gap-1 ${pathname.startsWith('/products') ? 'text-brand-600 font-bold' : ''}`}
                >
                  <span>Danh Mục Hoa</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </Link>

                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-brand-100 p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-3 py-1">Phân Loại Nổi Bật</div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-brand-50 hover:text-brand-600 rounded-xl transition-colors"
                    >
                      {getCategoryIcon(cat.id)}
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </li>

              <li>
                <Link 
                  href="/custom-order" 
                  className={`hover:text-brand-600 transition-colors py-1 inline-flex items-center gap-1 ${pathname === '/custom-order' ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Đặt Hoa Theo Yêu Cầu</span>
                </Link>
              </li>

              <li>
                <Link 
                  href="/tracking" 
                  className={`hover:text-brand-600 transition-colors py-1 inline-block ${pathname === '/tracking' ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  Tra Cứu Đơn Hàng
                </Link>
              </li>

              <li>
                <Link 
                  href="/blog" 
                  className={`hover:text-brand-600 transition-colors py-1 inline-block ${pathname.startsWith('/blog') ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  Cẩm Nang Chọn Hoa
                </Link>
              </li>

              <li>
                <Link 
                  href="/contact" 
                  className={`hover:text-brand-600 transition-colors py-1 inline-block ${pathname === '/contact' ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  Liên Hệ & Cửa Hàng
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-start animate-in fade-in">
          <div className="bg-white w-4/5 max-w-sm h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <LinFlowerLogo size={42} showText={true} />
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-stone-500 p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm hoa nhanh..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-full py-2 pl-9 pr-4 text-xs font-medium focus:outline-none"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              {/* Mobile Links */}
              <nav className="space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-4 text-sm font-bold text-stone-800 hover:bg-brand-50 rounded-xl"
                >
                  🌸 Trang Chủ
                </Link>

                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-4 text-sm font-bold text-stone-800 hover:bg-brand-50 rounded-xl"
                >
                  💐 Danh Mục Hoa Tươi
                </Link>

                <div className="pl-6 space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1.5 text-xs text-stone-600 hover:text-brand-600"
                    >
                      • {cat.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/custom-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-4 text-sm font-bold text-brand-600 bg-pink-50 rounded-xl"
                >
                  ✨ Đặt Hoa Theo Mẫu Riêng
                </Link>

                <Link
                  href="/tracking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-4 text-sm font-bold text-stone-800 hover:bg-brand-50 rounded-xl"
                >
                  📦 Tra Cứu Đơn Hàng
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-4 text-sm font-bold text-stone-800 hover:bg-brand-50 rounded-xl"
                >
                  📖 Cẩm Nang Chọn Hoa
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-4 text-sm font-bold text-stone-800 hover:bg-brand-50 rounded-xl"
                >
                  📍 Liên Hệ & Cửa Hàng
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-100 text-xs text-stone-500 space-y-2">
              <a href="tel:0363819228" className="flex items-center gap-2 text-brand-700 font-bold">
                <PhoneCall className="w-4 h-4 text-brand-600" />
                <span>Hotline: 0363 819 228</span>
              </a>
              <p>Thị trấn Phố Mới, Quế Võ, Bắc Ninh</p>
            </div>
          </div>
        </div>
      )}

      {/* Auth & Google Login Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-pink-100">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <LinFlowerLogo size={52} showText={false} />
              </div>
              <h3 className="font-serif font-extrabold text-2xl text-stone-900">
                Đăng Nhập Tài Khoản Lin Flower
              </h3>
              <p className="text-xs text-stone-500">
                Đăng nhập để tích điểm thành viên, lưu địa chỉ giao hoa & theo dõi đơn hàng.
              </p>
            </div>

            {/* Google Sign-In Button */}
            <button
              onClick={() => handleSelectRole('customer')}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold py-3.5 px-4 rounded-2xl shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Đăng nhập bằng Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-stone-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] text-stone-400 font-semibold uppercase tracking-wider absolute">
                Hoặc Chọn Tài Khoản Hệ Thống
              </span>
            </div>

            {/* Realistic Account Selector Options */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleSelectRole('customer')}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between active:scale-98 ${userRole === 'customer' ? 'border-brand-500 bg-brand-50/60 shadow-xs' : 'border-stone-200 hover:bg-stone-50'}`}
              >
                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm">👤 Khách Hàng VIP (hung.nguyen@gmail.com)</div>
                  <div className="text-[11px] text-stone-500">Xem sản phẩm, tích điểm, tra cứu đơn hàng cá nhân.</div>
                </div>
                {userRole === 'customer' && <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />}
              </button>

              <button
                onClick={() => handleSelectRole('staff')}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between active:scale-98 ${userRole === 'staff' ? 'border-blue-500 bg-blue-50/60 shadow-xs' : 'border-stone-200 hover:bg-stone-50'}`}
              >
                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm">💼 Nhân Viên Cửa Hàng (nhanvien@linflower.com)</div>
                  <div className="text-[11px] text-stone-500">Tiếp nhận đơn hàng, cập nhật cắm hoa & vận chuyển.</div>
                </div>
                {userRole === 'staff' && <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />}
              </button>

              <button
                onClick={() => handleSelectRole('admin')}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between active:scale-98 ${userRole === 'admin' ? 'border-amber-500 bg-amber-50/60 shadow-xs' : 'border-stone-200 hover:bg-stone-50'}`}
              >
                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm">👑 Quản Trị Viên (admin@linflower.com)</div>
                  <div className="text-[11px] text-stone-500">Xem báo cáo doanh thu, quản lý sản phẩm & cấu hình.</div>
                </div>
                {userRole === 'admin' && <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />}
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-black text-xs active:scale-95 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
