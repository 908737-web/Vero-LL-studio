import React, { useState, useMemo } from 'react';
import { essentialWords, mockEsameData } from '../data/dictionaryData';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DictionaryEntry } from '../components/DictionaryEntry';

interface DictionaryProps {
  isDarkMode: boolean;
}

export function Dictionary({ isDarkMode }: DictionaryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState<any | null>(null);

  const filteredWords = useMemo(() => {
    if (!searchTerm.trim()) {
      return essentialWords;
    }
    const lowerSearch = searchTerm.toLowerCase();
    return essentialWords.filter(word => 
      word.italian.toLowerCase().includes(lowerSearch) || 
      word.persian.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  const textColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const mutedTextColor = isDarkMode ? 'text-white/60' : 'text-slate-500';
  const bgGlass = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10';

  return (
    <div className="w-full h-full flex flex-col relative z-20">
      <AnimatePresence mode="wait">
        {selectedWord ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex-1 overflow-hidden"
          >
            <button onClick={() => setSelectedWord(null)} className="absolute top-8 left-4 z-50 text-indigo-400">Back</button>
            <DictionaryEntry data={selectedWord === 'esame' ? mockEsameData : {
                id: selectedWord.italian.toLowerCase(),
                word: selectedWord.italian,
                ipa: '...',
                parts: [{ type: 'Word', definitions: [{ text: selectedWord.persian, synonyms: [], antonyms: [], examples: [] }] }],
                phrases: [],
                nearbyWords: []
            }} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col relative"
          >
            <div className="pt-8 px-3 mb-4">
              <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Dictionary</h2>
              <div className={`relative flex items-center w-full h-12 rounded-2xl border ${bgGlass} backdrop-blur-md px-3 shadow-lg`}>
                <Search className={`w-5 h-5 ${mutedTextColor} mr-3`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search 100 essential words..."
                  className={`w-full h-full bg-transparent outline-none ${textColor} placeholder:text-opacity-50 text-base`}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-32 scrollbar-hide space-y-3 px-3">
              {filteredWords.map((word, index) => (
                <motion.div
                  key={word.italian + index}
                  onClick={() => setSelectedWord(word.italian.toLowerCase() === 'esame' ? 'esame' : word)}
                  className={`flex items-center justify-between p-4 rounded-[20px] border ${bgGlass} backdrop-blur-md cursor-pointer hover:bg-white/10`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${isDarkMode ? 'bg-white/10 text-white/50' : 'bg-slate-900/10 text-slate-500'}`}>
                      {index + 1}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className={`text-lg font-bold ${textColor}`}>{word.italian}</span>
                      <span className={`text-sm ${mutedTextColor} font-medium`}>{word.persian}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
