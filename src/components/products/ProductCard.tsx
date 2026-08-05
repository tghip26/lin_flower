'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
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
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
      className="group bg-white rounded-3xl overflow-hidden border border-brand-100/70 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
    >
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100 transform-gpu">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out will-change-transform"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-amber-500 text-stone-950 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow-sm">
              ★ Best Seller
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-brand-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-sm">
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
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all active:scale-125 z-10 ${isWished ? 'bg-brand-500 text-white shadow-pink-soft' : 'bg-white/80 text-stone-600 hover:bg-white hover:text-brand-600'}`}
          title={isWished ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className={`w-4 h-4 ${isWished ? 'fill-white' : ''}`} />
        </button>

        {/* Quick detail overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2 z-10">
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-stone-800 font-bold text-xs px-4.5 py-2 rounded-full backdrop-blur-sm transition-all active:scale-95 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Chi Tiết</span>
          </Link>
        </div>
      </div>

      {/* Content with Generous Un-cramped Spacing */}
      <div className="p-5 sm:p-5.5 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-brand-600 uppercase tracking-widest">
            {product.occasions[0] || 'Hoa tươi'}
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-brand-600 transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-stone-500 line-clamp-1 font-medium">
            {product.flowerComposition}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="font-serif font-extrabold text-lg sm:text-xl text-brand-700">
              {product.price.toLocaleString('vi-VN')}đ
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-stone-400 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, defaultSize, [], '')}
            className="flex items-center gap-1.5 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all active:scale-95 border border-brand-200/80 shadow-2xs"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Đặt Mua</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
