'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Sparkles, Trophy, CheckCircle, Tag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import confetti from 'canvas-confetti';

export const LuckyWheelModal: React.FC = () => {
  const { applyVoucher } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<{ code: string; label: string } | null>(null);

  const prizes = [
    { code: 'LINFLOWER10', label: 'Giảm 10% Tổng Đơn', color: '#e63963' },
    { code: 'XINCHAO', label: 'Giảm Trực Tiếp 50.000đ', color: '#d97706' },
    { code: 'FREESHIPBN', label: 'Miễn Phí Giao Hàng 0đ', color: '#10b981' },
    { code: 'THIEP3D', label: 'Tặng Thiệp 3D Cao Cấp', color: '#8b5cf6' },
  ];

  const handleSpin = () => {
    if (isSpinning || wonPrize) return;

    setIsSpinning(true);
    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomPrizeIndex];

    const extraRounds = 5 * 360;
    const segmentAngle = 360 / prizes.length;
    const targetAngle = extraRounds + randomPrizeIndex * segmentAngle + segmentAngle / 2;

    setRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      applyVoucher(selectedPrize.code);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 4000);
  };

  return (
    <>
      {/* Floating Gift Box Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 p-3 rounded-full shadow-2xl border-2 border-white/60 flex items-center gap-2 glow-effect"
        title="Quay số trúng mã giảm giá mỗi ngày"
      >
        <Gift className="w-6 h-6 text-stone-950 animate-bounce" />
        <span className="text-xs font-serif font-extrabold pr-1 hidden md:inline">Vòng Quay May Mắn</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-6 shadow-2xl border border-brand-100 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Quà Tặng Mỗi Ngày
                </div>
                <h3 className="font-serif font-extrabold text-2xl text-stone-900">Vòng Quay Hái Lộc</h3>
                <p className="text-xs text-stone-500">Quay bánh xe để nhận voucher ưu đãi từ Lin Flower</p>
              </div>

              {/* Wheel Container */}
              <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
                {/* Pointer */}
                <div className="absolute -top-2 z-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-brand-600 drop-shadow-md"></div>

                {/* Spinning Wheel */}
                <div
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
                  }}
                  className="w-full h-full rounded-full border-4 border-amber-400 shadow-xl overflow-hidden relative bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                    🌸 LIN FLOWER 🌸
                  </div>
                </div>

                {/* Center Spin Button */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || !!wonPrize}
                  className="absolute z-10 w-16 h-16 rounded-full bg-stone-900 hover:bg-black text-amber-300 font-serif font-extrabold text-xs border-2 border-amber-400 shadow-xl flex items-center justify-center active:scale-90 transition-all disabled:opacity-80"
                >
                  {isSpinning ? '...' : wonPrize ? 'Xong' : 'QUAY'}
                </button>
              </div>

              {/* Won Result */}
              {wonPrize && (
                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-1 text-xs text-amber-900 animate-in fade-in">
                  <div className="font-bold flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>Chúc mừng! Bạn quay trúng:</span>
                  </div>
                  <div className="font-serif font-extrabold text-lg text-brand-700">{wonPrize.label}</div>
                  <div className="text-[11px] text-stone-600">
                    Mã <strong className="bg-white px-2 py-0.5 rounded font-mono border">{wonPrize.code}</strong> đã tự động được áp dụng vào giỏ hàng!
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-stone-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-black"
              >
                Đóng & Xem Giỏ Hàng
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
