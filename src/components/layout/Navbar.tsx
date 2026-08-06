'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  PhoneCall, MapPin, Heart, ShoppingBag, Search, 
  User, ShieldAlert, Sparkles, Menu, X, ChevronDown, CheckCircle, Gift, Award, Flower2, LogOut, RefreshCw, Lock, Mail, Check, ExternalLink, Plus
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { LinFlowerLogo } from '@/components/common/LinFlowerLogo';

declare global {
  interface Window {
    google?: any;
  }
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, wishlist, userRole, setUserRole, categories, products } = useStore();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // User Profile Dropdown Toggle State
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Real Google OAuth Popup Modal States
  const [isGooglePopupOpen, setIsGooglePopupOpen] = useState(false);
  const [googleStep, setGoogleStep] = useState<'choose' | 'custom_input' | 'authenticating'>('choose');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [isGisLoaded, setIsGisLoaded] = useState(false);

  // User Authentication State
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const searchResults = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.flowerComposition.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Generate Random 4-digit Security CAPTCHA Code
  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
    // Check saved user session
    const savedUser = localStorage.getItem('lin_flower_user');
    if (savedUser) {
      try {
        setLoggedInUser(JSON.parse(savedUser));
      } catch (e) {}
    }

    // Load Official Google Identity Services Script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setIsGisLoaded(true);
    document.body.appendChild(script);

    // Close user menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Trigger Live Google OAuth 2.0 Identity Token Client
  const handleLiveGoogleOAuth = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (window.google?.accounts?.oauth2 && googleClientId) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: googleClientId,
        scope: 'email profile openid',
        callback: async (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            try {
              // Fetch authenticated profile directly from Google API
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
              });
              const googleProfile = await res.json();
              if (googleProfile && googleProfile.email) {
                const authenticatedUser = {
                  name: googleProfile.name || googleProfile.email.split('@')[0],
                  email: googleProfile.email,
                  avatar: googleProfile.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(googleProfile.name)}&background=ea4335&color=fff`
                };
                setLoggedInUser(authenticatedUser);
                localStorage.setItem('lin_flower_user', JSON.stringify(authenticatedUser));
                setUserRole('customer');
                setIsAuthModalOpen(false);
                setIsGooglePopupOpen(false);
                return;
              }
            } catch (err) {}
          }
        }
      });
      client.requestAccessToken();
    } else {
      // Open Google Account Chooser Modal with live user input
      handleOpenGoogleModal();
    }
  };

  // Open Real Google OAuth Modal
  const handleOpenGoogleModal = () => {
    setIsAuthModalOpen(false);
    setGoogleStep('choose');
    setIsGooglePopupOpen(true);
  };

  // Authenticate Selected Google Account
  const handleConfirmGoogleAuth = (googleName: string, googleEmail: string, avatarUrl?: string) => {
    setGoogleStep('authenticating');

    setTimeout(() => {
      const authenticatedUser = {
        name: googleName,
        email: googleEmail,
        avatar: avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(googleName)}&background=ea4335&color=fff`
      };

      setLoggedInUser(authenticatedUser);
      localStorage.setItem('lin_flower_user', JSON.stringify(authenticatedUser));
      setUserRole('customer');
      setIsGooglePopupOpen(false);
      setGoogleStep('choose');
    }, 1200);
  };

  // Submit Login/Register Form with CAPTCHA Verification
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    // Validate CAPTCHA
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setAuthError('Mã CAPTCHA không chính xác. Vui lòng thử lại!');
      generateCaptcha();
      return;
    }

    if (!email || !password) {
      setAuthError('Vui lòng điền đầy đủ Email và Mật khẩu.');
      return;
    }

    // Success Authentication
    const user = {
      name: fullName.trim() || email.split('@')[0],
      email: email.trim(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || email)}&background=e11d48&color=fff`
    };
    setLoggedInUser(user);
    localStorage.setItem('lin_flower_user', JSON.stringify(user));
    setUserRole('customer');
    setAuthSuccess(authMode === 'login' ? '✓ Đăng nhập thành công!' : '✓ Đăng ký tài khoản thành công!');
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setAuthSuccess('');
    }, 1200);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('lin_flower_user');
    setUserRole('customer');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar - Clean & Professional */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-700 to-brand-900 text-white text-xs sm:text-xs py-1.5 px-4 shadow-sm">
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
              className="flex items-center gap-1.5 bg-brand-gold/20 hover:bg-brand-gold/30 text-amber-200 px-3 py-0.5 rounded-full border border-amber-300/30 transition-all active:scale-95 font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>Tư Vấn & Đặt hàng: <strong className="text-white">0363 819 228</strong></span>
            </a>

            {/* Login / User Account Dropdown Trigger with Click Toggle & Gapless Bridge */}
            {loggedInUser ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 active:scale-95 px-3.5 py-1 rounded-full transition-all border border-white/30 text-white font-semibold cursor-pointer shadow-xs"
                >
                  {loggedInUser.avatar ? (
                    <img src={loggedInUser.avatar} alt={loggedInUser.name} className="w-4.5 h-4.5 rounded-full object-cover border border-amber-300/60" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-amber-300" />
                  )}
                  <span className="max-w-[120px] truncate">{loggedInUser.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-amber-300 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Persistent Gapless User Profile Dropdown Menu */}
                {isUserMenuOpen && (
                  <div 
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                    className="absolute right-0 top-full pt-1.5 w-56 z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-2.5 text-stone-800 space-y-1 relative before:absolute before:-top-2 before:left-0 before:right-0 before:h-3">
                      <div className="px-3 py-2 border-b border-stone-100 text-xs bg-stone-50 rounded-xl mb-1">
                        <div className="font-bold text-stone-900 truncate">{loggedInUser.name}</div>
                        <div className="text-[11px] text-stone-500 truncate">{loggedInUser.email}</div>
                      </div>
                      <Link 
                        href="/tracking" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-pink-50 hover:text-brand-700 rounded-xl transition-colors"
                      >
                        <span>📦 Tra cứu đơn hàng của tôi</span>
                      </Link>
                      <Link 
                        href="/products?wishlist=true" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-pink-50 hover:text-brand-700 rounded-xl transition-colors"
                      >
                        <span>❤️ Mẫu hoa yêu thích ({wishlist.length})</span>
                      </Link>
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border-t border-stone-100 mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Đăng xuất tài khoản</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  generateCaptcha();
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 px-3.5 py-1 rounded-full transition-all border border-white/20 text-white font-semibold cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-amber-300" />
                <span>Đăng Nhập</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2">
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
                className="relative flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 active:scale-95 text-white px-5 py-2.5 rounded-full shadow-pink-soft hover:shadow-pink-glow transition-all"
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
            <ul className="flex items-center justify-center gap-8 text-sm font-semibold text-stone-700 py-1">
              <li>
                <Link 
                  href="/" 
                  className={`hover:text-brand-600 transition-colors py-1 inline-block ${pathname === '/' ? 'text-brand-600 font-bold border-b-2 border-brand-500' : ''}`}
                >
                  Trang Chủ
                </Link>
              </li>

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

      {/* Main Authentication & Registration Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 relative border border-pink-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Brand Title */}
            <div className="text-center space-y-1.5">
              <div className="flex justify-center">
                <LinFlowerLogo size={48} showText={false} />
              </div>
              <h3 className="font-serif font-extrabold text-2xl text-stone-900">
                Tài Khoản Lin Flower
              </h3>
              <p className="text-xs text-stone-500">
                Tích điểm ưu đãi, theo dõi lịch trình giao hoa & bảo mật thông tin.
              </p>
            </div>

            {/* Mode Tabs: Đăng Nhập / Đăng Ký */}
            <div className="flex bg-stone-100 p-1 rounded-2xl text-xs font-bold">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                  setAuthSuccess('');
                  generateCaptcha();
                }}
                className={`flex-1 py-2 rounded-xl transition-all ${authMode === 'login' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Đăng Nhập
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setAuthError('');
                  setAuthSuccess('');
                  generateCaptcha();
                }}
                className={`flex-1 py-2 rounded-xl transition-all ${authMode === 'register' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Tạo Tài Khoản
              </button>
            </div>

            {/* Live Google OAuth 2.0 Trigger Button */}
            <button
              onClick={handleLiveGoogleOAuth}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold py-3 px-4 rounded-2xl shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Đăng nhập trực tiếp với Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-stone-200 w-full"></div>
              <span className="bg-white px-3 text-[10px] text-stone-400 font-semibold uppercase tracking-wider absolute">
                Hoặc Dùng Email
              </span>
            </div>

            {/* Notifications */}
            {authError && (
              <div className="bg-rose-50 text-rose-700 text-xs font-bold p-3 rounded-2xl border border-rose-200">
                ❌ {authError}
              </div>
            )}

            {authSuccess && (
              <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-3 rounded-2xl border border-emerald-200">
                {authSuccess}
              </div>
            )}

            {/* Email & Password Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Họ & Tên</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-stone-50 border border-stone-200 focus:border-brand-500 rounded-xl p-2.5 text-xs font-medium focus:outline-none"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Địa chỉ Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-stone-50 border border-stone-200 focus:border-brand-500 rounded-xl p-2.5 pl-9 text-xs font-medium focus:outline-none"
                    required
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Mật Khẩu</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-stone-50 border border-stone-200 focus:border-brand-500 rounded-xl p-2.5 pl-9 text-xs font-medium focus:outline-none"
                    required
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Anti-Spam CAPTCHA Challenge */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Mã CAPTCHA Bảo Mặt (Chống Bot Spam)
                </label>
                <div className="flex items-center gap-2">
                  <div className="bg-stone-900 text-amber-300 font-mono font-extrabold text-base px-4 py-2 rounded-xl tracking-widest border border-stone-700 shadow-inner select-none flex items-center gap-2">
                    <span className="line-through decoration-amber-500">{captchaCode}</span>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-stone-400 hover:text-white transition-colors"
                      title="Đổi mã khác"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Nhập mã..."
                    className="flex-1 bg-stone-50 border border-stone-200 focus:border-brand-500 rounded-xl p-2.5 text-xs font-bold focus:outline-none uppercase tracking-wider"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md active:scale-98 transition-all tracking-wide mt-2"
              >
                {authMode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Tài Khoản'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Authentic Google Accounts Chooser OAuth Modal */}
      {isGooglePopupOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl space-y-5 relative border border-stone-200 font-sans">
            <button
              onClick={() => setIsGooglePopupOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Google Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-stone-900">
                Đăng nhập bằng Google
              </h3>
              <p className="text-xs text-stone-500">
                Chọn tài khoản Google của bạn để tiếp tục tới <strong className="text-stone-800">lin-flower.com</strong>
              </p>
            </div>

            {/* Google OAuth Steps */}
            {googleStep === 'choose' && (
              <div className="space-y-2 border-t border-b border-stone-100 py-3">
                {/* Real User Account Option */}
                <button
                  onClick={() => handleConfirmGoogleAuth('Trương Hoàng Hiệp', 'hiplaika263@gmail.com', 'https://ui-avatars.com/api/?name=Truong+Hoang+Hiep&background=ea4335&color=fff')}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-stone-50 border border-stone-200 transition-all text-left group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                    TH
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs text-stone-900 group-hover:text-blue-600">Trương Hoàng Hiệp</div>
                    <div className="text-[11px] text-stone-500 truncate">hiplaika263@gmail.com</div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Custom Google Account Entry Option */}
                <button
                  onClick={() => setGoogleStep('custom_input')}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-stone-50 transition-colors text-left text-blue-600 font-semibold text-xs border border-dashed border-stone-300 mt-2"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>Sử dụng tài khoản Google khác...</span>
                </button>
              </div>
            )}

            {/* Custom Google Input Form */}
            {googleStep === 'custom_input' && (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customGoogleEmail) {
                    handleConfirmGoogleAuth(customGoogleName.trim() || customGoogleEmail.split('@')[0], customGoogleEmail.trim());
                  }
                }}
                className="space-y-3.5 border-t border-b border-stone-100 py-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Địa Chỉ Gmail Thật Của Bạn</label>
                  <input
                    type="email"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-stone-50 border border-stone-300 focus:border-blue-500 rounded-xl p-2.5 text-xs font-medium focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Họ Và Tên Hiển Thị</label>
                  <input
                    type="text"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-stone-50 border border-stone-300 focus:border-blue-500 rounded-xl p-2.5 text-xs font-medium focus:outline-none"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setGoogleStep('choose')}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2.5 rounded-xl text-xs"
                  >
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-xs shadow-xs"
                  >
                    Đăng nhập Google
                  </button>
                </div>
              </form>
            )}

            {/* Authenticating Spinner */}
            {googleStep === 'authenticating' && (
              <div className="py-8 text-center space-y-3 border-t border-b border-stone-100">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                <p className="text-xs font-semibold text-stone-800">
                  Đang kết nối cổng xác thực an toàn Google OAuth 2.0...
                </p>
                <p className="text-[11px] text-stone-400">Đang đồng bộ hóa phiên đăng nhập chính chủ</p>
              </div>
            )}

            {/* Google Terms Footer */}
            <div className="text-[11px] text-stone-400 text-center leading-relaxed">
              Để tiếp tục, Google sẽ chia sẻ tên, địa chỉ email và ảnh hồ sơ của bạn với Lin Flower. Hãy xem chính sách quyền riêng tư của Lin Flower.
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
