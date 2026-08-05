'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FloralVineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* Ambient Radial Floral Glows */}
      <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-[65%] left-[-5%] w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl"></div>

      {/* Main Flowing Floral Vine SVG */}
      <svg
        className="w-full h-full min-h-[3000px] absolute inset-0 opacity-80"
        viewBox="0 0 1440 3200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Linear Gradients for Vine */}
          <linearGradient id="vineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e63963" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#ec4899" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e63963" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Primary Winding Vine Path */}
        <motion.path
          d="M 100,80 
             C 300,300 50,600 200,900 
             S 1350,1200 1240,1500 
             S 100,1800 250,2200 
             S 1300,2600 1200,3000"
          stroke="url(#vineGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowFilter)"
        />

        {/* Secondary Decorative Dotted Sub-Vine */}
        <path
          d="M 120,90 
             C 320,310 70,610 220,910 
             S 1370,1210 1260,1510 
             S 120,1810 270,2210 
             S 1320,2610 1220,3010"
          stroke="#fcd34d"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Blooming Floral Node 1 - Top Left */}
        <g transform="translate(100, 80)">
          <circle r="8" fill="#e63963" className="animate-ping opacity-75" />
          <circle r="6" fill="#fbbf24" filter="url(#glowFilter)" />
          {/* Flower petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-12"
              rx="4"
              ry="8"
              fill="#fda4af"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>

        {/* Leaf 1 */}
        <path
          d="M 180,450 C 210,430 230,450 200,480 C 180,470 170,450 180,450 Z"
          fill="#34d399"
          fillOpacity="0.5"
        />

        {/* Blooming Floral Node 2 - Flower Finder Section */}
        <g transform="translate(200, 900)">
          <circle r="12" fill="#f43f5e" opacity="0.3" />
          <circle r="7" fill="#e63963" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-14"
              rx="5"
              ry="9"
              fill="#f472b6"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>

        {/* Leaf 2 */}
        <path
          d="M 1270,1350 C 1300,1330 1320,1350 1290,1380 C 1270,1370 1260,1350 1270,1350 Z"
          fill="#10b981"
          fillOpacity="0.5"
        />

        {/* Blooming Floral Node 3 - Categories Section */}
        <g transform="translate(1240, 1500)">
          <circle r="14" fill="#fbbf24" opacity="0.3" />
          <circle r="8" fill="#f59e0b" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-16"
              rx="6"
              ry="11"
              fill="#fef08a"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>

        {/* Blooming Floral Node 4 - Custom Banner Section */}
        <g transform="translate(250, 2200)">
          <circle r="12" fill="#ec4899" opacity="0.4" />
          <circle r="7" fill="#be185d" />
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-14"
              rx="5"
              ry="10"
              fill="#f472b6"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>

        {/* Blooming Floral Node 5 - Reviews Bottom Section */}
        <g transform="translate(1200, 3000)">
          <circle r="16" fill="#e63963" opacity="0.3" />
          <circle r="9" fill="#e63963" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-18"
              rx="7"
              ry="13"
              fill="#fb7185"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>
      </svg>

      {/* Floating Animated Falling Flower Petals */}
      <div className="absolute inset-0">
        {[
          { top: '12%', left: '15%', delay: 0, duration: 6 },
          { top: '28%', left: '80%', delay: 2, duration: 7 },
          { top: '45%', left: '10%', delay: 1, duration: 8 },
          { top: '62%', left: '85%', delay: 3, duration: 6.5 },
          { top: '78%', left: '20%', delay: 1.5, duration: 7.5 },
          { top: '90%', left: '75%', delay: 0.5, duration: 8.5 },
        ].map((petal, idx) => (
          <motion.div
            key={idx}
            style={{ top: petal.top, left: petal.left }}
            animate={{
              y: [0, 35, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 45, -45, 0],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: petal.delay,
            }}
            className="absolute text-brand-300/40 text-lg sm:text-2xl select-none"
          >
            🌸
          </motion.div>
        ))}
      </div>

    </div>
  );
};
