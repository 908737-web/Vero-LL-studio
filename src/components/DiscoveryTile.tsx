import React, { memo } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface DiscoveryTileProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  image: string;
  size: 'large' | 'medium' | 'vertical' | 'small';
  onClick: () => void;
  color: string;
}

export const DiscoveryTile = memo<DiscoveryTileProps>(({
  title,
  subtitle,
  icon: Icon,
  image,
  size,
  onClick,
  color
}) => {
  const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1 row-span-1',
    vertical: 'col-span-1 row-span-2',
    small: 'col-span-1 row-span-1'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${sizeClasses[size]} relative rounded-[32px] overflow-hidden cursor-pointer group border border-white/10`}
      style={{
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.05)`
      }}
    >
      {/* Background Image with Lighter crystalline Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[4px] transition-all group-hover:backdrop-blur-[2px] group-hover:bg-transparent" />
        
        {/* Lighter Modern Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10" />
      </div>

      {/* Pulsing Crystalline Atmosphere Glow */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -inset-20 z-0 bg-radial from-white/20 to-transparent blur-3xl pointer-events-none"
        style={{ color }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
        <div className={`p-3 rounded-2xl w-fit backdrop-blur-xl border border-white/10`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>

        <div>
          <h3 className="text-xl font-black text-white tracking-tight leading-none mb-2 drop-shadow-md">{title}</h3>
          <div className="inline-block px-2 py-0.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
            <p className="text-[9px] font-black text-white tracking-[0.2em] uppercase">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Glass Inner Glow */}
      <div className="absolute inset-0 pointer-events-none rounded-[32px] ring-1 ring-inset ring-white/10" />
    </motion.div>
  );
});
