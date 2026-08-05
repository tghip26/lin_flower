'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShoppingBag, Truck, Calendar, Clock, CreditCard, 
  CheckCircle, Tag, Sparkles, ShieldCheck, User, Phone, MapPin, ArrowRight 
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PaymentMethod } from '@/types';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    cart, 
    cartSubtotal, 
    appliedVoucher, 
    applyVoucher, 
    removeVoucher, 
    discountAmount, 
    placeOrder,
    vietQRConfig
  } = useStore();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  
  const [isSameAsCustomer, setIsSameAsCustomer] = useState(true);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('10:00 - 12:00');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const [cardMessage, setCardMessage] = useState('');
  const [bannerText, setBannerText] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vietqr');
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [voucherMsg, setVoucherMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [orderCreated, setOrderCreated] = useState<any>(null);

  // Synchronize recipient info if same as customer
  useEffect(() => {
    if (isSameAsCustomer) {
      setRecipientName(customerName);
      setRecipientPhone(customerPhone);
    }
  }, [isSameAsCustomer, customerName, customerPhone]);

  if (cart.length === 0 && !orderCreated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-stone-800">Giỏ hàng của bạn đang trống</h2>
        <p className="text-sm text-stone-500">Vui lòng chọn ít nhất 1 sản phẩm hoa trước khi thanh toán.</p>
        <Link href="/products" className="inline-block bg-brand-600 text-white font-bold px-6 py-3 rounded-full shadow-pink-soft">
          Khám Phá Các Mẫu Hoa
        </Link>
      </div>
    );
  }

  const shippingFee = 0; // Free ship promotional
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCodeInput.trim()) return;
    const res = applyVoucher(voucherCodeInput);
    if (res.success) {
      setVoucherMsg({ type: 'success', text: res.message });
      setVoucherCodeInput('');
    } else {
      setVoucherMsg({ type: 'error', text: res.message });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !recipientAddress) {
      alert('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng!');
      return;
    }

    const newOrder = placeOrder({
      customerName,
      customerPhone,
      customerEmail,
      recipientName: isSameAsCustomer ? customerName : recipientName,
      recipientPhone: isSameAsCustomer ? customerPhone : recipientPhone,
      recipientAddress,
      deliveryDate,
      deliveryTimeSlot,
      isAnonymous,
      cardMessage,
      bannerText,
      items: cart,
      subtotal: cartSubtotal,
      discount: discountAmount,
      voucherCode: appliedVoucher?.code,
      shippingFee,
      totalPrice: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'vietqr' ? 'paid' : 'unpaid',
    });

    setOrderCreated(newOrder);

    // Fire Confetti Celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // SUCCESS CONFIRMATION VIEW
  if (orderCreated) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=STK:${vietQRConfig.accountNo}-${vietQRConfig.bankCode}-ND:${orderCreated.id}-AM:${orderCreated.totalPrice}`;

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-300">
        
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center mx-auto border-2 border-white/40">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl">Đặt Hàng Thành Công!</h1>
          <p className="text-emerald-100 text-sm max-w-lg mx-auto">
            Cảm ơn bạn đã lựa chọn <strong className="text-white">Lin Flower</strong>. Mã đơn hàng của bạn là <strong className="bg-white/20 px-3 py-1 rounded-full text-amber-200">{orderCreated.id}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Order Summary & Bank Transfer Details */}
          <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-stone-900 border-b pb-3">Chi Tiết Đơn Hàng</h3>
            
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span className="text-stone-400">Người đặt:</span>
                <span className="font-bold text-stone-800">{orderCreated.customerName} ({orderCreated.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Người nhận hoa:</span>
                <span className="font-bold text-stone-800">{orderCreated.recipientName} ({orderCreated.recipientPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Địa chỉ giao:</span>
                <span className="font-bold text-stone-800 text-right max-w-xs">{orderCreated.recipientAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Thời gian giao:</span>
                <span className="font-bold text-brand-600">{orderCreated.deliveryDate} ({orderCreated.deliveryTimeSlot})</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-3">
              <h4 className="font-bold text-stone-800 text-xs">Sản phẩm hoa đã chọn:</h4>
              {orderCreated.items.map((it: any) => (
                <div key={it.id} className="flex items-center gap-3 text-xs">
                  <img src={it.product.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-stone-800">{it.product.name}</div>
                    <div className="text-stone-500">Size: {it.selectedSize.name} x {it.quantity}</div>
                  </div>
                  <div className="font-bold text-brand-700">
                    {(it.product.price * it.selectedSize.priceMultiplier * it.quantity).toLocaleString('vi-VN')}đ
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-between items-center text-sm font-bold">
              <span>Tổng thanh toán:</span>
              <span className="font-serif text-2xl text-brand-700">{orderCreated.totalPrice.toLocaleString('vi-VN')}đ</span>
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href={`/tracking?orderId=${orderCreated.id}&phone=${orderCreated.customerPhone}`}
                className="w-full text-center bg-stone-900 hover:bg-black text-white font-bold text-xs py-3 rounded-xl transition-colors active:scale-95"
              >
                Tra Cứu Tiến Độ Đơn Hàng Live
              </Link>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="md:col-span-5 space-y-6">
            {orderCreated.paymentMethod === 'vietqr' ? (
              <div className="bg-amber-50/80 p-6 rounded-3xl border border-amber-200 text-center space-y-4 shadow-sm">
                <div className="inline-flex items-center gap-1.5 bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  Thanh Toán VietQR Tự Động
                </div>
                
                <h4 className="font-serif font-bold text-lg text-stone-900">Quét Mã QR Chuyển Khoản Ngân Hàng</h4>
                
                <div className="bg-white p-3 rounded-2xl shadow-sm inline-block border border-amber-200">
                  <img src={qrUrl} alt="VietQR Payment" className="w-48 h-48 mx-auto" />
                </div>

                <div className="text-xs text-stone-700 space-y-1.5 text-left bg-white p-3.5 rounded-xl border border-amber-200">
                  <div>Tên TK: <strong className="text-stone-900">{vietQRConfig.accountName}</strong></div>
                  <div>Số TK: <strong className="text-brand-700 font-bold text-sm">{vietQRConfig.accountNo}</strong> ({vietQRConfig.bankName})</div>
                  <div>Số tiền: <strong className="text-brand-700 font-bold">{orderCreated.totalPrice.toLocaleString('vi-VN')}đ</strong></div>
                  <div>Cú pháp: <strong className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-mono">{orderCreated.id}</strong></div>
                </div>

                <p className="text-[11px] text-stone-500">
                  Nhân viên Lin Flower sẽ gọi điện xác nhận ngay sau khi nhận được chuyển khoản!
                </p>
              </div>
            ) : (
              <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 text-center space-y-4">
                <h4 className="font-serif font-bold text-lg text-stone-900">Thanh Toán Khi Nhận Hoa (COD)</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Đơn hàng sẽ được nhân viên cắm hoa chuẩn bị và giao tới địa chỉ vào thời gian <strong className="text-brand-700">{orderCreated.deliveryDate} ({orderCreated.deliveryTimeSlot})</strong>. Bạn sẽ thanh toán cho shipper sau khi nhận và kiểm tra hoa.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="font-serif font-extrabold text-3xl text-stone-900">Đặt Hàng & Thanh Toán Nhanh</h1>
        <p className="text-xs text-stone-500 mt-1">Hoàn tất thông tin giao nhận để Lin Flower chuẩn bị lẵng hoa tươi thắm nhất cho bạn</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Columns */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Customer & Recipient Details */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-lg border-b pb-3">
              <User className="w-5 h-5 text-brand-600" />
              <span>1. Thông Tin Người Đặt & Người Nhận Hoa</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Họ tên người đặt *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0988xxxxxx"
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSameAsCustomer}
                  onChange={(e) => setIsSameAsCustomer(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>Người nhận hoa chính là tôi</span>
              </label>
            </div>

            {!isSameAsCustomer && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Họ tên người nhận *</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Trần Thị B"
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">SĐT người nhận *</label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="0977xxxxxx"
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Địa chỉ giao hoa chi tiết *</label>
              <input
                type="text"
                required
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Số nhà, đường/thôn, Thị trấn Phố Mới, Quế Võ, Bắc Ninh..."
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>🕵️ Giao hàng ẩn danh (Giữ bí mật thông tin người tặng tạo bất ngờ)</span>
              </label>
            </div>
          </div>

          {/* Section 2: Delivery Date & Time */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-lg border-b pb-3">
              <Calendar className="w-5 h-5 text-brand-600" />
              <span>2. Chọn Thời Gian Giao Hoa</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Ngày giao hoa</label>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Khung giờ giao hoa</label>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl font-semibold"
                >
                  <option value="08:00 - 10:00">08:00 - 10:00 (Sáng)</option>
                  <option value="10:00 - 12:00">10:00 - 12:00 (Trưa)</option>
                  <option value="14:00 - 16:00">14:00 - 16:00 (Chiều)</option>
                  <option value="17:00 - 19:00">17:00 - 19:00 (Tối)</option>
                  <option value="Giao gấp 2H">Giao gấp 2H ngay sau khi xác nhận</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-lg border-b pb-3">
              <CreditCard className="w-5 h-5 text-brand-600" />
              <span>3. Phương Thức Thanh Toán</span>
            </div>

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('vietqr')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all active:scale-98 ${paymentMethod === 'vietqr' ? 'border-brand-600 bg-brand-50/50 shadow-sm' : 'border-stone-200 hover:bg-stone-50'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💳</span>
                  <div>
                    <div className="font-bold text-stone-800 text-xs">Chuyển Khoản Ngân Hàng Tự Động (VietQR - {vietQRConfig.bankCode})</div>
                    <div className="text-[11px] text-stone-500">Quét mã QR chuyển khoản tới STK {vietQRConfig.accountNo} ({vietQRConfig.accountName})</div>
                  </div>
                </div>
                {paymentMethod === 'vietqr' && <CheckCircle className="w-5 h-5 text-brand-600" />}
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all active:scale-98 ${paymentMethod === 'cod' ? 'border-brand-600 bg-brand-50/50 shadow-sm' : 'border-stone-200 hover:bg-stone-50'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💵</span>
                  <div>
                    <div className="font-bold text-stone-800 text-xs">Thanh Toán Khi Nhận Hoa (COD)</div>
                    <div className="text-[11px] text-stone-500">Thanh toán tiền mặt cho shipper sau khi nhận hoa tươi</div>
                  </div>
                </div>
                {paymentMethod === 'cod' && <CheckCircle className="w-5 h-5 text-brand-600" />}
              </label>
            </div>
          </div>

        </div>

        {/* Right Order Items Summary */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-stone-900 text-white p-6 rounded-3xl shadow-xl space-y-6 border border-stone-800">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">Tóm Tắt Đơn Hàng ({cart.length})</h3>
              <Link href="/cart" className="text-xs text-brand-300 hover:underline">Sửa giỏ hàng</Link>
            </div>

            {/* Items list */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {cart.map((item) => {
                const itemPrice = (item.product.price * item.selectedSize.priceMultiplier + item.selectedAddOns.reduce((s, a) => s + a.price, 0)) * item.quantity;
                return (
                  <div key={item.id} className="flex gap-3 text-xs">
                    <img src={item.product.images[0]} alt="" className="w-14 h-16 object-cover rounded-xl border border-stone-700 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white line-clamp-1">{item.product.name}</div>
                      <div className="text-stone-400">Size: {item.selectedSize.name} x {item.quantity}</div>
                      {item.selectedAddOns.length > 0 && (
                        <div className="text-[10px] text-amber-300 truncate">
                          + {item.selectedAddOns.map(a => a.name).join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="font-serif font-bold text-brand-300">
                      {itemPrice.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Voucher breakdown */}
            <div className="pt-4 border-t border-stone-800 space-y-2 text-xs text-stone-300">
              <div className="flex justify-between">
                <span>Tạm tính hoa:</span>
                <span className="font-semibold text-white">{cartSubtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-400 font-semibold">
                  <span>Giảm giá voucher:</span>
                  <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="flex justify-between text-stone-400">
                <span>Phí vận chuyển Bắc Ninh:</span>
                <span className="text-brand-400 font-bold">Miễn Phí Promo</span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-stone-800">
                <span>Tổng Tiền Thanh Toán:</span>
                <span className="font-serif text-2xl text-amber-300">{finalTotal.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold py-4 rounded-2xl shadow-pink-soft text-base transition-all active:scale-95"
            >
              <span>Xác Nhận & Đặt Hàng</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="text-center text-[11px] text-stone-400">
              🔒 Thông tin được bảo mật 100%. Lin Flower cam kết hoa tươi 100% khi nhận.
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
