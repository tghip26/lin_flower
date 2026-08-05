'use client';

import React, { useState } from 'react';
import { Tag, Plus, CheckCircle, XCircle, Trash2, Sparkles, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Voucher } from '@/types';

export default function AdminVouchersPage() {
  const { vouchers, addVoucher, userRole } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [minOrderValue, setMinOrderValue] = useState<number>(300000);
  const [description, setDescription] = useState('');

  const handleAddVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addVoucher({
      code: code.toUpperCase().trim(),
      discountPercent: Number(discountPercent),
      minOrderValue: Number(minOrderValue),
      description,
      expiryDate: '2026-12-31',
      active: true,
    });

    setCode('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-stone-200">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
            Quản Lý Mã Giảm Giá (Vouchers & Coupons)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Tạo các chương trình khuyến mãi giảm giá dành tặng khách hàng mua hoa
          </p>
        </div>

        {userRole === 'admin' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-pink-soft flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Mã Khuyến Mãi Mới</span>
          </button>
        )}
      </div>

      {/* Vouchers List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vouchers.map((v) => (
          <div key={v.code} className="bg-white rounded-3xl p-5 border border-brand-100 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-50 rounded-bl-3xl flex items-center justify-center text-brand-600">
              <Tag className="w-6 h-6" />
            </div>

            <div className="inline-block bg-brand-600 text-white font-mono font-extrabold text-sm px-3 py-1 rounded-xl shadow-sm">
              {v.code}
            </div>

            <p className="text-xs font-bold text-stone-800">{v.description}</p>

            <div className="text-[11px] text-stone-500 space-y-0.5 border-t pt-2 border-stone-100">
              <div>Đơn tối thiểu: <strong className="text-stone-800">{v.minOrderValue.toLocaleString('vi-VN')}đ</strong></div>
              <div>Hạn dùng: <strong className="text-stone-800">{v.expiryDate}</strong></div>
              <div>Trạng thái: <span className="text-green-600 font-bold">✓ Đang hoạt động</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Voucher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddVoucher} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">Tạo Mã Giảm Giá Mới</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Mã Voucher (Ví dụ: TET2026)</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="LINFLOWER20"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono uppercase font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Phần trăm giảm (%)</label>
                <input
                  type="number"
                  required
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Đơn hàng tối thiểu (VNĐ)</label>
                <input
                  type="number"
                  required
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(Number(e.target.value))}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mô tả chương trình</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Giảm 10% mừng sự kiện..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-stone-200 text-stone-700 font-bold rounded-xl"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 text-white font-bold rounded-xl shadow-pink-soft"
              >
                Kích Hoạt Mã
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
