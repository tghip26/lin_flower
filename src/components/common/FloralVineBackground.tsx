'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FloralVineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none transform-gpu">
      
      {/* Ambient Radial Floral Glows */}
      <div className="absolute top-[1%] left-[-5%] w-[250px] sm:w-[550px] h-[250px] sm:h-[550px] bg-pink-300/15 rounded-full blur-xl sm:blur-3xl"></div>
      <div className="absolute top-[30%] right-[-8%] w-[280px] sm:w-[650px] h-[280px] sm:h-[650px] bg-amber-200/15 rounded-full blur-xl sm:blur-3xl"></div>
      <div className="absolute top-[60%] left-[-5%] w-[250px] sm:w-[550px] h-[250px] sm:h-[550px] bg-rose-200/15 rounded-full blur-xl sm:blur-3xl"></div>
      <div className="absolute top-[85%] right-[-5%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-pink-200/15 rounded-full blur-xl sm:blur-3xl"></div>

      {/* ========================================== */}
      {/* 1. MOBILE OPTIMIZED SVG (Soft Subtle Watermark Opacity ~40%) */}
      {/* ========================================== */}
      <svg
        className="w-full h-full min-h-[3400px] absolute inset-0 opacity-40 block md:hidden transform-gpu"
        viewBox="0 0 375 3400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="treeBranchGradMob" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#be185d" stopOpacity="0.5" />
            <stop offset="25%" stopColor="#e63963" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#ec4899" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="leafGradMob" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Mobile Main Vine Outer Glow Line */}
        <path
          d="M 25,-20 
             C 35,160 20,380 45,620 
             C 70,840 330,1180 300,1520 
             S 40,2240 60,2640 
             S 330,2980 310,3340"
          stroke="#f43f5e"
          strokeWidth="6"
          strokeOpacity="0.15"
          fill="none"
        />

        {/* Mobile Primary Stem */}
        <path
          d="M 25,-20 
             C 35,160 20,380 45,620 
             C 70,840 330,1180 300,1520 
             S 40,2240 60,2640 
             S 330,2980 310,3340"
          stroke="url(#treeBranchGradMob)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Gold Dotted Mobile Line */}
        <path
          d="M 25,-20 
             C 40,170 25,390 50,630 
             C 75,850 335,1190 305,1530 
             S 45,2250 65,2650 
             S 335,2990 315,3350"
          stroke="#fbbf24"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* ========================================== */}
        {/* RIGHT SIDE FLORAL BRANCH & BLOSSOM (Soft Opacity) */}
        {/* ========================================== */}

        {/* Sub-branch 1: Arching across to the RIGHT SIDE near LIN FLOWER title */}
        <g opacity="0.85">
          <path
            d="M 30,220 C 120,180 240,170 325,200"
            stroke="url(#treeBranchGradMob)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M 140,185 C 135,170 155,165 158,180 Z" fill="url(#leafGradMob)" fillOpacity="0.5" />
          <path d="M 240,180 C 248,165 265,172 258,188 Z" fill="url(#leafGradMob)" fillOpacity="0.5" />

          {/* Large Blooming Rose Blossom on the RIGHT SIDE (X=325, Y=200) */}
          <g transform="translate(325, 200)">
            <circle r="15" fill="#f43f5e" opacity="0.2" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return <circle key={i} cx={9 * Math.cos(rad)} cy={9 * Math.sin(rad)} r="5" fill="#fda4af" opacity="0.75" />;
            })}
            <circle r="5" fill="#f472b6" opacity="0.8" />
            <circle r="4.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" opacity="0.85" />
          </g>
        </g>

        {/* Sub-branch 2: Arching to the RIGHT SIDE near CTA Buttons (X=315, Y=600) */}
        <g opacity="0.85">
          <path
            d="M 45,620 C 130,590 230,580 315,600"
            stroke="url(#treeBranchGradMob)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M 160,590 C 155,575 175,570 178,585 Z" fill="url(#leafGradMob)" fillOpacity="0.5" />

          {/* Golden Rose Blossom on the RIGHT SIDE near Buttons (X=315, Y=600) */}
          <g transform="translate(315, 600)">
            <circle r="14" fill="#fbbf24" opacity="0.2" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return <circle key={i} cx={7.5 * Math.cos(rad)} cy={7.5 * Math.sin(rad)} r="4.5" fill="#fef08a" opacity="0.8" />;
            })}
            <circle r="4" fill="#f59e0b" opacity="0.85" />
          </g>
        </g>

        {/* Sub-branch 3: Left side accent near text box */}
        <g transform="translate(35, 420)" opacity="0.85">
          <path d="M 0,0 C 25,-10 50,12 70,20" stroke="url(#treeBranchGradMob)" strokeWidth="2" fill="none" />
          <path d="M 30,-5 C 25,-15 40,-16 42,-5 Z" fill="url(#leafGradMob)" fillOpacity="0.5" />
          <g transform="translate(70, 20)">
            <circle r="11" fill="#ec4899" opacity="0.25" />
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return <circle key={i} cx={5.5 * Math.cos(rad)} cy={5.5 * Math.sin(rad)} r="3.5" fill="#f472b6" opacity="0.8" />;
            })}
            <circle r="3" fill="#fef08a" opacity="0.85" />
          </g>
        </g>

        {/* Mobile Side Branch (Categories section) */}
        <g transform="translate(300, 1520)" opacity="0.85">
          <path d="M 0,0 C -20,-5 -35,5 -45,10" stroke="url(#treeBranchGradMob)" strokeWidth="2" fill="none" />
          <g transform="translate(-45, 10)">
            <circle r="11" fill="#fbbf24" opacity="0.25" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return <circle key={i} cx={5.5 * Math.cos(rad)} cy={5.5 * Math.sin(rad)} r="3.5" fill="#fef08a" opacity="0.8" />;
            })}
            <circle r="3" fill="#f59e0b" opacity="0.85" />
          </g>
        </g>
      </svg>

      {/* ========================================== */}
      {/* 2. DESKTOP OPTIMIZED SVG (Soft Subtle Watermark Opacity ~45%) */}
      {/* ========================================== */}
      <svg
        className="w-full h-full min-h-[3400px] absolute inset-0 opacity-45 hidden md:block transform-gpu"
        viewBox="0 0 1440 3400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="treeBranchGradDesk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#be185d" stopOpacity="0.55" />
            <stop offset="20%" stopColor="#e63963" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#ec4899" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="leafGradDesk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.65" />
          </linearGradient>

          <filter id="vineGlowDesk" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Glow Layer */}
        <path
          d="M 20,-20 
             C 140,180 80,420 180,820 
             S 1320,1220 1200,1520 
             S 110,1840 240,2240 
             S 1320,2640 1200,3040"
          stroke="#f43f5e"
          strokeWidth="8"
          strokeOpacity="0.15"
          fill="none"
          filter="url(#vineGlowDesk)"
        />

        {/* Primary Animated Organic Main Tree Stem */}
        <path
          d="M 20,-20 
             C 140,180 80,420 180,820 
             S 1320,1220 1200,1520 
             S 110,1840 240,2240 
             S 1320,2640 1200,3040"
          stroke="url(#treeBranchGradDesk)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Secondary Gold Dotted Line */}
        <path
          d="M 20,-20 
             C 155,190 95,430 195,830 
             S 1335,1230 1215,1530 
             S 125,1850 255,2250 
             S 1335,2650 1215,3050"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeDasharray="8 12"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* SIDE BRANCH 1: Near LIN FLOWER (X=120, Y=260) */}
        <g opacity="0.85">
          <path d="M 120,260 C 170,250 210,270 240,285" stroke="url(#treeBranchGradDesk)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 170,250 C 160,230 180,225 185,245 Z" fill="url(#leafGradDesk)" fillOpacity="0.6" />
          <path d="M 210,270 C 220,250 235,260 225,275 Z" fill="url(#leafGradDesk)" fillOpacity="0.6" />

          <g transform="translate(240, 285)">
            <circle r="22" fill="#f43f5e" opacity="0.2" filter="url(#vineGlowDesk)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return <circle key={i} cx={12 * Math.cos(rad)} cy={12 * Math.sin(rad)} r="7.5" fill="#fda4af" opacity="0.8" />;
            })}
            <circle r="7" fill="#f472b6" opacity="0.85" />
            <circle r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" opacity="0.9" />
          </g>
        </g>

        {/* SIDE BRANCH 2: Mid-Hero Section (X=110, Y=520) */}
        <g opacity="0.85">
          <path d="M 110,520 C 70,530 40,510 20,490" stroke="url(#treeBranchGradDesk)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 60,525 C 45,510 60,495 70,515 Z" fill="url(#leafGradDesk)" fillOpacity="0.6" />
          <g transform="translate(20, 490)">
            <circle r="12" fill="#ec4899" opacity="0.25" filter="url(#vineGlowDesk)" />
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return <circle key={i} cx={7 * Math.cos(rad)} cy={7 * Math.sin(rad)} r="5" fill="#f472b6" opacity="0.8" />;
            })}
            <circle r="4" fill="#fbbf24" opacity="0.85" />
          </g>
        </g>

        {/* SIDE BRANCH 3: Flower Finder Wizard Section (X=180, Y=820) */}
        <g opacity="0.85">
          <path d="M 180,820 C 230,810 270,830 300,845" stroke="url(#treeBranchGradDesk)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 230,815 C 220,795 240,790 245,810 Z" fill="url(#leafGradDesk)" fillOpacity="0.6" />
          <g transform="translate(300, 845)">
            <circle r="20" fill="#e63963" opacity="0.2" filter="url(#vineGlowDesk)" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return <circle key={i} cx={11 * Math.cos(rad)} cy={11 * Math.sin(rad)} r="7" fill="#f472b6" opacity="0.8" />;
            })}
            <circle r="6" fill="#be185d" opacity="0.85" />
            <circle r="5" fill="#fef08a" opacity="0.9" />
          </g>
        </g>

        {/* SIDE BRANCH 4: Categories Section (X=1200, Y=1520) */}
        <g opacity="0.85">
          <path d="M 1200,1520 C 1140,1510 1100,1535 1070,1550" stroke="url(#treeBranchGradDesk)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 1140,1515 C 1130,1495 1150,1490 1155,1510 Z" fill="url(#leafGradDesk)" fillOpacity="0.6" />
          <g transform="translate(1070, 1550)">
            <circle r="22" fill="#fbbf24" opacity="0.2" filter="url(#vineGlowDesk)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return <circle key={i} cx={12 * Math.cos(rad)} cy={12 * Math.sin(rad)} r="7.5" fill="#fef08a" opacity="0.8" />;
            })}
            <circle r="7" fill="#f59e0b" opacity="0.85" />
          </g>
        </g>
      </svg>

      {/* Lightweight Falling Flower Petals */}
      <div className="absolute inset-0 hidden sm:block">
        {[
          { top: '12%', left: '18%', delay: 0, duration: 7, size: 'text-xl' },
          { top: '35%', left: '82%', delay: 2, duration: 8, size: 'text-lg' },
          { top: '65%', left: '12%', delay: 1, duration: 9, size: 'text-2xl' },
          { top: '88%', left: '78%', delay: 0.5, duration: 9.5, size: 'text-xl' },
        ].map((petal, idx) => (
          <div
            key={idx}
            style={{ top: petal.top, left: petal.left }}
            className={`absolute text-pink-400/25 ${petal.size} select-none transform-gpu will-change-transform`}
          >
            🌸
          </div>
        ))}
      </div>

    </div>
  );
};
