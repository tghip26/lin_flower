'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const isWished = isInWishlist(product.id);

  const defaultSize = { name: 'Tiêu chuẩn', priceMultiplier: 1.0, description: 'Kích thước tiêu chuẩn' };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-brand-100/70 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-amber-500 text-stone-950 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-sm">
              ★ Best Seller
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-brand-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
              Giảm {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${isWished ? 'bg-brand-500 text-white shadow-pink-soft' : 'bg-white/80 text-stone-600 hover:bg-white hover:text-brand-600'}`}
          title={isWished ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className={`w-4 h-4 ${isWished ? 'fill-white' : ''}`} />
        </button>

        {/* Quick detail overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2 z-10">
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-1 bg-white/90 hover:bg-white text-stone-800 font-bold text-xs px-3.5 py-2 rounded-full backdrop-blur-sm transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Chi Tiết</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-bold text-brand-600 uppercase tracking-wider mb-1">
            {product.occasions[0] || 'Hoa tươi'}
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-serif font-bold text-base text-stone-800 group-hover:text-brand-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-medium">
            {product.flowerComposition}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="font-serif font-extrabold text-base text-brand-700">
              {product.price.toLocaleString('vi-VN')}đ
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[11px] text-stone-400 line-through -mt-0.5">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, defaultSize)}
            className="flex items-center gap-1 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all border border-brand-200 hover:border-brand-600"
            title="Thêm nhanh vào giỏ hàng"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Đặt Nhanh</span>
          </button>
        </div>

      </div>

    </div>
  );
};
