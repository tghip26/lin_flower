'use client';

import React from 'react';
import Link from 'next/link';
import { 
  DollarSign, ShoppingBag, Package, Clock, TrendingUp, 
  ArrowUpRight, AlertTriangle, Lock, Eye, Sparkles 
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { OrderStatus } from '@/types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

export default function AdminDashboardPage() {
  const { orders, products, userRole, updateOrderStatus } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' || o.orderStatus === 'completed' ? o.totalPrice : 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending' || o.orderStatus === 'processing');
  const totalProducts = products.length;

  // Chart data preparation
  const salesChartData = [
    { day: 'Thứ 2', revenue: 2400000 },
    { day: 'Thứ 3', revenue: 3800000 },
    { day: 'Thứ 4', revenue: 4200000 },
    { day: 'Thứ 5', revenue: 3100000 },
    { day: 'Thứ 6', revenue: 5600000 },
    { day: 'Thứ 7', revenue: 8900000 },
    { day: 'Chủ Nhật', revenue: 9500000 },
  ];

  const pieChartData = [
    { name: 'Hoàn thành', value: orders.filter(o => o.orderStatus === 'completed').length || 1, color: '#10B981' },
    { name: 'Đang giao', value: orders.filter(o => o.orderStatus === 'shipping').length || 1, color: '#3B82F6' },
    { name: 'Đang cắm hoa', value: orders.filter(o => o.orderStatus === 'processing').length || 1, color: '#F59E0B' },
    { name: 'Chờ xử lý', value: orders.filter(o => o.orderStatus === 'pending').length || 1, color: '#EF4444' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-stone-200">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
            Tổng Quan Doanh Thu & Đơn Hàng
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Cập nhật thời gian thực tất cả các giao dịch bán hoa tại cửa hàng Lin Flower
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/orders"
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Quản Lý Tất Cả Đơn Hàng ({totalOrders})
          </Link>
        </div>
      </div>

      {/* Staff Permission Restriction Warning */}
      {userRole === 'staff' && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-2xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Bạn đang truy cập dưới quyền <strong>Nhân Viên (Staff)</strong>. Một số chỉ số tài chính mật bị giới hạn.</span>
          </div>
        </div>
      )}

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Tổng Doanh Thu</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif font-extrabold text-2xl text-stone-900">
            {userRole === 'admin' ? `${totalRevenue.toLocaleString('vi-VN')}đ` : '••••••••đ'}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.5% so với tuần trước</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Tổng Đơn Hàng</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif font-extrabold text-2xl text-stone-900">
            {totalOrders} Đơn
          </div>
          <div className="text-[11px] text-stone-500">
            {orders.filter(o => o.orderStatus === 'completed').length} đơn giao thành công
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Đơn Đang Xử Lý</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif font-extrabold text-2xl text-stone-900">
            {pendingOrders.length} Đơn
          </div>
          <div className="text-[11px] text-amber-600 font-semibold">
            Cần cắm hoa & giao gấp
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Mẫu Hoa Trong Kho</span>
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif font-extrabold text-2xl text-stone-900">
            {totalProducts} Mẫu
          </div>
          <div className="text-[11px] text-brand-600 font-semibold">
            100% Sẵn sàng kinh doanh
          </div>
        </div>

      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Revenue Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-serif font-bold text-lg text-stone-900">Biểu Đồ Doanh Thu Theo Tuần</h3>
            <span className="text-xs text-stone-400">Đơn vị: VNĐ</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChartData}>
                <XAxis dataKey="day" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} tickFormatter={(v) => `${v / 1000000}M`} />
                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString('vi-VN')}đ`, 'Doanh thu']} />
                <Bar dataKey="revenue" fill="#E63963" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h3 className="font-serif font-bold text-lg text-stone-900">Phân Phối Trạng Thái Đơn</h3>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieChartData} innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-stone-100">
            {pieChartData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-stone-700 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-stone-900">{item.value} đơn</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-serif font-bold text-lg text-stone-900">Đơn Hàng Mới Nhất Can Xử Lý</h3>
          <Link href="/admin/orders" className="text-xs font-bold text-brand-600 hover:underline">
            Xem toàn bộ đơn →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-y">
              <tr>
                <th className="p-3">Mã đơn</th>
                <th className="p-3">Khách hàng</th>
                <th className="p-3">Người nhận & Địa chỉ</th>
                <th className="p-3">Tổng tiền</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3 font-bold text-stone-900">{order.id}</td>
                  <td className="p-3">
                    <div className="font-bold text-stone-800">{order.customerName}</div>
                    <div className="text-stone-400">{order.customerPhone}</div>
                  </td>
                  <td className="p-3 max-w-xs">
                    <div className="font-semibold text-stone-800">{order.recipientName}</div>
                    <div className="truncate text-stone-500">{order.recipientAddress}</div>
                  </td>
                  <td className="p-3 font-serif font-bold text-brand-700">
                    {order.totalPrice.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="p-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-stone-100 border border-stone-300 rounded-lg text-[11px] p-1 font-bold focus:outline-none"
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="processing">Đang cắm hoa</option>
                      <option value="shipping">Đang giao hàng</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/admin/orders?orderId=${order.id}`}
                      className="text-stone-700 hover:text-brand-600 font-bold underline"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
