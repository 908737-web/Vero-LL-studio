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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-0 overflow-hidden pointer-events-none p-[2px]"
        >
          {/* Base Video Layer */}
          <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
            <video
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              style={{ willChange: 'opacity, transform' }}
              className={`w-full h-full object-cover ${isDarkMode ? 'opacity-40' : 'opacity-30'}`}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            {/* Ultra-Light crystalline Overlay for iOS 26 Feel */}
            <div className={`absolute inset-0 backdrop-blur-[40px] saturate-150 ${isDarkMode ? 'bg-slate-900/40' : 'bg-white/40'}`} />
            <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-white/5 to-transparent opacity-20' : 'from-black/5 to-transparent opacity-10'}`} />
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
