'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  PhoneCall, MapPin, Heart, ShoppingBag, Search, 
  User, ShieldAlert, Sparkles, Menu, X, ChevronDown, CheckCircle, Gift, Award, Flower2 
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
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  return (
    <>
      {/* Top Announcement Bar */}
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

            {/* Quick Role Switcher Button */}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 active:scale-95 px-3 py-1 rounded-full transition-all border border-white/20"
            >
              <User className="w-3.5 h-3.5" />
              <span className="capitalize font-medium">
                Quyền: <strong className="text-amber-200">{userRole === 'admin' ? 'Admin' : userRole === 'staff' ? 'Nhân viên' : 'Khách hàng'}</strong>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
                className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-brand-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              
              {/* Autocomplete Popup */}
              {isSearchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-brand-100 p-3 z-50 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 px-2">Kết quả tìm kiếm ({searchResults.length})</div>
                  {searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            router.push(`/products/${product.id}`);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-brand-50 rounded-2xl cursor-pointer transition-colors active:scale-98"
                        >
                          <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-xl" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-stone-800 truncate">{product.name}</h4>
                            <p className="text-xs text-brand-600 font-bold">{product.price.toLocaleString('vi-VN')}đ</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-stone-500 p-4 text-center">Không tìm thấy hoa phù hợp với từ khóa này.</p>
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
                className="relative flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 active:scale-95 text-white px-4 py-2 rounded-full shadow-pink-soft hover:shadow-pink-glow transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm font-bold hidden sm:inline">Giỏ hàng</span>
                <span className="bg-white text-brand-700 text-xs font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                  {cartItemCount}
                </span>
              </button>

              {/* Admin Portal Button */}
              {(userRole === 'admin' || userRole === 'staff') && (
                <Link
                  href="/admin"
                  className="hidden md:flex items-center gap-1.5 bg-stone-900 text-amber-300 hover:bg-black active:scale-95 px-3.5 py-2 rounded-full text-xs font-bold transition-all border border-amber-400/30"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Trang Quản Trị</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:block bg-stone-50/80 border-t border-brand-100/60">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex items-center justify-center gap-8 text-sm font-semibold text-stone-700 py-2.5">
              <li>
                <Link 
                  href="/" 
                  className={`hover:text-brand-600 transition-colors py-1 inline-block ${pathname === '/' ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  Trang Chủ
                </Link>
              </li>

              {/* Polish Dropdown for "Danh Mục Hoa" */}
              <li className="relative group py-1">
                <Link 
                  href="/products" 
                  className={`flex items-center gap-1 hover:text-brand-600 transition-colors ${pathname.startsWith('/products') ? 'text-brand-600 font-bold' : ''}`}
                >
                  <span>Danh Mục Hoa</span>
                  <ChevronDown className="w-4 h-4 text-stone-400 group-hover:rotate-180 transition-transform duration-300" />
                </Link>

                {/* Dropdown Menu Box */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-brand-100/80 p-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-50">
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-3 py-1.5 border-b border-stone-100">Tất cả danh mục sản phẩm</div>
                  
                  <div className="space-y-1 pt-1.5">
                    {categories.map((cat) => {
                      const count = products.filter(p => p.categoryId === cat.id).length;
                      return (
                        <Link
                          key={cat.id}
                          href={`/products?category=${cat.id}`}
                          className="flex items-center gap-3 p-2.5 hover:bg-brand-50/80 rounded-2xl transition-all group/item active:scale-98"
                        >
                          <div className="w-9 h-9 rounded-xl bg-brand-100/50 flex items-center justify-center flex-shrink-0 group-hover/item:bg-brand-500 group-hover/item:text-white transition-colors">
                            {getCategoryIcon(cat.id)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-stone-800 text-xs group-hover/item:text-brand-700 flex justify-between items-center">
                              <span>{cat.name}</span>
                              <span className="text-[10px] text-stone-400 font-normal">({count})</span>
                            </div>
                            <div className="text-[11px] text-stone-500 truncate">{cat.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>

              <li>
                <Link 
                  href="/custom-order" 
                  className={`flex items-center gap-1 hover:text-brand-600 transition-colors py-1 ${pathname === '/custom-order' ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Đặt Hoa Theo Yêu Cầu</span>
                </Link>
              </li>

              <li>
                <Link 
                  href="/tracking" 
                  className={`hover:text-brand-600 transition-colors py-1 ${pathname === '/tracking' ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  Tra Cứu Đơn Hàng
                </Link>
              </li>

              <li>
                <Link 
                  href="/blog" 
                  className={`hover:text-brand-600 transition-colors py-1 ${pathname.startsWith('/blog') ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  Cẩm Nang Chọn Hoa
                </Link>
              </li>

              <li>
                <Link 
                  href="/contact" 
                  className={`hover:text-brand-600 transition-colors py-1 ${pathname === '/contact' ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  Liên Hệ & Cửa Hàng
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 p-4 space-y-4 animate-in slide-in-from-top duration-300">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm hoa nhanh..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-stone-100 border border-stone-200 rounded-xl"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex flex-col space-y-2 text-sm font-semibold text-stone-700">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-stone-50 rounded-lg">Trang Chủ</Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-stone-50 rounded-lg">Tất Cả Sản Phẩm Hoa</Link>
              <div className="pl-4 space-y-1 text-xs text-stone-600 border-l-2 border-brand-200">
                {categories.map((c) => (
                  <Link key={c.id} href={`/products?category=${c.id}`} onClick={() => setIsMobileMenuOpen(false)} className="block p-1.5 hover:text-brand-600">
                    • {c.name}
                  </Link>
                ))}
              </div>
              <Link href="/custom-order" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-stone-50 rounded-lg text-brand-600 font-bold flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500" /> Đặt Hoa Theo Yêu Cầu
              </Link>
              <Link href="/tracking" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-stone-50 rounded-lg">Tra Cứu Đơn Hàng</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-stone-50 rounded-lg">Cẩm Nang Chọn Hoa</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-stone-50 rounded-lg">Liên Hệ Lin Flower</Link>
              
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsRoleModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs bg-stone-100 px-3 py-2 rounded-lg font-bold text-stone-700 active:scale-95"
                >
                  Đổi Quyền: <span className="text-brand-600 capitalize">{userRole}</span>
                </button>

                {(userRole === 'admin' || userRole === 'staff') && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs bg-stone-900 text-amber-300 px-3 py-2 rounded-lg font-bold active:scale-95"
                  >
                    Vào Trang Quản Trị
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Role Selector Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-brand-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-brand-600" />
                <h3 className="font-serif font-bold text-lg text-stone-800">Chuyển Đổi Quyền Sử Dụng</h3>
              </div>
              <button onClick={() => setIsRoleModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Chọn vai trò bạn muốn trải nghiệm trên hệ thống website Lin Flower:
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setUserRole('customer');
                  setIsRoleModalOpen(false);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between active:scale-98 ${userRole === 'customer' ? 'border-brand-500 bg-brand-50/50 shadow-sm' : 'border-stone-200 hover:bg-stone-50'}`}
              >
                <div>
                  <div className="font-bold text-stone-800 text-sm">1. Khách Hàng (Customer)</div>
                  <div className="text-xs text-stone-500">Xem sản phẩm, đặt hoa, dùng mã giảm giá, tra cứu đơn hàng.</div>
                </div>
                {userRole === 'customer' && <CheckCircle className="w-5 h-5 text-brand-600" />}
              </button>

              <button
                onClick={() => {
                  setUserRole('admin');
                  setIsRoleModalOpen(false);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between active:scale-98 ${userRole === 'admin' ? 'border-amber-500 bg-amber-50/50 shadow-sm' : 'border-stone-200 hover:bg-stone-50'}`}
              >
                <div>
                  <div className="font-bold text-stone-800 text-sm">2. Admin (Toàn Quyền Quản Trị)</div>
                  <div className="text-xs text-stone-500">Xem biểu đồ doanh thu, thêm/sửa/xóa sản phẩm, duyệt đơn, phân quyền.</div>
                </div>
                {userRole === 'admin' && <CheckCircle className="w-5 h-5 text-amber-600" />}
              </button>

              <button
                onClick={() => {
                  setUserRole('staff');
                  setIsRoleModalOpen(false);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between active:scale-98 ${userRole === 'staff' ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-stone-200 hover:bg-stone-50'}`}
              >
                <div>
                  <div className="font-bold text-stone-800 text-sm">3. Nhân Viên (Staff - Xử lý Đơn / Kho)</div>
                  <div className="text-xs text-stone-500">Xử lý đơn hàng, cập nhật trạng thái cắm hoa/giao hoa, quản lý kho.</div>
                </div>
                {userRole === 'staff' && <CheckCircle className="w-5 h-5 text-blue-600" />}
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="w-full bg-stone-900 text-white font-bold py-2.5 rounded-xl hover:bg-black text-sm active:scale-95 transition-colors"
              >
                Hoàn Tất
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
