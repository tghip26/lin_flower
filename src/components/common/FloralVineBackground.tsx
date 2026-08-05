'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FloralVineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* Ambient Radial Floral Glows */}
      <div className="absolute top-[3%] left-[-8%] w-[550px] h-[550px] bg-pink-300/25 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-[30%] right-[-8%] w-[650px] h-[650px] bg-amber-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-[60%] left-[-5%] w-[550px] h-[550px] bg-rose-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-[85%] right-[-5%] w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-3xl"></div>

      {/* Main Flowing Floral Vine SVG */}
      <svg
        className="w-full h-full min-h-[3400px] absolute inset-0 opacity-90"
        viewBox="0 0 1440 3400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glowing Vine Linear Gradients */}
          <linearGradient id="glowingVineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e63963" stopOpacity="0.75" />
            <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#fb7185" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e63963" stopOpacity="0.7" />
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

        {/* Outer Soft Glow Layer for Vine */}
        <path
          d="M 120,60 
             C 320,320 60,620 220,920 
             S 1360,1220 1250,1520 
             S 110,1820 260,2220 
             S 1320,2620 1210,3020
             S 200,3220 300,3380"
          stroke="#f43f5e"
          strokeWidth="8"
          strokeOpacity="0.2"
          fill="none"
          filter="url(#vineGlow)"
        />

        {/* Primary Animated Vine Stem */}
        <motion.path
          d="M 120,60 
             C 320,320 60,620 220,920 
             S 1360,1220 1250,1520 
             S 110,1820 260,2220 
             S 1320,2620 1210,3020
             S 200,3220 300,3380"
          stroke="url(#glowingVineGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Secondary Gold Twinkling Dotted Line */}
        <path
          d="M 135,70 
             C 335,330 75,630 235,930 
             S 1375,1230 1265,1530 
             S 125,1830 275,2230 
             S 1335,2630 1225,3030"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeDasharray="8 12"
          strokeOpacity="0.85"
          fill="none"
        />

        {/* Travelling Light Sparkle Particle on Vine Path */}
        <circle r="5" fill="#ffffff" filter="url(#vineGlow)">
          <animateMotion
            path="M 120,60 C 320,320 60,620 220,920 S 1360,1220 1250,1520 S 110,1820 260,2220 S 1320,2620 1210,3020 S 200,3220 300,3380"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>

        {/* NODE 1 - HERO BANNER FLOWER (Top Left) */}
        <motion.g
          transform="translate(120, 60)"
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle r="14" fill="#f43f5e" opacity="0.3" filter="url(#vineGlow)" />
          <circle r="8" fill="#fbbf24" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-16"
              rx="5"
              ry="11"
              fill="#fda4af"
              transform={`rotate(${angle})`}
            />
          ))}
        </motion.g>

        {/* SWAYING LEAF BRANCH 1 */}
        <motion.g
          transform="translate(240, 420)"
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M 0,0 C 30,-20 50,0 20,30 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.75"
          />
          <path d="M 0,0 C 15,0 25,10 20,30" stroke="#a7f3d0" strokeWidth="1" />
        </motion.g>

        {/* NODE 2 - FLOWER FINDER WIZARD (Middle Left) */}
        <motion.g
          transform="translate(220, 920)"
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <circle r="18" fill="#e63963" opacity="0.35" filter="url(#vineGlow)" />
          <circle r="9" fill="#e63963" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-18"
              rx="6"
              ry="13"
              fill="#f472b6"
              transform={`rotate(${angle})`}
            />
          ))}
        </motion.g>

        {/* SWAYING LEAF BRANCH 2 */}
        <motion.g
          transform="translate(1310, 1340)"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M 0,0 C -30,-20 -50,0 -20,30 Z"
            fill="url(#leafGrad)"
            fillOpacity="0.8"
          />
        </motion.g>

        {/* NODE 3 - CATEGORIES SECTION (Right) */}
        <motion.g
          transform="translate(1250, 1520)"
          animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <circle r="20" fill="#fbbf24" opacity="0.3" filter="url(#vineGlow)" />
          <circle r="10" fill="#f59e0b" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-20"
              rx="7"
              ry="14"
              fill="#fef08a"
              transform={`rotate(${angle})`}
            />
          ))}
        </motion.g>

        {/* SWAYING LEAF BRANCH 3 */}
        <motion.g
          transform="translate(180, 1950)"
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
          transform="translate(260, 2220)"
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <circle r="16" fill="#be185d" opacity="0.35" filter="url(#vineGlow)" />
          <circle r="8" fill="#be185d" />
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-16"
              rx="6"
              ry="12"
              fill="#fb7185"
              transform={`rotate(${angle})`}
            />
          ))}
        </motion.g>

        {/* NODE 5 - REVIEWS BOTTOM (Right) */}
        <motion.g
          transform="translate(1210, 3020)"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <circle r="22" fill="#e63963" opacity="0.35" filter="url(#vineGlow)" />
          <circle r="10" fill="#e63963" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-22"
              rx="8"
              ry="15"
              fill="#fda4af"
              transform={`rotate(${angle})`}
            />
          ))}
        </motion.g>
      </svg>

      {/* Floating Animated Falling Flower Petals with Physics Motion */}
      <div className="absolute inset-0">
        {[
          { top: '8%', left: '18%', delay: 0, duration: 7, size: 'text-2xl' },
          { top: '24%', left: '82%', delay: 2, duration: 8, size: 'text-xl' },
          { top: '42%', left: '12%', delay: 1, duration: 9, size: 'text-3xl' },
          { top: '58%', left: '88%', delay: 3, duration: 7.5, size: 'text-2xl' },
          { top: '75%', left: '22%', delay: 1.5, duration: 8.5, size: 'text-xl' },
          { top: '88%', left: '78%', delay: 0.5, duration: 9.5, size: 'text-3xl' },
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
