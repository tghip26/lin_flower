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

      {/* Main Integrated Flowing Floral Vine SVG with Flower Mounted at Vine Tip (100, 80) */}
      <svg
        className="w-full h-full min-h-[3400px] absolute inset-0 opacity-90"
        viewBox="0 0 1440 3400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="glowingVineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e63963" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#fb7185" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e63963" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <filter id="vineGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Glow Layer - Vine stem starts EXACTLY at (100, 80) */}
        <path
          d="M 100,80 
             C 160,200 120,380 240,480 
             S 120,780 220,980 
             S 1280,1380 1200,1580 
             S 120,2040 240,2280 
             S 1280,2840 1200,3080"
          stroke="#f43f5e"
          strokeWidth="8"
          strokeOpacity="0.2"
          fill="none"
          filter="url(#vineGlow)"
        />

        {/* Primary Animated Vine Stem - Starts EXACTLY at (100, 80) from the Flower Center */}
        <motion.path
          d="M 100,80 
             C 160,200 120,380 240,480 
             S 120,780 220,980 
             S 1280,1380 1200,1580 
             S 120,2040 240,2280 
             S 1280,2840 1200,3080"
          stroke="url(#glowingVineGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Secondary Gold Dotted Line - Starts at (100, 80) */}
        <path
          d="M 100,80 
             C 175,210 135,390 255,490 
             S 135,790 235,990 
             S 1295,1390 1215,1590 
             S 135,2050 255,2290 
             S 1295,2850 1215,3090"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeDasharray="8 12"
          strokeOpacity="0.85"
          fill="none"
        />

        {/* Travelling Light Sparkle Particle starting from vine tip (100, 80) */}
        <circle r="5" fill="#ffffff" filter="url(#vineGlow)">
          <animateMotion
            path="M 100,80 C 160,200 120,380 240,480 S 120,780 220,980 S 1280,1380 1200,1580 S 120,2040 240,2280 S 1280,2840 1200,3080"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>

        {/* NODE 1 - FLOWER HEAD & LEAVES MOUNTED DIRECTLY AT THE VERY START TIP OF THE VINE STEM (100, 80) */}
        <motion.g
          transform="translate(100, 80)"
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Green Leaves radiating underneath flower base */}
          <path
            d="M 0,0 C -35,25 -45,-15 -20,-35 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.9"
          />
          <path
            d="M 0,0 C 25,35 -15,45 -35,20 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.9"
          />
          <path
            d="M 0,0 C 35,-20 45,15 20,35 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.8"
          />

          {/* Soft Pink Glow Filter */}
          <circle r="26" fill="#f43f5e" opacity="0.35" filter="url(#vineGlow)" />
          
          {/* Outer Layer Rounded Rose Petals (100% distortion-free & fully visible) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const px = 14 * Math.cos(rad);
            const py = 14 * Math.sin(rad);
            return (
              <circle key={i} cx={px} cy={py} r="9" fill="#fda4af" />
            );
          })}

          {/* Inner Layer Accent Petals */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const px = 7 * Math.cos(rad);
            const py = 7 * Math.sin(rad);
            return (
              <circle key={i} cx={px} cy={py} r="5.5" fill="#f472b6" />
            );
          })}

          {/* Yellow Center Core */}
          <circle r="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
        </motion.g>

        {/* SWAYING LEAF BRANCH 1 */}
        <motion.g
          transform="translate(240, 480)"
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M 0,0 C 30,-20 50,0 20,30 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.8"
          />
          <path d="M 0,0 C 15,0 25,10 20,30" stroke="#a7f3d0" strokeWidth="1" />
        </motion.g>

        {/* NODE 2 - FLOWER AT FLOWER FINDER WIZARD SECTION */}
        <motion.g
          transform="translate(220, 980)"
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <circle r="22" fill="#e63963" opacity="0.35" filter="url(#vineGlow)" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const px = 12 * Math.cos(rad);
            const py = 12 * Math.sin(rad);
            return (
              <circle key={i} cx={px} cy={py} r="8" fill="#f472b6" />
            );
          })}
          <circle r="8" fill="#be185d" />
        </motion.g>

        {/* SWAYING LEAF BRANCH 2 */}
        <motion.g
          transform="translate(1250, 1380)"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M 0,0 C -30,-20 -50,0 -20,30 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.8"
          />
        </motion.g>

        {/* NODE 3 - CATEGORIES SECTION (RIGHT SIDE) */}
        <motion.g
          transform="translate(1200, 1580)"
          animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <circle r="24" fill="#fbbf24" opacity="0.3" filter="url(#vineGlow)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const px = 13 * Math.cos(rad);
            const py = 13 * Math.sin(rad);
            return (
              <circle key={i} cx={px} cy={py} r="8" fill="#fef08a" />
            );
          })}
          <circle r="9" fill="#f59e0b" />
        </motion.g>

        {/* SWAYING LEAF BRANCH 3 */}
        <motion.g
          transform="translate(180, 2040)"
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M 0,0 C 35,-15 45,10 15,35 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.8"
          />
        </motion.g>

        {/* NODE 4 - CUSTOM REQUEST BANNER (Left) */}
        <motion.g
          transform="translate(240, 2280)"
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <circle r="20" fill="#be185d" opacity="0.35" filter="url(#vineGlow)" />
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const px = 11 * Math.cos(rad);
            const py = 11 * Math.sin(rad);
            return (
              <circle key={i} cx={px} cy={py} r="7" fill="#fb7185" />
            );
          })}
          <circle r="7" fill="#9d174d" />
        </motion.g>

        {/* NODE 5 - REVIEWS BOTTOM (Right) */}
        <motion.g
          transform="translate(1200, 3080)"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <circle r="26" fill="#e63963" opacity="0.35" filter="url(#vineGlow)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const px = 14 * Math.cos(rad);
            const py = 14 * Math.sin(rad);
            return (
              <circle key={i} cx={px} cy={py} r="9" fill="#fda4af" />
            );
          })}
          <circle r="10" fill="#e63963" />
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
