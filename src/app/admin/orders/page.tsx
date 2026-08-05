'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, Printer, Eye, CheckCircle2, Clock, 
  Truck, AlertCircle, FileText, Camera, Shield, X 
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrderModal, setSelectedOrderModal] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus !== 'all' && o.orderStatus !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.customerPhone.includes(q);
    }
    return true;
  });

  const handlePrintInvoice = (order: Order) => {
    const printWin = window.open('', '_blank');
    if (!printWin) return;

    printWin.document.write(`
      <html>
        <head>
          <title>Hóa Đơn - ${order.id} - Lin Flower</title>
          <style>
            body { font-family: 'Arial', sans-serif; padding: 20px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #e63963; padding-bottom: 10px; }
            .title { font-size: 24px; font-weight: bold; color: #e63963; }
            .subtitle { font-size: 12px; color: #666; }
            .details { margin: 20px 0; font-size: 13px; line-height: 1.6; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f8f8f8; }
            .total { font-size: 16px; font-weight: bold; color: #b0103b; text-align: right; margin-top: 15px; }
            .footer { text-align: center; font-size: 11px; color: #888; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">LIN FLOWER</div>
            <div class="subtitle">Trao Trọn Yêu Thương – Gửi Trọn Tâm Ý ♡</div>
            <div class="subtitle">ĐC: Khu phố 5, Thị trấn Phố Mới, Quế Võ, Bắc Ninh | Hotline: 0363 819 228</div>
          </div>
          
          <div class="details">
            <strong>MÃ HÓA ĐƠN: ${order.id}</strong><br/>
            Ngày tạo: ${order.createdAt}<br/>
            Khách hàng đặt: ${order.customerName} (${order.customerPhone})<br/>
            Người nhận hoa: ${order.recipientName} (${order.recipientPhone})<br/>
            Địa chỉ giao: ${order.recipientAddress}<br/>
            Khung giờ giao: ${order.deliveryDate} (${order.deliveryTimeSlot})
          </div>

          <table>
            <thead>
              <tr>
                <th>Tên sản phẩm hoa</th>
                <th>Kích thước</th>
                <th>SL</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(it => `
                <tr>
                  <td>${it.product.name}</td>
                  <td>${it.selectedSize.name}</td>
                  <td>${it.quantity}</td>
                  <td>${(it.product.price * it.selectedSize.priceMultiplier).toLocaleString('vi-VN')}đ</td>
                  <td>${((it.product.price * it.selectedSize.priceMultiplier) * it.quantity).toLocaleString('vi-VN')}đ</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total">TỔNG TIỀN THANH TOÁN: ${order.totalPrice.toLocaleString('vi-VN')}đ</div>
          
          <div class="footer">
            Cảm ơn quý khách đã tin tưởng dịch vụ hoa tươi Lin Flower Phố Mới!
          </div>
        </body>
      </html>
    `);
    printWin.document.close();
    printWin.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-stone-200">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
            Quản Lý Đơn Hàng & Vận Chuyển
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Xử lý quy trình cắm hoa, điều phối shipper và cập nhật ảnh thực tế cho khách
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Tất cả đơn' },
              { id: 'pending', label: '⏳ Chờ xử lý' },
              { id: 'processing', label: '🌸 Đang cắm hoa' },
              { id: 'shipping', label: '🚚 Đang giao' },
              { id: 'completed', label: '✅ Hoàn thành' },
              { id: 'cancelled', label: '❌ Đã hủy' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${selectedStatus === tab.id ? 'bg-brand-600 text-white shadow-pink-soft' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mã đơn, tên, SĐT..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          </div>
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-4">Mã đơn & Ngày đặt</th>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Người nhận & Địa chỉ giao</th>
                <th className="p-4">Khung giờ hẹn</th>
                <th className="p-4">Thanh toán</th>
                <th className="p-4">Trạng thái xử lý</th>
                <th className="p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-stone-900 text-sm">{order.id}</div>
                    <div className="text-[11px] text-stone-400">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-stone-800">{order.customerName}</div>
                    <div className="text-stone-500">{order.customerPhone}</div>
                  </td>

                  <td className="p-4 max-w-xs">
                    <div className="font-semibold text-stone-800">{order.recipientName} ({order.recipientPhone})</div>
                    <div className="text-stone-500 truncate">{order.recipientAddress}</div>
                  </td>

                  <td className="p-4 font-semibold text-brand-700">
                    {order.deliveryDate} <br />
                    <span className="text-[11px] text-stone-500">({order.deliveryTimeSlot})</span>
                  </td>

                  <td className="p-4">
                    <div className="font-serif font-bold text-stone-900">{order.totalPrice.toLocaleString('vi-VN')}đ</div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-stone-50 border border-stone-300 rounded-xl text-xs p-1.5 font-bold focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="processing">Đang cắm hoa</option>
                      <option value="shipping">Đang giao hàng</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </td>

                  <td className="p-4 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrderModal(order)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handlePrintInvoice(order)}
                      className="p-2 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl"
                      title="In hóa đơn"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Proof Upload Modal */}
      {selectedOrderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-stone-200">
            
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">Chi Tiết Đơn Hàng {selectedOrderModal.id}</h3>
                <p className="text-xs text-stone-400">Thời gian tạo: {selectedOrderModal.createdAt}</p>
              </div>
              <button onClick={() => setSelectedOrderModal(null)} className="text-stone-400 hover:text-stone-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-50 p-3.5 rounded-2xl space-y-1">
                <div className="font-bold text-stone-800 uppercase tracking-wider">Thông tin người đặt:</div>
                <div>Họ tên: {selectedOrderModal.customerName}</div>
                <div>SĐT: {selectedOrderModal.customerPhone}</div>
                {selectedOrderModal.customerEmail && <div>Email: {selectedOrderModal.customerEmail}</div>}
              </div>

              <div className="bg-stone-50 p-3.5 rounded-2xl space-y-1">
                <div className="font-bold text-stone-800 uppercase tracking-wider">Thông tin người nhận hoa:</div>
                <div>Họ tên: {selectedOrderModal.recipientName}</div>
                <div>SĐT: {selectedOrderModal.recipientPhone}</div>
                <div>Địa chỉ: {selectedOrderModal.recipientAddress}</div>
              </div>
            </div>

            {selectedOrderModal.cardMessage && (
              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900">
                💌 <strong>Nội dung thiệp:</strong> "{selectedOrderModal.cardMessage}"
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-bold text-stone-800 text-xs">Danh Sách Hoa Đã Đặt:</h4>
              <div className="space-y-2">
                {selectedOrderModal.items.map((it) => (
                  <div key={it.id} className="flex justify-between items-center p-2.5 bg-stone-50 rounded-xl text-xs">
                    <div className="flex items-center gap-3">
                      <img src={it.product.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="font-bold text-stone-800">{it.product.name}</div>
                        <div className="text-stone-500">Size: {it.selectedSize.name} x {it.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-brand-700">
                      {(it.product.price * it.selectedSize.priceMultiplier * it.quantity).toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload real flower photo proof simulation */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="font-bold text-stone-800 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-brand-600" />
                <span>Cập Nhật Ảnh Thực Tế Hoa Cắm Cho Khách XN Live:</span>
              </div>
              <input
                type="url"
                defaultValue={selectedOrderModal.photoProofUrl || ''}
                placeholder="Nhập URL ảnh chụp hoa vừa cắm xong..."
                onChange={(e) => {
                  updateOrderStatus(selectedOrderModal.id, selectedOrderModal.orderStatus, 'Cập nhật ảnh thực tế', e.target.value);
                }}
                className="w-full p-2 bg-white border border-stone-300 rounded-xl"
              />
              {selectedOrderModal.photoProofUrl && (
                <img src={selectedOrderModal.photoProofUrl} alt="" className="w-32 h-32 object-cover rounded-xl mt-2 border" />
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => handlePrintInvoice(selectedOrderModal)}
                className="flex items-center gap-1.5 bg-stone-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-black"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>In Hóa Đơn Thanh Toán</span>
              </button>

              <button
                onClick={() => setSelectedOrderModal(null)}
                className="bg-stone-200 text-stone-800 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-stone-300"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
