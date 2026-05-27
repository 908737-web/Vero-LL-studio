import React, { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicBackgroundProps {
  videoUrl?: string;
  isActive: boolean;
  themeColor?: string;
  isDarkMode?: boolean;
}

export const CinematicBackground = memo<CinematicBackgroundProps>(({ 
  videoUrl, 
  isActive, 
  themeColor,
  isDarkMode = true 
}) => {
  return (
    <AnimatePresence>
      {isActive && videoUrl && (
        <motion.div
          key={videoUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-0 overflow-hidden pointer-events-none p-[2px]"
        >
          {/* Base Video Layer */}
          <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
            <video
              key={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              style={{ willChange: 'opacity, transform' }}
              className={`w-full h-full object-cover ${isDarkMode ? 'opacity-80' : 'opacity-70'}`}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            {/* Subtle overlay for contrast and legibility, retaining some premium styling with low blur */}
            <div className={`absolute inset-0 backdrop-blur-[2px] saturate-125 ${isDarkMode ? 'bg-slate-950/40' : 'bg-white/30'}`} />
            <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-transparent via-slate-950/20 to-slate-950/80 shadow-inner' : 'from-transparent via-white/10 to-white/70 shadow-inner'}`} />
          </div>

          {/* Pulsing Neon Border */}
          <motion.div
            className="absolute inset-[4px] rounded-[38px] border-2 pointer-events-none z-10"
            style={{ 
              borderColor: themeColor || '#3b82f6',
            }}
            animate={{ 
              boxShadow: themeColor ? [
                `inset 0 0 10px ${themeColor}00, 0 0 10px ${themeColor}00`,
                `inset 0 0 20px ${themeColor}80, 0 0 20px ${themeColor}80`,
                `inset 0 0 10px ${themeColor}00, 0 0 10px ${themeColor}00`
              ] : 'none',
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});
