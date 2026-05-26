import React, { useState, useMemo } from 'react';
import { MOCK_FLASHCARDS } from '../constants/mockData';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DictionaryProps {
  isDarkMode: boolean;
}

export function Dictionary({ isDarkMode }: DictionaryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = useMemo(() => {
    if (!searchTerm.trim()) {
      return MOCK_FLASHCARDS;
    }
    const lowerSearch = searchTerm.toLowerCase();
    return MOCK_FLASHCARDS.filter(card => {
      const matchIt = card.word_it.toLowerCase().includes(lowerSearch);
      const matchFa = card.translation_fa.toLowerCase().includes(lowerSearch);
      return matchIt || matchFa;
    });
  }, [searchTerm]);

  const textColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const mutedTextColor = isDarkMode ? 'text-white/60' : 'text-slate-500';
  const bgGlass = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10';

  return (
    <div className="w-full h-full flex flex-col relative z-20">
      <div className="mb-4 shrink-0">
        <h2 className={`text-2xl font-bold mb-4 ${textColor} pt-2`}>Dictionary</h2>
        <div className={`relative flex items-center w-full h-12 rounded-2xl border ${bgGlass} backdrop-blur-md px-4`}>
          <Search className={`w-5 h-5 ${mutedTextColor} mr-3`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Italian or Persian..."
            className={`w-full h-full bg-transparent outline-none ${textColor} placeholder:text-opacity-50 text-base`}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredCards.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 text-center w-full"
            >
              <p className={mutedTextColor}>No words found for "{searchTerm}"</p>
            </motion.div>
          ) : (
            filteredCards.map((card, index) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center justify-between p-4 rounded-[20px] border ${bgGlass} backdrop-blur-md`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${isDarkMode ? 'bg-white/10 text-white/50' : 'bg-slate-900/10 text-slate-500'}`}>
                    {index + 1}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-lg font-bold ${textColor}`}>{card.word_it}</span>
                    <span className={`text-sm ${mutedTextColor} font-medium`}>{card.translation_fa}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
