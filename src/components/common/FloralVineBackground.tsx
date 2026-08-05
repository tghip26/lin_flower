'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FloralVineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* Ambient Radial Floral Glows */}
      <div className="absolute top-[0%] left-[-5%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-[30%] right-[-8%] w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-amber-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-[60%] left-[-5%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-rose-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-[85%] right-[-5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-pink-200/30 rounded-full blur-3xl"></div>

      {/* Main Integrated Organic Blooming Tree Branch SVG */}
      <svg
        className="w-full h-full min-h-[3400px] absolute inset-0 opacity-90"
        viewBox="0 0 1440 3400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="treeBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#be185d" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#e63963" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#ec4899" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <filter id="vineGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Glow Layer for Main Tree Branch Stem */}
        <path
          d="M 20,-20 
             C 140,180 80,420 180,820 
             S 1320,1220 1200,1520 
             S 110,1840 240,2240 
             S 1320,2640 1200,3040"
          stroke="#f43f5e"
          strokeWidth="8"
          strokeOpacity="0.2"
          fill="none"
          filter="url(#vineGlow)"
        />

        {/* Primary Animated Organic Main Tree Stem */}
        <motion.path
          d="M 20,-20 
             C 140,180 80,420 180,820 
             S 1320,1220 1200,1520 
             S 110,1840 240,2240 
             S 1320,2640 1200,3040"
          stroke="url(#treeBranchGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Secondary Gold Twinkling Dotted Vine Stem */}
        <path
          d="M 20,-20 
             C 155,190 95,430 195,830 
             S 1335,1230 1215,1530 
             S 125,1850 255,2250 
             S 1335,2650 1215,3050"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeDasharray="8 12"
          strokeOpacity="0.8"
          fill="none"
        />

        {/* Travelling Light Sparkle Particle gliding down the main tree stem */}
        <circle r="5" fill="#ffffff" filter="url(#vineGlow)">
          <animateMotion
            path="M 20,-20 C 140,180 80,420 180,820 S 1320,1220 1200,1520 S 110,1840 240,2240 S 1320,2640 1200,3040"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ========================================== */}
        {/* SIDE BRANCHES WITH BLOOMING FLOWERS & LEAVES */}
        {/* ========================================== */}

        {/* SIDE BRANCH 1: Near LIN FLOWER (Splitting off at X=120, Y=260) */}
        <motion.g
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Curved sub-branch stem splitting off rightward */}
          <path
            d="M 120,260 C 170,250 210,270 240,285"
            stroke="url(#treeBranchGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Green leaves on sub-branch 1 */}
          <path
            d="M 170,250 C 160,230 180,225 185,245 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.85"
          />
          <path
            d="M 210,270 C 220,250 235,260 225,275 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.85"
          />

          {/* Blooming Rose Flower Head on tip of Sub-branch 1 */}
          <motion.g
            transform="translate(240, 285)"
            animate={{ scale: [1, 1.08, 1], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle r="22" fill="#f43f5e" opacity="0.35" filter="url(#vineGlow)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const px = 12 * Math.cos(rad);
              const py = 12 * Math.sin(rad);
              return <circle key={i} cx={px} cy={py} r="7.5" fill="#fda4af" />;
            })}
            <circle r="7" fill="#f472b6" />
            <circle r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
          </motion.g>
        </motion.g>

        {/* SIDE BRANCH 2: Mid-Hero Section (Splitting off at X=110, Y=520) */}
        <motion.g
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          {/* Sub-branch splitting leftward */}
          <path
            d="M 110,520 C 70,530 40,510 20,490"
            stroke="url(#treeBranchGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Leaves & Flower Bud */}
          <path
            d="M 60,525 C 45,510 60,495 70,515 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.85"
          />
          <motion.g transform="translate(20, 490)" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>
            <circle r="12" fill="#ec4899" opacity="0.4" filter="url(#vineGlow)" />
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const px = 7 * Math.cos(rad);
              const py = 7 * Math.sin(rad);
              return <circle key={i} cx={px} cy={py} r="5" fill="#f472b6" />;
            })}
            <circle r="4" fill="#fbbf24" />
          </motion.g>
        </motion.g>

        {/* SIDE BRANCH 3: Flower Finder Wizard Section (Splitting off at X=180, Y=820) */}
        <motion.g
          animate={{ rotate: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          {/* Sub-branch splitting rightward */}
          <path
            d="M 180,820 C 230,810 270,830 300,845"
            stroke="url(#treeBranchGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 230,815 C 220,795 240,790 245,810 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.85"
          />
          {/* Blooming Flower on Sub-branch 3 */}
          <motion.g
            transform="translate(300, 845)"
            animate={{ scale: [1, 1.07, 1], rotate: [0, -8, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle r="20" fill="#e63963" opacity="0.35" filter="url(#vineGlow)" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const px = 11 * Math.cos(rad);
              const py = 11 * Math.sin(rad);
              return <circle key={i} cx={px} cy={py} r="7" fill="#f472b6" />;
            })}
            <circle r="6" fill="#be185d" />
            <circle r="5" fill="#fef08a" />
          </motion.g>
        </motion.g>

        {/* SIDE BRANCH 4: Categories Section (Right Side, Splitting off at X=1200, Y=1520) */}
        <motion.g
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          {/* Sub-branch splitting leftward towards product grid */}
          <path
            d="M 1200,1520 C 1140,1510 1100,1535 1070,1550"
            stroke="url(#treeBranchGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 1140,1515 C 1130,1495 1150,1490 1155,1510 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.85"
          />
          {/* Golden Rose Blossom */}
          <motion.g
            transform="translate(1070, 1550)"
            animate={{ scale: [1, 1.09, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle r="22" fill="#fbbf24" opacity="0.35" filter="url(#vineGlow)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const px = 12 * Math.cos(rad);
              const py = 12 * Math.sin(rad);
              return <circle key={i} cx={px} cy={py} r="7.5" fill="#fef08a" />;
            })}
            <circle r="7" fill="#f59e0b" />
          </motion.g>
        </motion.g>

        {/* SIDE BRANCH 5: Custom Request Section (Splitting off at X=240, Y=2240) */}
        <motion.g
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <path
            d="M 240,2240 C 290,2230 330,2250 360,2265"
            stroke="url(#treeBranchGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 290,2235 C 280,2215 300,2210 305,2230 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.85"
          />
          <motion.g
            transform="translate(360, 2265)"
            animate={{ scale: [1, 1.08, 1], rotate: [0, -6, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle r="18" fill="#be185d" opacity="0.35" filter="url(#vineGlow)" />
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const px = 10 * Math.cos(rad);
              const py = 10 * Math.sin(rad);
              return <circle key={i} cx={px} cy={py} r="6.5" fill="#fb7185" />;
            })}
            <circle r="6" fill="#9d174d" />
          </motion.g>
        </motion.g>

        {/* SIDE BRANCH 6: Customer Reviews Section (Right Side, Splitting off at X=1200, Y=3040) */}
        <motion.g
          animate={{ rotate: [2.5, -2.5, 2.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          <path
            d="M 1200,3040 C 1140,3030 1100,3055 1070,3070"
            stroke="url(#treeBranchGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 1140,3035 C 1130,3015 1150,3010 1155,3030 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.85"
          />
          <motion.g
            transform="translate(1070, 3070)"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle r="24" fill="#e63963" opacity="0.35" filter="url(#vineGlow)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const px = 13 * Math.cos(rad);
              const py = 13 * Math.sin(rad);
              return <circle key={i} cx={px} cy={py} r="8" fill="#fda4af" />;
            })}
            <circle r="9" fill="#e63963" />
          </motion.g>
        </motion.g>

      </svg>

      {/* Floating Animated Falling Flower Petals */}
      <div className="absolute inset-0">
        {[
          { top: '12%', left: '18%', delay: 0, duration: 7, size: 'text-xl sm:text-2xl' },
          { top: '28%', left: '82%', delay: 2, duration: 8, size: 'text-lg sm:text-xl' },
          { top: '46%', left: '12%', delay: 1, duration: 9, size: 'text-2xl sm:text-3xl' },
          { top: '62%', left: '88%', delay: 3, duration: 7.5, size: 'text-xl sm:text-2xl' },
          { top: '80%', left: '22%', delay: 1.5, duration: 8.5, size: 'text-lg sm:text-xl' },
          { top: '92%', left: '78%', delay: 0.5, duration: 9.5, size: 'text-2xl sm:text-3xl' },
        ].map((petal, idx) => (
          <motion.div
            key={idx}
            style={{ top: petal.top, left: petal.left }}
            animate={{
              y: [0, 45, 0],
              x: [0, 20, -20, 0],
              rotate: [0, 60, -60, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: petal.delay,
            }}
            className={`absolute text-pink-400/50 ${petal.size} select-none drop-shadow-sm`}
          >
            🌸
          </motion.div>
        ))}
      </div>

    </div>
  );
};
