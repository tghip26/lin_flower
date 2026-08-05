'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Sparkles, Trophy, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import confetti from 'canvas-confetti';

export const LuckyWheelModal: React.FC = () => {
  const { luckyWheelConfig, applyVoucher, addLuckyWheelSpinLog } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<{ code: string; label: string; discountText: string } | null>(null);
  const [spinsLeftToday, setSpinsLeftToday] = useState(luckyWheelConfig.dailyLimit);

  const activePrizes = luckyWheelConfig.prizes.filter((p) => p.active);

  useEffect(() => {
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const savedSpinCount = localStorage.getItem(`lin_flower_spins_${todayStr}`);
      const count = savedSpinCount ? parseInt(savedSpinCount, 10) : 0;
      setSpinsLeftToday(Math.max(0, luckyWheelConfig.dailyLimit - count));
    } catch (e) {
      setSpinsLeftToday(luckyWheelConfig.dailyLimit);
    }
  }, [luckyWheelConfig.dailyLimit, isOpen]);

  if (!luckyWheelConfig.enabled || activePrizes.length === 0) return null;

  // Weighted Probability Picker
  const pickPrizeByProbability = () => {
    const totalWeight = activePrizes.reduce((sum, p) => sum + p.probability, 0);
    let randomNum = Math.random() * (totalWeight || 100);

    for (let i = 0; i < activePrizes.length; i++) {
      if (randomNum < activePrizes[i].probability) {
        return { prize: activePrizes[i], index: i };
      }
      randomNum -= activePrizes[i].probability;
    }
    return { prize: activePrizes[0], index: 0 };
  };

  const handleSpin = () => {
    if (isSpinning || wonPrize || spinsLeftToday <= 0) return;

    setIsSpinning(true);
    const { prize, index } = pickPrizeByProbability();

    const extraRounds = 6 * 360;
    const segmentAngle = 360 / activePrizes.length;
    // Calculate rotation angle to align winner with pointer
    const targetAngle = rotation + extraRounds + (activePrizes.length - index) * segmentAngle - segmentAngle / 2;

    setRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prize);

      // Decrement spin count for today
      const todayStr = new Date().toISOString().split('T')[0];
      const newCount = (luckyWheelConfig.dailyLimit - spinsLeftToday) + 1;
      localStorage.setItem(`lin_flower_spins_${todayStr}`, newCount.toString());
      setSpinsLeftToday(Math.max(0, luckyWheelConfig.dailyLimit - newCount));

      // Auto apply voucher & record log
      applyVoucher(prize.code);
      addLuckyWheelSpinLog({
        prizeLabel: prize.label,
        code: prize.code,
      });

      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 }
      });
    }, 4200);
  };

  return (
    <>
      {/* Floating Gift Box Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-stone-950 p-3.5 rounded-full shadow-2xl border-2 border-white flex items-center gap-2 glow-effect cursor-pointer"
        title="Quay số trúng mã giảm giá mỗi ngày"
      >
        <div className="relative">
          <Gift className="w-6 h-6 text-stone-950 animate-bounce" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center border border-white">
            {spinsLeftToday}
          </span>
        </div>
        <span className="text-xs font-serif font-extrabold pr-1 hidden md:inline text-stone-950">Vòng Quay Hái Lộc</span>
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
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Vòng Quay Lộc Xuân Lin Flower
                </div>
                <h3 className="font-serif font-extrabold text-2xl text-stone-900">Vòng Quay May Mắn</h3>
                <p className="text-xs text-stone-500">
                  Lượt quay hôm nay: <strong className="text-brand-600 font-bold">{spinsLeftToday} / {luckyWheelConfig.dailyLimit} lượt</strong>
                </p>
              </div>

              {/* Dynamic SVG Wheel */}
              <div className="relative w-60 h-60 mx-auto flex items-center justify-center">
                {/* Pointer Arrow */}
                <div className="absolute -top-3 z-30 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[22px] border-t-brand-600 filter drop-shadow-md"></div>

                {/* SVG Rotatable Wheel */}
                <div
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 4.2s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
                  }}
                  className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden relative"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {activePrizes.map((p, idx) => {
                      const total = activePrizes.length;
                      const sliceAngle = 360 / total;
                      const startAngle = idx * sliceAngle;
                      const endAngle = (idx + 1) * sliceAngle;

                      // Convert angle to coordinates
                      const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                      const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                      const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                      const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);
                      const largeArc = sliceAngle > 180 ? 1 : 0;

                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;
                      const textAngle = startAngle + sliceAngle / 2;

                      return (
                        <g key={p.id}>
                          <path d={pathData} fill={p.color} stroke="#ffffff" strokeWidth="0.8" />
                          <text
                            x="50"
                            y="22"
                            fill="#ffffff"
                            fontSize="5.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            transform={`rotate(${textAngle}, 50, 50)`}
                          >
                            {p.label.length > 12 ? p.label.substring(0, 12) + '..' : p.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Center Spin Trigger Button */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || spinsLeftToday <= 0 || !!wonPrize}
                  className="absolute z-20 w-16 h-16 rounded-full bg-stone-900 hover:bg-black text-amber-300 font-serif font-extrabold text-xs border-2 border-amber-400 shadow-2xl flex flex-col items-center justify-center active:scale-90 transition-all disabled:opacity-80 cursor-pointer"
                >
                  {isSpinning ? '...' : wonPrize ? 'Đã Quay' : spinsLeftToday <= 0 ? 'Hết Lượt' : 'QUAY'}
                </button>
              </div>

              {/* Won Result Notice */}
              {wonPrize ? (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1.5 text-xs text-amber-950 animate-in fade-in">
                  <div className="font-bold flex items-center justify-center gap-1 text-amber-800">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>Chúc mừng! Bạn nhận được:</span>
                  </div>
                  <div className="font-serif font-extrabold text-lg text-brand-700">{wonPrize.label}</div>
                  <div className="text-[11px] text-stone-600">
                    Mã <strong className="bg-white px-2 py-0.5 rounded font-mono font-bold border border-amber-300">{wonPrize.code}</strong> đã tự động được kích hoạt vào đơn hàng của bạn!
                  </div>
                </div>
              ) : spinsLeftToday <= 0 ? (
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-stone-500">
                  Bạn đã dùng hết {luckyWheelConfig.dailyLimit} lượt quay hôm nay. Hãy quay lại vào ngày mai nhé! 🌸
                </div>
              ) : null}

              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-stone-900 hover:bg-black text-white font-bold text-xs py-3 rounded-xl shadow-sm active:scale-95 transition-all"
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
