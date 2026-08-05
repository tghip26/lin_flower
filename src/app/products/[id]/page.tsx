'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Heart, ShoppingBag, Truck, ShieldCheck, CheckCircle2, 
  Sparkles, Star, MessageSquare, Plus, Check, PhoneCall 
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SizeOption, AddOn } from '@/types';
import { INITIAL_ADD_ONS } from '@/data/mockData';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { products, addToCart, toggleWishlist, isInWishlist, reviews, addReview } = useStore();

  const product = products.find((p) => p.id === productId);

  const sizeOptions: SizeOption[] = [
    { name: 'Tiêu chuẩn', priceMultiplier: 1.0, description: 'Kích thước tiêu chuẩn như hình' },
    { name: 'Cao cấp (+30%)', priceMultiplier: 1.3, description: 'Tăng 30% số lượng hoa rực rỡ' },
    { name: 'V.I.P (+60%)', priceMultiplier: 1.6, description: 'Tăng 60% số lượng hoa nhập khẩu VIP' },
  ];

  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizeOptions[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [cardMessage, setCardMessage] = useState('');
  const [bannerText, setBannerText] = useState('');

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-stone-800">Không tìm thấy sản phẩm hoa này</h2>
        <p className="text-sm text-stone-500">Sản phẩm có thể đã dừng kinh doanh hoặc sai đường dẫn.</p>
        <Link href="/products" className="inline-block bg-brand-600 text-white font-bold px-6 py-3 rounded-full">
          Xem các mẫu hoa khác
        </Link>
      </div>
    );
  }

  const isWished = isInWishlist(product.id);

  const unitBasePrice = Math.round(product.price * selectedSize.priceMultiplier);
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = unitBasePrice + addOnsTotal;

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addon.id) ? prev.filter((a) => a.id !== addon.id) : [...prev, addon]
    );
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedAddOns, cardMessage, bannerText);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedAddOns, cardMessage, bannerText);
    router.push('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    addReview({
      productId: product.id,
      customerName: reviewerName,
      rating: reviewRating,
      comment: reviewComment,
    });

    setReviewerName('');
    setReviewComment('');
    setReviewSuccessMsg(true);
    setTimeout(() => setReviewSuccessMsg(false), 4000);
  };

  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Product Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-stone-200 shadow-md bg-stone-100">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${isWished ? 'bg-brand-500 text-white' : 'bg-white/80 text-stone-700 hover:bg-white'}`}
            >
              <Heart className={`w-5 h-5 ${isWished ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === idx ? 'border-brand-600 ring-2 ring-brand-300' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="flex items-center gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <Truck className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-stone-800">Giao Nhanh 2H</div>
                <div className="text-stone-500">Tận nhà tại Bắc Ninh</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-stone-800">100% Hoa Tươi</div>
                <div className="text-stone-500">Đổi trả 1-1 nếu lỗi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Configuration Form */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thiết Kế Độc Quyền Lin Flower</span>
            </div>
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900 leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-stone-500 font-medium mt-1">
              Thành phần hoa: <strong className="text-stone-700">{product.flowerComposition}</strong>
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-brand-50/60 p-4 rounded-2xl border border-brand-100 flex items-baseline gap-3">
            <span className="font-serif font-extrabold text-3xl text-brand-700">
              {totalPrice.toLocaleString('vi-VN')}đ
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-stone-400 line-through">
                {(product.originalPrice * selectedSize.priceMultiplier).toLocaleString('vi-VN')}đ
              </span>
            )}
            <span className="text-xs text-stone-500 font-medium ml-auto">
              (Đã bao gồm thuế & VAT)
            </span>
          </div>

          {/* Size Options */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">1. Chọn kích thước lẵng/bó hoa</label>
            <div className="grid grid-cols-3 gap-3">
              {sizeOptions.map((sz) => (
                <button
                  key={sz.name}
                  onClick={() => setSelectedSize(sz)}
                  className={`p-3 rounded-2xl border text-left transition-all relative ${selectedSize.name === sz.name ? 'border-brand-600 bg-brand-50/50 shadow-sm text-stone-900 font-bold' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                >
                  <div className="text-xs font-bold">{sz.name}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{sz.description}</div>
                  {selectedSize.name === sz.name && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-brand-600 text-white rounded-full flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">2. Quà tặng kèm (Tùy chọn)</label>
            <div className="grid grid-cols-2 gap-3">
              {INITIAL_ADD_ONS.map((addon) => {
                const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${isChecked ? 'border-brand-600 bg-brand-50/40' : 'border-stone-200 hover:bg-stone-50'}`}
                  >
                    <img src={addon.image} alt={addon.name} className="w-10 h-10 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-stone-800 truncate">{addon.name}</div>
                      <div className="text-xs font-serif font-bold text-brand-600">
                        {addon.price === 0 ? 'Miễn Phí' : `+${addon.price.toLocaleString('vi-VN')}đ`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Greeting Card Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-stone-800 uppercase tracking-wider">3. Lời chúc trên Thiệp / Băng Rôn (Miễn Phí)</label>
              <span className="text-brand-600 font-semibold">Tự động in chữ nghệ thuật</span>
            </div>
            
            <textarea
              rows={2}
              value={cardMessage}
              onChange={(e) => setCardMessage(e.target.value)}
              placeholder="Nhập nội dung lời chúc gửi kèm hoa (ví dụ: Mừng sinh nhật em yêu, Chúc em luôn rạng rỡ)..."
              className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            ></textarea>

            {/* Template suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-stone-400 font-medium">Gợi ý nhanh:</span>
              {[
                'Mừng sinh nhật vui vẻ & hạnh phúc!',
                'Chúc mừng khai trương hồng phát - Vạn sự như ý!',
                'Chúc mừng kỷ niệm ngày cưới hạnh phúc!',
                'Thành kính chia buồn cùng gia quyến'
              ].map((msg, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCardMessage(msg)}
                  className="text-[10px] bg-stone-100 hover:bg-brand-50 hover:text-brand-700 text-stone-600 px-2 py-1 rounded-md transition-colors"
                >
                  + {msg}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-black text-white font-bold py-3.5 rounded-2xl shadow-sm text-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Vào Giỏ Hàng</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-3.5 rounded-2xl shadow-pink-soft hover:shadow-pink-glow text-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Đặt Hàng Ngay</span>
              </button>
            </div>

            <div className="text-center">
              <a
                href="tel:0363819228"
                className="inline-flex items-center gap-1.5 text-xs text-brand-700 hover:underline font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand-600" />
                <span>Bạn muốn điều chỉnh bông/màu sắc? Gọi ngay: <strong>0363 819 228</strong></span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Description & Care Guide Tab Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6">
        <h3 className="font-serif font-bold text-xl text-stone-900 border-b pb-3">Chi Tiết Sản Phẩm & Hướng Dẫn Bảo Quản Hoa</h3>
        
        <div className="prose prose-stone text-sm leading-relaxed space-y-4">
          <p>{product.description}</p>
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <h4 className="font-bold text-stone-800 text-sm mb-2">🌸 Hướng dẫn giữ hoa tươi lâu tại nhà:</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600">
              <li>Đặt lẵng/bó hoa ở vị trí thoáng mát, tránh ánh nắng trực tiếp và quạt gió quá mạnh.</li>
              <li>Với lẵng hoa có mút xốp: Châm thêm 100ml nước sạch vào lòng mút xốp mỗi ngày.</li>
              <li>Với bó hoa: Tỉa bớt gốc 1cm và cắm vào bình nước sạch.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-8">
        <div className="flex justify-between items-center border-b border-stone-200 pb-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">Đánh Giá Từ Khách Hàng</h3>
            <p className="text-xs text-stone-500">Ý kiến phản hồi thực tế ({productReviews.length} nhận xét)</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>5.0 / 5.0 (Tuyệt vời)</span>
          </div>
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {productReviews.length > 0 ? (
            productReviews.map((rev) => (
              <div key={rev.id} className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">{rev.customerName}</span>
                  <span className="text-stone-400">{rev.createdAt}</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 italic">"{rev.comment}"</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-stone-500 italic">Chưa có đánh giá nào cho mẫu hoa này. Hãy là người đầu tiên để lại cảm nhận!</p>
          )}
        </div>

        {/* Submit Review Form */}
        <form onSubmit={handleReviewSubmit} className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
          <h4 className="font-bold text-stone-800 text-sm">Viết Đánh Giá Của Bạn</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Họ tên người mua</label>
              <input
                type="text"
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Nhập tên của bạn"
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Đánh giá số sao</label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5/5 - Rất hài lòng)</option>
                <option value={4}>⭐⭐⭐⭐ (4/5 - Hài lòng)</option>
                <option value={3}>⭐⭐⭐ (3/5 - Bình thường)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Nội dung cảm nhận</label>
            <textarea
              rows={3}
              required
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Chia sẻ trải nghiệm về độ tươi của hoa, độ đẹp của thiệp và thái độ phục vụ..."
              className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
            ></textarea>
          </div>

          {reviewSuccessMsg && (
            <p className="text-xs font-bold text-green-600 bg-green-50 p-2.5 rounded-xl border border-green-200">
              ✓ Cảm ơn bạn đã gửi đánh giá! Đánh giá đã được xuất bản công khai.
            </p>
          )}

          <button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors"
          >
            Gửi Đánh Giá Ngay
          </button>
        </form>

      </div>

    </div>
  );
}
