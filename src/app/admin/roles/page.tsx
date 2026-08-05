'use client';

import React from 'react';
import { Shield, Lock, CheckCircle2, XCircle, UserCheck, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminRolesPage() {
  const { userRole, setUserRole } = useStore();

  const accounts = [
    { id: 1, name: 'Bùi Gia Tùng (Chủ tiệm)', email: 'admin@linflower.com', role: 'admin', desc: 'Toàn quyền quản trị hệ thống' },
    { id: 2, name: 'Nguyễn Thị Thu (Thu ngân)', email: 'thu.nguyen@linflower.com', role: 'staff', desc: 'Xử lý đơn hàng & xem tồn kho' },
    { id: 3, name: 'Trần Văn Mạnh (Thợ cắm hoa)', email: 'manh.tran@linflower.com', role: 'staff', desc: 'Cập nhật tiến độ cắm hoa' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="border-b pb-4 border-stone-200">
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
          Quản Lý Phân Quyền Hạn (Admin vs Nhân Viên)
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Phân chia quyền truy cập bảo mật giữa Chủ cửa hàng (Admin) và Nhân viên bán hàng / Thợ cắm hoa
        </p>
      </div>

      {/* Role Switcher Test Box */}
      <div className="bg-gradient-to-r from-stone-900 to-brand-900 text-white p-6 rounded-3xl shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h3 className="font-serif font-bold text-lg text-white">Thử Nghiệm Chuyển Đổi Quyền Trực Tiếp</h3>
        </div>

        <p className="text-xs text-stone-300">
          Bạn đang sử dụng quyền: <strong className="text-amber-300 capitalize text-sm">{userRole === 'admin' ? 'Admin (Toàn Quyền)' : 'Nhân Viên (Staff)'}</strong>. Bấm nút dưới đây để đổi quyền test tính năng:
        </p>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setUserRole('admin')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${userRole === 'admin' ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md' : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'}`}
          >
            ✓ Chuyển Sang Quyền Admin (Toàn Quyền)
          </button>

          <button
            onClick={() => setUserRole('staff')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${userRole === 'staff' ? 'bg-blue-500 text-white border-blue-400 shadow-md' : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'}`}
          >
            ✓ Chuyển Sang Quyền Nhân Viên (Staff)
          </button>
        </div>
      </div>

      {/* Staff Accounts List */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-stone-900 border-b pb-3">Danh Sách Tài Khoản Nhân Nhân</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-3">Họ tên nhân viên</th>
                <th className="p-3">Email đăng nhập</th>
                <th className="p-3">Vai trò hệ thống</th>
                <th className="p-3">Mô tả quyền hạn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3 font-bold text-stone-900">{acc.name}</td>
                  <td className="p-3 text-stone-500">{acc.email}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${acc.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'}`}>
                      {acc.role === 'admin' ? '👑 Admin' : '👤 Nhân Viên'}
                    </span>
                  </td>
                  <td className="p-3 text-stone-500">{acc.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Comparison Matrix */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-stone-900 border-b pb-3">Bảng Chi Tiết Phân Quyền Chức Năng</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 uppercase font-bold text-[10px] border-b">
              <tr>
                <th className="p-3">Tính năng hệ thống</th>
                <th className="p-3 text-center">Admin (Chủ tiệm)</th>
                <th className="p-3 text-center">Nhân Viên (Staff)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="p-3 font-semibold">Xem Dashboard & Báo cáo doanh thu</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
                <td className="p-3 text-center text-red-500 font-bold">× Ẩn doanh thu</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Xem & Cập nhật trạng thái đơn hàng</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">In hóa đơn thanh toán cho khách</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Cập nhật ảnh thực tế hoa vừa cắm</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Thêm / Sửa mẫu hoa trong kho</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
                <td className="p-3 text-center text-amber-600 font-bold">⚠️ Chỉ chỉnh sửa</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Xóa sản phẩm khỏi hệ thống</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
                <td className="p-3 text-center text-red-500 font-bold">× Không cho phép</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Tạo mã giảm giá & voucher</td>
                <td className="p-3 text-center text-green-600 font-bold">✓ Đầy đủ</td>
                <td className="p-3 text-center text-red-500 font-bold">× Không cho phép</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
