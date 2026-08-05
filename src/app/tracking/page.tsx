'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, CheckCircle2, Clock, Truck, Award, AlertCircle, PhoneCall, ShieldCheck, MapPin } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/types';

export default function OrderTrackingPage() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';
  const initialPhone = searchParams.get('phone') || '';

  const { findOrderByIdOrPhone, orders } = useStore();

  const [query, setQuery] = useState(initialOrderId || initialPhone);
  const [matchedOrders, setMatchedOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (query.trim()) {
      setMatchedOrders(findOrderByIdOrPhone(query));
    } else {
      setMatchedOrders(orders.slice(0, 2)); // Show recent orders as demo fallback
    }
  }, [query, orders]);

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipping': return 3;
      case 'completed': return 4;
      default: return 0;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header & Search */}
      <div className="bg-gradient-to-r from-stone-900 via-brand-900 to-stone-900 text-white p-8 rounded-3xl shadow-xl text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-2">
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-white">Tra Cứu Tiến Độ Đơn Hàng Live</h1>
          <p className="text-xs sm:text-sm text-stone-300">
            Nhập Mã đơn hàng (ví dụ: <strong className="text-amber-300">LF-884920</strong>) hoặc Số điện thoại đặt hoa để kiểm tra trực tiếp
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập mã đơn LF-XXXXXX hoặc SĐT..."
            className="w-full pl-11 pr-32 py-3.5 text-sm bg-white text-stone-900 rounded-full font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-4" />
          <button
            onClick={() => setMatchedOrders(findOrderByIdOrPhone(query))}
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 rounded-full transition-colors"
          >
            Tra Cứu
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-8">
        {matchedOrders.length > 0 ? (
          matchedOrders.map((order) => {
            const currentStep = getStatusStepIndex(order.orderStatus);

            return (
              <div key={order.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-8">
                
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-extrabold text-2xl text-stone-900">Mã đơn: {order.id}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${order.orderStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-900'}`}>
                        Trạng thái: {order.orderStatus === 'pending' ? 'Chờ xử lý' : order.orderStatus === 'processing' ? 'Đang cắm hoa' : order.orderStatus === 'shipping' ? 'Đang giao hàng' : 'Hoàn thành'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      Thời gian đặt: {order.createdAt} | Phương thức: {order.paymentMethod.toUpperCase()} ({order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'})
                    </p>
                  </div>

                  <a
                    href="tel:0363819228"
                    className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-xs font-bold border border-brand-200"
                  >
                    <PhoneCall className="w-4 h-4 text-brand-600" />
                    <span>Hỗ trợ gấp: 0363 819 228</span>
                  </a>
                </div>

                {/* Live Progress Timeline */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-stone-800 text-base">Tiến Độ Xử Lý & Giao Hoa:</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                    {[
                      { step: 1, title: '1. Tiếp Nhận Đơn', desc: 'Hệ thống nhận đơn' },
                      { step: 2, title: '2. Đang Cắm Hoa', desc: 'Thợ hoa Lin Flower chuẩn bị' },
                      { step: 3, title: '3. Đang Giao Hàng', desc: 'Shipper vận chuyển' },
                      { step: 4, title: '4. Giao Thành Công', desc: 'Đã trao tận tay người nhận' },
                    ].map((st) => (
                      <div
                        key={st.step}
                        className={`p-4 rounded-2xl border text-center transition-all ${st.step <= currentStep ? 'bg-brand-50/70 border-brand-500 shadow-sm' : 'bg-stone-50 border-stone-200 opacity-50'}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold mb-2 ${st.step <= currentStep ? 'bg-brand-600 text-white' : 'bg-stone-200 text-stone-600'}`}>
                          {st.step <= currentStep ? '✓' : st.step}
                        </div>
                        <div className="font-bold text-xs text-stone-800">{st.title}</div>
                        <div className="text-[10px] text-stone-500 mt-0.5">{st.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-time Photo Proof Section */}
                {order.photoProofUrl && (
                  <div className="bg-stone-50 p-4 sm:p-6 rounded-2xl border border-stone-200 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <span>Hình Ảnh Sản Phẩm Thực Tế Trước Khi Giao:</span>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-stone-200 max-w-sm">
                      <img src={order.photoProofUrl} alt="Hình hoa thực tế" className="w-full h-56 object-cover" />
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Chụp thực tế tại xưởng Lin Flower Phố Mới lúc giao cho Shipper.
                    </p>
                  </div>
                )}

                {/* Detailed Logs & Recipient Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100 text-xs">
                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-800 uppercase tracking-wider">Thông tin người nhận</h5>
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1 text-stone-600">
                      <div>Người nhận: <strong className="text-stone-800">{order.recipientName}</strong></div>
                      <div>Số điện thoại: <strong className="text-stone-800">{order.recipientPhone}</strong></div>
                      <div>Địa chỉ: <strong className="text-stone-800">{order.recipientAddress}</strong></div>
                      <div>Khung giờ hẹn: <strong className="text-brand-600 font-bold">{order.deliveryDate} ({order.deliveryTimeSlot})</strong></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-800 uppercase tracking-wider">Nhật ký xử lý đơn</h5>
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2 text-stone-600 max-h-40 overflow-y-auto">
                      {order.statusHistory.map((log, idx) => (
                        <div key={idx} className="border-b border-stone-200/60 pb-1.5 last:border-0 last:pb-0">
                          <div className="flex justify-between font-bold text-stone-800">
                            <span className="capitalize">{log.status}</span>
                            <span className="text-stone-400 font-normal">{log.timestamp}</span>
                          </div>
                          <div className="text-[11px] text-stone-500">{log.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-stone-800">Không tìm thấy đơn hàng nào</h3>
            <p className="text-xs text-stone-500">
              Vui lòng kiểm tra lại mã đơn hàng (ví dụ: LF-884920) hoặc số điện thoại bạn đã dùng khi đặt hàng.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
