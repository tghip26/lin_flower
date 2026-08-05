'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    appliedVoucher, 
    applyVoucher, 
    removeVoucher, 
    discountAmount 
  } = useStore();

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherMsg, setVoucherMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    const result = applyVoucher(voucherInput);
    if (result.success) {
      setVoucherMsg({ type: 'success', text: result.message });
      setVoucherInput('');
    } else {
      setVoucherMsg({ type: 'error', text: result.message });
    }
  };

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 border border-brand-400/40 flex items-center justify-center text-brand-300">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">Giỏ Hàng Lin Flower</h3>
                <p className="text-xs text-stone-400">Có {cart.length} món trong giỏ hàng</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Item list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-800">Giỏ hàng đang trống</h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Hãy lựa chọn những bó hoa tươi thắm nhất dành tặng cho người thân yêu của bạn!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-pink-soft transition-all"
                >
                  Khám Phá Các Mẫu Hoa
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemBasePrice = item.product.price * item.selectedSize.priceMultiplier;
                const addOnsPrice = item.selectedAddOns.reduce((s, a) => s + a.price, 0);
                const itemUnitPrice = itemBasePrice + addOnsPrice;

                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-2xl border border-stone-200 shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-stone-800 text-sm line-clamp-1">{item.product.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-xs text-stone-500 font-medium">
                          Size: <span className="text-brand-600 font-semibold">{item.selectedSize.name}</span>
                        </p>

                        {item.selectedAddOns.length > 0 && (
                          <div className="text-[11px] text-stone-500 mt-1">
                            + {item.selectedAddOns.map(a => a.name).join(', ')}
                          </div>
                        )}

                        {item.cardMessage && (
                          <div className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded-lg mt-1 border border-amber-200/60 line-clamp-1">
                            💌 "{item.cardMessage}"
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-sm text-brand-700">
                          {(itemUnitPrice * item.quantity).toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 space-y-3">
              {/* Voucher Code Form */}
              <form onSubmit={handleApplyVoucher} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                      placeholder="Mã giảm giá (ví dụ: LINFLOWER10)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-brand-500 focus:outline-none"
                    />
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="bg-stone-800 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>
                {voucherMsg && (
                  <p className={`text-[11px] font-medium ${voucherMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                    {voucherMsg.text}
                  </p>
                )}
              </form>

              {appliedVoucher && (
                <div className="flex items-center justify-between text-xs bg-green-50 p-2 rounded-xl border border-green-200 text-green-700">
                  <span className="flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-green-600" />
                    Đã áp dụng mã: {appliedVoucher.code}
                  </span>
                  <button onClick={removeVoucher} className="text-red-500 hover:underline font-bold">Xóa</button>
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Tạm tính hoa:</span>
                  <span className="font-semibold text-stone-800">{cartSubtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Giảm giá voucher:</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>Thiệp chúc mừng & Băng rôn:</span>
                  <span className="text-brand-600 font-bold">Miễn Phí</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="font-serif text-xl text-brand-700">{finalTotal.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              {/* Checkout link */}
              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-3.5 rounded-2xl shadow-pink-soft hover:shadow-pink-glow transition-all"
              >
                <span>Tiến Hành Đặt Hàng Nhanh</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
