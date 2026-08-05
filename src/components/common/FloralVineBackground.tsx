'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FloralVineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* Ambient Radial Floral Glows */}
      <div className="absolute top-[5%] left-[-5%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-[30%] right-[-8%] w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-amber-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-[60%] left-[-5%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-rose-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-[85%] right-[-5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-pink-200/30 rounded-full blur-3xl"></div>

      {/* Flowing Vine Line SVG */}
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

          <filter id="vineGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Glow Layer starting near LIN FLOWER (X=60, Y=310) */}
        <path
          d="M 60,310 
             C 180,480 50,700 220,940 
             S 1360,1240 1250,1540 
             S 110,1840 260,2240 
             S 1320,2640 1210,3040
             S 200,3240 300,3380"
          stroke="#f43f5e"
          strokeWidth="8"
          strokeOpacity="0.2"
          fill="none"
          filter="url(#vineGlow)"
        />

        {/* Primary Animated Vine Stem starting near LIN FLOWER (X=60, Y=310) */}
        <motion.path
          d="M 60,310 
             C 180,480 50,700 220,940 
             S 1360,1240 1250,1540 
             S 110,1840 260,2240 
             S 1320,2640 1210,3040
             S 200,3240 300,3380"
          stroke="url(#glowingVineGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Secondary Gold Dotted Line starting near LIN FLOWER */}
        <path
          d="M 60,310 
             C 195,490 65,710 235,950 
             S 1375,1250 1265,1550 
             S 125,1850 275,2250 
             S 1335,2650 1225,3050"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeDasharray="8 12"
          strokeOpacity="0.85"
          fill="none"
        />

        {/* Travelling Light Sparkle Particle */}
        <circle r="5" fill="#ffffff" filter="url(#vineGlow)">
          <animateMotion
            path="M 60,310 C 180,480 50,700 220,940 S 1360,1240 1250,1540 S 110,1840 260,2240 S 1320,2640 1210,3040 S 200,3240 300,3380"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* RESPONSIVE FLOWER BLOSSOM NODES (Rendered with HTML/CSS to prevent mobile SVG stretching!) */}

      {/* NODE 1 - FLOWER ATTACHED NEAR "LIN FLOWER" HEADING */}
      <motion.div
        style={{ top: '300px', left: '16px' }}
        animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute z-10 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16"
      >
        {/* Green leaves under flower head */}
        <div className="absolute w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/80 rounded-tl-full rounded-br-full -rotate-45 -top-1 -left-1 shadow-xs"></div>
        <div className="absolute w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600/80 rounded-tr-full rounded-bl-full rotate-45 -top-1 -right-1 shadow-xs"></div>

        {/* Flower Glow Aura */}
        <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-md animate-pulse"></div>

        {/* Flower Petals */}
        <div className="relative w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <div
              key={i}
              style={{ transform: `rotate(${angle}deg) translateY(-14px)` }}
              className="absolute w-3.5 h-7 sm:w-4 sm:h-8 bg-gradient-to-t from-rose-400 to-pink-300 rounded-full shadow-xs"
            ></div>
          ))}
          {/* Yellow Center */}
          <div className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 bg-amber-400 border-2 border-amber-500 rounded-full shadow-sm"></div>
        </div>
      </motion.div>

      {/* NODE 2 - FLOWER AT FLOWER FINDER WIZARD SECTION */}
      <motion.div
        style={{ top: '930px', left: '20px' }}
        animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute z-10 hidden sm:flex items-center justify-center w-12 h-12"
      >
        <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-md"></div>
        <div className="relative w-10 h-10 flex items-center justify-center">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <div
              key={i}
              style={{ transform: `rotate(${angle}deg) translateY(-12px)` }}
              className="absolute w-3 h-6 bg-pink-400 rounded-full"
            ></div>
          ))}
          <div className="relative z-10 w-3.5 h-3.5 bg-rose-600 rounded-full"></div>
        </div>
      </motion.div>

      {/* NODE 3 - FLOWER AT CATEGORIES SECTION (RIGHT SIDE) */}
      <motion.div
        style={{ top: '1530px', right: '25px' }}
        animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.07, 1] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute z-10 hidden sm:flex items-center justify-center w-14 h-14"
      >
        <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-md"></div>
        <div className="relative w-12 h-12 flex items-center justify-center">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <div
              key={i}
              style={{ transform: `rotate(${angle}deg) translateY(-13px)` }}
              className="absolute w-3.5 h-7 bg-amber-200 rounded-full"
            ></div>
          ))}
          <div className="relative z-10 w-4 h-4 bg-amber-500 rounded-full"></div>
        </div>
      </motion.div>

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
