import { motion } from 'motion/react';

interface LiquidCapsuleButtonProps {
  onClick: () => void;
  label?: string;
}

export const LiquidCapsuleButton = ({ onClick, label = 'PACKAGES' }: LiquidCapsuleButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="relative flex items-center justify-center px-4 py-2.5 rounded-full overflow-hidden backdrop-blur-3xl transition-all group max-w-full"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderTopColor: 'rgba(255, 255, 255, 0.5)',
        boxShadow: 'inset 0 4px 10px rgba(255, 255, 255, 0.3), inset 0 -2px 8px rgba(0, 0, 0, 0.1), 0 10px 25px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Liquid Sheen Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      
      <span className="relative z-10 text-white font-bold text-[0.6rem] uppercase tracking-widest drop-shadow-md truncate w-full text-center">
        {label}
      </span>
    </motion.button>
  );
};
