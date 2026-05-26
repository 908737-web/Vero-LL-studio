import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BackgroundEffectsProps {
  themeName: string;
}

const CINEMATIC_MOODS = [
  { 
    id: 'Rome',
    gradient: 'from-amber-900/50 via-red-900/50 to-stone-900/80',
    meshColors: ['bg-amber-600', 'bg-red-700', 'bg-orange-500'],
    url: 'https://media.istockphoto.com/id/2202155787/photo/colosseum-rome-italy.jpg?s=612x612&w=0&k=20&c=GoaS_iRBFC1zjwd1orwZj5-fZIMkAagw_AHgA74wDPY='
  },
  { 
    id: 'Venice',
    gradient: 'from-blue-900/50 via-slate-800/50 to-cyan-900/80',
    meshColors: ['bg-blue-500', 'bg-cyan-400', 'bg-indigo-600'],
    url: 'https://preview.redd.it/itap-of-foggy-morning-in-venice-v0-b5xxsw9d6zgc1.jpeg?width=640&crop=smart&auto=webp&s=8dfd2170ad80059185917ab242e4ba66f80b9da4'
  },
  { 
    id: 'Amalfi',
    gradient: 'from-teal-900/50 via-cyan-800/50 to-blue-900/80',
    meshColors: ['bg-teal-500', 'bg-cyan-400', 'bg-sky-500'],
    url: 'https://dianashealthyliving.com/wp-content/uploads/2019/09/positano-amalfi-coast-italy-1440x960.jpg'
  },
  { 
    id: 'Tuscany',
    gradient: 'from-orange-900/50 via-yellow-800/50 to-rose-900/80',
    meshColors: ['bg-orange-500', 'bg-yellow-600', 'bg-rose-500'],
    url: 'https://www.sightseeing-experience.com/magazine/wp-content/uploads/2025/09/AdobeStock_572224548-1024x684.jpeg'
  },
  { 
    id: 'Milan',
    gradient: 'from-zinc-900/50 via-slate-800/50 to-stone-900/80',
    meshColors: ['bg-zinc-500', 'bg-slate-400', 'bg-stone-500'],
    url: 'https://media.gettyimages.com/id/2149037621/photo/milan-cathedral-or-duomo-di-milano-at-early-morning-sunrise-time-italy.jpg?b=1&s=1024x1024&w=gi&k=20&c=Cw5hjhC2rpmAmhZ9e4SMdMRbVrMRKzzAYvfcbCxn-3I='
  },
];

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ themeName }) => {
  const [index, setIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Basic mouse move logic to softly bias the gradient orbs globally
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setTargetPos({ x, y });
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        const y = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
        setTargetPos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Cinematic cycle rotation (swap photos every 10 seconds)
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CINEMATIC_MOODS.length);
    }, 10000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      clearInterval(interval);
    };
  }, []);

  // Smooth out mouse pos using basic interpolation in a rAF (or motion can do it inherently via type: spring)
  // We'll rely on motion's type: spring below for smoothing.

  const moodData = CINEMATIC_MOODS[index];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#0a0a0c]">
      
      {/* 1. Cinematic Background Image Engine - Crossfading Parallax */}
      <AnimatePresence>
        <motion.div
          key={moodData.id}
          initial={{ opacity: 0, scale: 1.1, x: "2%" }}
          animate={{ opacity: 0.6, scale: 1, x: "0%" }}
          exit={{ opacity: 0, scale: 1.05, x: "-2%" }}
          transition={{ duration: 6, ease: 'easeInOut' }}
          className="absolute inset-0 z-0 bg-cover bg-center mix-blend-lighten"
          style={{ backgroundImage: `url(${moodData.url})` }}
        />
      </AnimatePresence>

      {/* 2. Darkening & Tone Gradient Overlay */}
      <AnimatePresence>
        <motion.div
          key={`grad-${moodData.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 4, ease: 'easeInOut' }}
          className={`absolute inset-0 z-10 bg-gradient-to-br ${moodData.gradient} mix-blend-multiply`}
        />
      </AnimatePresence>

      {/* 3. Interactive Mesh Gradient / Fluid Layer */}
      <motion.div 
        className="absolute inset-0 z-20 opacity-60 mix-blend-screen"
        animate={{
          x: targetPos.x * -40,
          y: targetPos.y * -40,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 50, mass: 2 }}
      >
         <AnimatePresence mode="popLayout">
            <motion.div 
              key={`mesh-${moodData.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
               {/* Ambient Core Orb 1 */}
               <motion.div
                 className={`absolute top-[5%] left-[10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-[40%] blur-[80px] ${moodData.meshColors[0]} opacity-50`}
                 animate={{ scale: [1, 1.3, 0.9, 1], rotate: [0, 90, 180, 360], x: [0, 40, -30, 0], y: [0, 20, -40, 0] }}
                 transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
               />
               {/* Ambient Core Orb 2 */}
               <motion.div
                 className={`absolute bottom-[10%] right-[5%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] rounded-full blur-[100px] ${moodData.meshColors[1]} opacity-50`}
                 animate={{ scale: [1, 1.1, 1.4, 1], rotate: [0, -120, -240, -360], x: [0, -50, 40, 0], y: [0, -60, 30, 0] }}
                 transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
               />
               {/* Interactive follow orb - Reacts softly to mouse/touch */}
               <motion.div
                 className={`absolute -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full blur-[90px] ${moodData.meshColors[2]} opacity-60`}
                 animate={{
                   left: `${(targetPos.x + 1) * 50}%`,
                   top: `${(targetPos.y + 1) * 50}%`,
                 }}
                 transition={{ type: 'spring', damping: 60, stiffness: 30, mass: 3 }}
               />
            </motion.div>
         </AnimatePresence>
      </motion.div>

      {/* 4. Film Grain & Light Pulse Shaders */}
      <div className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_100%)] animate-pulse mix-blend-overlay" />
      
      {/* 5. iOS 26 Glassmorphism Frost Filter - Deep Blur for "Atmospheric Memory" */}
      <div 
        className="absolute inset-0 z-40 backdrop-blur-[64px] saturate-[160%] brightness-[1.1] " 
        style={{ WebkitBackdropFilter: 'blur(64px) saturate(160%) brightness(1.1)' }} 
      />
      
      {/* 6. Edge Reflections (Simulates a physical glass slice) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-50 opacity-40 mix-blend-overlay" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-50 opacity-40 mix-blend-overlay" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-50 mix-blend-overlay" />
    </div>
  );
};
