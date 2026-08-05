'use client';

import React from 'react';

interface LinFlowerLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const LinFlowerLogo: React.FC<LinFlowerLogoProps> = ({
  size = 48,
  className = '',
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Scalable SVG Vector Monogram Badge */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform-gpu transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Metallic Rose-Gold Gradient */}
          <linearGradient id="lfGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#be185d" />
            <stop offset="35%" stopColor="#e63963" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="lfRosePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#e63963" />
          </linearGradient>

          <linearGradient id="lfLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Ring with Dual Gold Border */}
        <circle cx="100" cy="100" r="92" fill="#ffffff" stroke="url(#lfGoldGrad)" strokeWidth="5" filter="url(#badgeShadow)" />
        <circle cx="100" cy="100" r="84" fill="#fffdfa" stroke="#fbcfe8" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Outer Leaves Branch Accents on Top & Bottom */}
        <path d="M 100,14 C 90,6 75,18 90,26 Z" fill="url(#lfLeafGrad)" />
        <path d="M 100,14 C 110,6 125,18 110,26 Z" fill="url(#lfLeafGrad)" />
        <path d="M 100,186 C 90,194 75,182 90,174 Z" fill="url(#lfLeafGrad)" />
        <path d="M 100,186 C 110,194 125,182 110,174 Z" fill="url(#lfLeafGrad)" />

        {/* Monogram Intertwined Letter L */}
        <path
          d="M 68,54 
             C 68,50 72,46 76,46 
             L 76,132 
             C 76,144 84,148 106,148 
             L 128,148 
             C 134,148 138,152 138,156 
             C 138,160 134,162 124,162 
             L 72,162 
             C 62,162 58,156 58,146 
             L 58,62 
             C 58,54 62,54 68,54 Z"
          fill="url(#lfGoldGrad)"
        />

        {/* Monogram Intertwined Letter F */}
        <path
          d="M 104,54 
             C 104,48 110,46 122,46 
             L 146,46 
             C 152,46 156,50 156,54 
             C 156,58 152,60 144,60 
             L 120,60 
             L 120,94 
             L 138,94 
             C 144,94 148,98 148,102 
             C 148,106 144,108 138,108 
             L 120,108 
             L 120,146 
             C 120,154 114,158 108,158 
             C 104,158 104,152 104,146 Z"
          fill="#be185d"
        />

        {/* Integrated Blooming Rose Flower Icon at Center (X=100, Y=100) */}
        <g transform="translate(100, 100)">
          {/* Soft Pink Glow Backdrop */}
          <circle r="22" fill="#f43f5e" opacity="0.25" />

          {/* 6 Rose Petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const px = 11 * Math.cos(rad);
            const py = 11 * Math.sin(rad);
            return (
              <circle key={i} cx={px} cy={py} r="7.5" fill="url(#lfRosePetalGrad)" />
            );
          })}

          {/* Inner Petal Ring */}
          {[30, 90, 150, 210, 270, 330].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const px = 6 * Math.cos(rad);
            const py = 6 * Math.sin(rad);
            return (
              <circle key={i} cx={px} cy={py} r="5.5" fill="#fda4af" />
            );
          })}

          {/* Yellow Golden Core */}
          <circle r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Optional Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900 tracking-wider">
            LIN <span className="text-brand-600 font-serif">FLOWER</span>
          </span>
          <span className="text-[10px] sm:text-xs text-brand-700 font-serif italic tracking-wide -mt-0.5">
            TRAO TRỌN YÊU THƯƠNG – GỬI TRỌN TÂM Ý ♡
          </span>
        </div>
      )}
    </div>
  );
};
