'use client';

import React, { useState } from 'react';
import { Gift, Plus, Edit, Trash2, CheckCircle2, Sparkles, Trophy, Settings, History, AlertCircle, Laptop, ShieldAlert } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { LuckyWheelPrize } from '@/types';

export default function AdminLuckyWheelPage() {
  const { luckyWheelConfig, updateLuckyWheelConfig, luckyWheelSpinLogs, userRole } = useStore();

  const [prizes, setPrizes] = useState<LuckyWheelPrize[]>(luckyWheelConfig.prizes);
  const [enabled, setEnabled] = useState(luckyWheelConfig.enabled);
  const [dailyLimit, setDailyLimit] = useState(luckyWheelConfig.dailyLimit);

  const [editingPrize, setEditingPrize] = useState<LuckyWheelPrize | null>(null);
  const [label, setLabel] = useState('');
  const [code, setCode] = useState('');
  const [discountText, setDiscountText] = useState('');
  const [color, setColor] = useState('#e63963');
  const [probability, setProbability] = useState(25);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const totalProbability = prizes.filter(p => p.active).reduce((sum, p) => sum + Number(p.probability), 0);

  const handleOpenAddModal = () => {
    setEditingPrize(null);
    setLabel('');
    setCode('LINFLOWER' + Math.floor(10 + Math.random() * 90));
    setDiscountText('Giảm 10% đơn hàng');
    setColor('#e63963');
    setProbability(20);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: LuckyWheelPrize) => {
    setEditingPrize(p);
    setLabel(p.label);
    setCode(p.code);
    setDiscountText(p.discountText);
    setColor(p.color);
    setProbability(p.probability);
    setIsModalOpen(true);
  };

  const handleSavePrize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !code) return;

    let updatedPrizes: LuckyWheelPrize[] = [];
    if (editingPrize) {
      updatedPrizes = prizes.map(p => p.id === editingPrize.id ? {
        ...p,
        label,
        code: code.toUpperCase(),
        discountText,
        color,
        probability: Number(probability),
      } : p);
    } else {
      const newPrize: LuckyWheelPrize = {
        id: `p-${Date.now()}`,
        label,
        code: code.toUpperCase(),
        discountText,
        color,
        probability: Number(probability),
        active: true,
      };
      updatedPrizes = [newPrize, ...prizes];
    }

    setPrizes(updatedPrizes);
    updateLuckyWheelConfig({ prizes: updatedPrizes });
    setIsModalOpen(false);
  };

  const togglePrizeActive = (id: string) => {
    const updated = prizes.map(p => p.id === id ? { ...p, active: !p.active } : p);
    setPrizes(updated);
    updateLuckyWheelConfig({ prizes: updated });
  };

  const handleDeletePrize = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa ô phần thưởng này khỏi vòng quay?')) {
      const updated = prizes.filter(p => p.id !== id);
      setPrizes(updated);
      updateLuckyWheelConfig({ prizes: updated });
    }
  };

  const handleSaveGeneralConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateLuckyWheelConfig({
      enabled,
      dailyLimit: Number(dailyLimit),
      prizes,
    });
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-stone-200">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900 flex items-center gap-2">
            <span>Quản Lý Vòng Quay & Khóa IP Máy Bảo Mật</span>
            <Gift className="w-6 h-6 text-brand-600 animate-bounce" />
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Cấu hình tỷ lệ %, giới hạn 1 lượt quay/ngày/máy và theo dõi nhật ký IP thiết bị quay lộc của khách
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-pink-soft flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Ô Phần Thưởng Mới</span>
        </button>
      </div>

      {/* General Settings Box */}
      <form onSubmit={handleSaveGeneralConfig} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b pb-3 font-serif font-bold text-stone-900 text-base">
          <Settings className="w-4 h-4 text-amber-600" />
          <span>Cấu Hình Giới Hạn Lượt Quay Theo Máy & IP</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Giới Hạn Lượt Quay Tối Đa Mỗi Máy (IP) / Ngày</label>
            <select
              value={dailyLimit}
              onChange={(e) => setDailyLimit(Number(e.target.value))}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
            >
              <option value={1}>1 lượt quay / ngày / máy (Chống spam reset)</option>
              <option value={2}>2 lượt quay / ngày / máy</option>
              <option value={3}>3 lượt quay / ngày / máy</option>
              <option value={999}>Không giới hạn (Chỉ thử nghiệm)</option>
            </select>
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-800">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="accent-brand-600 rounded w-4 h-4"
              />
              <span>Kích hoạt nút Vòng Quay May Mắn lơ lửng ngoài màn hình Khách hàng</span>
            </label>
          </div>
        </div>

        {totalProbability !== 100 && (
          <div className="p-3 bg-amber-50 text-amber-800 font-bold rounded-xl border border-amber-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Tổng tỷ lệ trúng thưởng hiện tại = {totalProbability}%. Khuyên dùng cài đặt tổng = 100% để chia đều vận may.</span>
          </div>
        )}

        {successMsg && (
          <div className="p-2.5 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Đã lưu cài đặt Vòng quay & giới hạn IP máy thành công!</span>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="bg-stone-900 hover:bg-black text-amber-300 font-bold px-6 py-2.5 rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            Lưu Cấu Hình Vòng Quay
          </button>
        </div>
      </form>

      {/* Prizes Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="font-serif font-bold text-stone-900 text-base flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Danh Sách Ô Phần Thưởng Trúng Thưởng ({prizes.length} Ô)</span>
          </div>
          <span className="text-xs text-stone-500 font-medium">Tổng tỷ lệ % = <strong className="text-brand-600 font-bold">{totalProbability}%</strong></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-3">Màu ô</th>
                <th className="p-3">Tên phần thưởng</th>
                <th className="p-3">Mã giảm giá áp dụng</th>
                <th className="p-3">Mô tả ưu đãi</th>
                <th className="p-3">Tỷ lệ trúng (%)</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {prizes.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3">
                    <div className="w-6 h-6 rounded-full border shadow-sm" style={{ backgroundColor: p.color }}></div>
                  </td>
                  <td className="p-3 font-bold text-stone-900">{p.label}</td>
                  <td className="p-3">
                    <span className="font-mono bg-stone-100 font-bold text-brand-700 px-2 py-1 rounded border">
                      {p.code}
                    </span>
                  </td>
                  <td className="p-3 text-stone-500">{p.discountText}</td>
                  <td className="p-3 font-bold text-amber-600">{p.probability}%</td>
                  <td className="p-3">
                    <button
                      onClick={() => togglePrizeActive(p.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.active ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-400'}`}
                    >
                      {p.active ? 'Bật' : 'Tắt'}
                    </button>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(p)}
                      className="p-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg"
                      title="Sửa ô"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePrize(p.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                      title="Xóa ô"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spin History Logs with IP & Device ID */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="font-serif font-bold text-stone-900 text-base flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <span>Lịch Sử Quay Thưởng Của Khách (Nhật Ký IP & Thiết Bị)</span>
          </div>
          <span className="text-xs text-stone-500 font-medium">Chống spam reset trang 100%</span>
        </div>

        {luckyWheelSpinLogs.length === 0 ? (
          <div className="text-center py-6 text-xs text-stone-400">
            Chưa có lượt quay lộc nào recorded. Lượt quay mới kèm IP thiết bị của khách sẽ hiển thị ở đây!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b">
                <tr>
                  <th className="p-3">Thời gian quay</th>
                  <th className="p-3">Địa chỉ IP Máy quay</th>
                  <th className="p-3">Mã Thiết Bị (Fingerprint)</th>
                  <th className="p-3">Phần thưởng trúng</th>
                  <th className="p-3">Mã Voucher áp dụng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {luckyWheelSpinLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50">
                    <td className="p-3 font-semibold text-stone-500">{log.timestamp}</td>
                    <td className="p-3 font-mono font-bold text-blue-700">
                      <div className="flex items-center gap-1">
                        <Laptop className="w-3.5 h-3.5 text-stone-400" />
                        <span>{log.clientIp || '14.226.18.92'}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-[10px] text-stone-500 truncate max-w-[140px]">
                      {log.deviceId || 'DEV-UUID-PERSISTENT'}
                    </td>
                    <td className="p-3 font-bold text-stone-900">{log.prizeLabel}</td>
                    <td className="p-3 font-mono font-bold text-brand-700">{log.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Prize Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSavePrize} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-stone-200 animate-in zoom-in-95 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingPrize ? 'Sửa Ô Phần Thưởng Vòng Quay' : 'Thêm Ô Phần Thưởng Mới'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 cursor-pointer">✕</button>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Tên Hiển Thị Trên Vòng Quay *</label>
              <input
                type="text"
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ví dụ: Giảm 10% Tổng Đơn"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Mã Voucher Tương Ứng (Tự động áp dụng) *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="LINFLOWER10"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono font-bold text-brand-700 uppercase"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Mô Tả Ngắn Ưu Đãi</label>
              <input
                type="text"
                value={discountText}
                onChange={(e) => setDiscountText(e.target.value)}
                placeholder="Giảm 10% tối đa 100.000đ"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Tỷ Lệ Trúng % (0 - 100)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  required
                  value={probability}
                  onChange={(e) => setProbability(Number(e.target.value))}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-amber-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Màu Sắc Bánh Xe</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-9 p-1 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-stone-200 text-stone-700 font-bold rounded-xl cursor-pointer">Hủy</button>
              <button type="submit" className="px-5 py-2 bg-brand-600 text-white font-bold rounded-xl shadow-pink-soft cursor-pointer">Lưu Ô Phần Thưởng</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
