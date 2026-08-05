'use client';

import React, { useState } from 'react';
import { Sparkles, Heart, Search, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/products/ProductCard';

export const FlowerFinderWizard: React.FC = () => {
  const { products } = useStore();

  const [step, setStep] = useState<number>(1);
  const [occasion, setOccasion] = useState<string>('Sinh nhật');
  const [maxBudget, setMaxBudget] = useState<number>(1000000);
  const [recipient, setRecipient] = useState<string>('Người yêu / Vợ');
  const [showResults, setShowResults] = useState<boolean>(false);

  const matchedProducts = products.filter((p) => {
    const matchOccasion = p.occasions.includes(occasion) || occasion === 'Tất cả';
    const matchPrice = p.price <= maxBudget;
    return matchOccasion && matchPrice;
  });

  const handleFinish = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setStep(1);
    setShowResults(false);
  };

  return (
    <div className="bg-gradient-to-r from-brand-900 via-brand-700 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 border border-amber-400/30">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-500/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Trợ Lý Chọn Hoa Thông Minh
          </div>
          <h3 className="font-serif font-extrabold text-2xl text-white">Tìm Hoa Đúng Ngân Sách Trong 30 Giây</h3>
        </div>

        {showResults && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-amber-300 hover:underline font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Chọn lại từ đầu</span>
          </button>
        )}
      </div>

      {!showResults ? (
        <div className="space-y-6">
          
          {/* Step 1: Occasion */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Bước 1/3: Chọn Dịp Tặng Hoa
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'Sinh nhật', label: '🎂 Sinh Nhật' },
                  { id: 'Khai trương', label: '🎉 Khai Trương' },
                  { id: 'Cưới hỏi', label: '💒 Cưới Hỏi' },
                  { id: 'Tình yêu', label: '💖 Tình Yêu' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setOccasion(item.id)}
                    className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${occasion === item.id ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md scale-105' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="pt-2 text-right">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-pink-soft"
                >
                  <span>Tiếp theo (Bước 2)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Bước 2/3: Chọn Ngân Sách Dự Kiến
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { max: 600000, label: 'Dưới 600.000đ (Bó tiết kiệm)' },
                  { max: 1200000, label: '600.000đ - 1.200.000đ (Phổ biến)' },
                  { max: 5000000, label: 'Trên 1.200.000đ (Dòng VIP)' },
                ].map((item) => (
                  <button
                    key={item.max}
                    onClick={() => setMaxBudget(item.max)}
                    className={`p-4 rounded-2xl border text-xs font-bold transition-all text-left ${maxBudget === item.max ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md scale-105' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="pt-2 flex justify-between">
                <button onClick={() => setStep(1)} className="text-xs text-stone-300 hover:underline">Quay lại</button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-pink-soft"
                >
                  <span>Tiếp theo (Bước 3)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Recipient */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Bước 3/3: Đối Tượng Nhận Hoa
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  'Người yêu / Vợ',
                  'Mẹ / Phụ nữ',
                  'Sếp / Đối tác',
                  'Bạn bè / Đồng nghiệp'
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setRecipient(item)}
                    className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${recipient === item ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md scale-105' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="pt-2 flex justify-between">
                <button onClick={() => setStep(2)} className="text-xs text-stone-300 hover:underline">Quay lại</button>
                <button
                  onClick={handleFinish}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-xs font-bold px-8 py-3 rounded-full shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Xem Kết Quả Đề Xuất</span>
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-xs flex justify-between items-center">
            <div>
              Đề xuất cho: <strong className="text-amber-300">{occasion}</strong> • Ngân sách: <strong className="text-amber-300">Tối đa {maxBudget.toLocaleString('vi-VN')}đ</strong> • Người nhận: <strong className="text-amber-300">{recipient}</strong>
            </div>
            <span className="bg-amber-400 text-stone-950 font-bold px-2.5 py-1 rounded-full text-[10px]">
              {matchedProducts.length} mẫu phù hợp
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
