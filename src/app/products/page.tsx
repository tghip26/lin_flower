'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/products/ProductCard';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const wishlistParam = searchParams.get('wishlist');
  const bestsellerParam = searchParams.get('bestseller');

  const { products, categories, wishlist } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'bestseller'>('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(wishlistParam === 'true');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;

      // Occasion filter
      if (selectedOccasion !== 'all' && !p.occasions.includes(selectedOccasion)) return false;

      // Price filter
      if (p.price > maxPrice) return false;

      // Wishlist filter
      if (showWishlistOnly && !wishlist.includes(p.id)) return false;

      // Best seller filter
      if (bestsellerParam === 'true' && !p.isBestSeller) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0;
    });
  }, [products, selectedCategory, selectedOccasion, maxPrice, showWishlistOnly, bestsellerParam, sortBy, wishlist]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setMaxPrice(10000000);
    setSortBy('default');
    setShowWishlistOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb & Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900">
          {showWishlistOnly ? 'Sản Phẩm Yêu Thích Của Bạn' : 'Danh Mục Hoa Tươi Lin Flower'}
        </h1>
        <p className="text-sm text-stone-500">
          {filteredProducts.length} mẫu hoa tươi tuyệt đẹp sẵn sàng giao tận tay trong 2H
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-brand-100 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-800 text-lg">
                <SlidersHorizontal className="w-5 h-5 text-brand-600" />
                <span>Bộ Lọc Hoa</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-stone-400 hover:text-brand-600 flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Danh mục chính</label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left p-2 rounded-xl font-medium transition-colors ${selectedCategory === 'all' ? 'bg-brand-600 text-white font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
                >
                  Tất cả danh mục ({products.length})
                </button>
                {categories.map((cat) => {
                  const count = products.filter(p => p.categoryId === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left p-2 rounded-xl font-medium transition-colors flex justify-between items-center ${selectedCategory === cat.id ? 'bg-brand-600 text-white font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-75">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="space-y-2 pt-4 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Theo dịp mừng</label>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              >
                <option value="all">Tất cả dịp mừng</option>
                <option value="Sinh nhật">Sinh nhật</option>
                <option value="Khai trương">Khai trương</option>
                <option value="Cưới hỏi">Cưới hỏi</option>
                <option value="Tình yêu">Tình yêu</option>
                <option value="Chia buồn">Chia buồn</option>
                <option value="Tốt nghiệp">Tốt nghiệp</option>
                <option value="Kỷ niệm">Kỷ niệm</option>
              </select>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-stone-700 uppercase tracking-wider">Mức giá tối đa</label>
                <span className="font-serif font-bold text-brand-600">{maxPrice.toLocaleString('vi-VN')}đ</span>
              </div>
              <input
                type="range"
                min={300000}
                max={10000000}
                step={100000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Sort Controls */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
            
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Hiển thị:</span>
              <button
                onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                className={`px-3 py-1.5 rounded-full border transition-all ${showWishlistOnly ? 'bg-brand-500 text-white border-brand-500 font-bold' : 'bg-stone-50 text-stone-700 border-stone-200'}`}
              >
                ♥ Chỉ xem yêu thích ({wishlist.length})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-stone-400" />
              <span className="text-stone-500">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="default">Mặc định</option>
                <option value="bestseller">Bán chạy nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
            </div>

          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mx-auto">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-800">Không tìm thấy mẫu hoa nào</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Thử thay đổi bộ lọc mức giá, dịp mừng hoặc bấm "Đặt lại" để xem thêm nhiều mẫu hoa khác.
              </p>
              <button
                onClick={resetFilters}
                className="bg-brand-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-pink-soft"
              >
                Đặt lại tất cả bộ lọc
              </button>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
