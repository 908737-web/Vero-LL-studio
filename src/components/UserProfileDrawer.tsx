import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfileScreen } from '../views/UserProfileScreen';
import { DailyGoal, ThemeColors } from '../types';

interface UserProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  uiScale: 'small' | 'medium' | 'large';
  setUiScale: (v: 'small' | 'medium' | 'large') => void;
  themeMode: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
  dailyGoal: DailyGoal;
  setDailyGoal: (goal: DailyGoal) => void;
}

export const UserProfileDrawer = ({ 
  isOpen, 
  onClose,
  isDarkMode,
  uiScale,
  setUiScale,
  themeMode,
  setThemeMode,
  dailyGoal,
  setDailyGoal
}: UserProfileDrawerProps) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          {/* Backdrop with heavy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[80px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md h-[85vh] rounded-[3rem] border border-white/20 overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="flex-1 overflow-hidden px-6 pt-6 relative border-t-0 border-r-0 border-l-0">
               <UserProfileScreen 
                  isDarkMode={isDarkMode}
                  uiScale={uiScale}
                  setUiScale={setUiScale}
                  themeMode={themeMode}
                  setThemeMode={setThemeMode}
                  dailyGoal={dailyGoal}
                  setDailyGoal={setDailyGoal}
               />
               <button 
                  onClick={onClose}
                  className="absolute top-8 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors"
                  aria-label="Close drawer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
