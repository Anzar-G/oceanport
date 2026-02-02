import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Base gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-navy-base via-shadow-navy to-black -z-20" />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 noise-texture -z-10 opacity-10" />
      
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-glow/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Radial gradient spotlight */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(600px circle at 50% 50%, rgba(29, 211, 175, 0.1), transparent 40%)',
          }}
        />
      </div>
      
      {/* Geometric decorations */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 border border-cyan-glow/5 rounded-full" />
        <div className="absolute bottom-40 left-10 w-64 h-64 border border-purple-depth/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-teal-accent/20 rounded-full blur-sm" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-depth/30 rounded-full blur-sm" />
      </div>
    </>
  );
};