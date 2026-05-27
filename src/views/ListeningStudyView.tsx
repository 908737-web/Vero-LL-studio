import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Headphones, Clock, Lock, Check } from 'lucide-react';

interface ListeningStudyViewProps {
  onBack: () => void;
  isDarkMode: boolean;
}

interface Track {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  status: 'completed' | 'available' | 'locked';
  color: string;
}

const DUMMY_TRACKS: Track[] = [
  { id: '1', title: 'The Power of Vulnerability', subtitle: 'TED Talk excerpt', duration: '20:34', status: 'completed', color: '#a855f7' },
  { id: '2', title: 'Everyday Coffee Shop English', subtitle: 'Native scenario', duration: '08:15', status: 'available', color: '#3b82f6' },
  { id: '3', title: 'Airport Security & Customs', subtitle: 'Travel survival', duration: '12:40', status: 'available', color: '#10b981' },
  { id: '4', title: 'Business Negotiation Prep', subtitle: 'Advanced vocabulary', duration: '18:50', status: 'locked', color: '#f59e0b' },
  { id: '5', title: 'Casual Weekend Plans', subtitle: 'Idiomatic expressions', duration: '05:20', status: 'locked', color: '#ec4899' },
];

export const ListeningStudyView: React.FC<ListeningStudyViewProps> = ({ onBack, isDarkMode }) => {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100

  // Dummy playback progress
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + 0.1; // Slow progress
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#030712] text-white' : 'bg-slate-50 text-slate-800'}`}>
      <div className="absolute inset-0 w-full max-w-[26.875rem] mx-auto relative h-full flex flex-col">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] opacity-20 transition-all duration-1000"
             style={{ backgroundColor: activeTrack ? activeTrack.color : '#a855f7' }}
           />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
        </div>

        {/* Floating Top Elements */}
        <div className="absolute top-0 left-0 right-0 w-full pt-8 px-3 pointer-events-none z-[150] flex justify-center items-start">
          {activeTrack && (
            <button 
              onClick={() => setActiveTrack(null)}
              className={`pointer-events-auto absolute left-6 p-3 glass rounded-full border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="text-center pointer-events-auto">
            <h2 className={`text-sm font-bold tracking-widest uppercase ${isDarkMode ? 'text-white/80' : 'text-slate-500'}`}>
              Deep Listening
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-slate-400'}`}>
              {activeTrack ? 'Immersion Active' : 'Select an Episode'}
            </p>
          </div>
          <div className="w-12 h-12 flex items-center justify-center absolute right-6">
            {!activeTrack && <Headphones size={20} className={isDarkMode ? 'text-white/40' : 'text-slate-400'} />}
          </div>
        </div>

        <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {!activeTrack ? (
              <motion.div 
                key="track-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 overflow-y-auto px-3 pt-24 pb-32 space-y-4"
              >
                {DUMMY_TRACKS.map((track, i) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => track.status !== 'locked' && setActiveTrack(track)}
                    className={`relative p-5 rounded-[24px] overflow-hidden ${
                      track.status === 'locked' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'
                    } transition-all border ${
                      isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`}
                      >
                        {track.status === 'locked' ? <Lock size={20} className={isDarkMode ? 'text-white/40' : 'text-slate-400'} /> :
                         track.status === 'completed' ? <Check size={20} style={{ color: track.color }} /> :
                         <Play size={20} style={{ color: track.color }} className="ml-1" />}
                      </div>
                      
                      <div className="flex-1">
                         <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{track.title}</h3>
                         <div className="flex items-center gap-3 mt-1">
                           <span className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>{track.subtitle}</span>
                           <span className={`text-[10px] flex items-center gap-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                              <Clock size={10} /> {track.duration}
                           </span>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="player"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col items-center justify-center -mt-10"
              >
                {/* Main Visualizer Stage */}
                <div className="relative w-72 h-72 @sm:w-80 @sm:h-80 flex items-center justify-center">
                  
                  {/* Spinning background rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border rounded-full"
                      style={{
                        borderColor: `${activeTrack.color}40`,
                        width: `${100 - i * 15}%`,
                        height: `${100 - i * 15}%`,
                      }}
                      animate={{
                        rotate: isPlaying ? [0, 360] : 0,
                        scale: isPlaying ? [1, 1.02 + i * 0.02, 1] : 1
                      }}
                      transition={{
                        rotate: { repeat: Infinity, duration: 20 + i * 5, ease: "linear" },
                        scale: { repeat: Infinity, duration: 2 + i, ease: "easeInOut" }
                      }}
                    />
                  ))}

                  {/* Generative Particle System */}
                  <div className="absolute inset-0 flex items-center justify-center">
                     {[...Array(36)].map((_, i) => {
                       return (
                         <motion.div
                           key={`bar-${i}`}
                           className="absolute w-1 rounded-full"
                           style={{
                             backgroundColor: `${activeTrack.color}CC`,
                             left: `50%`,
                             top: `50%`,
                             transformOrigin: '50% 0%',
                             rotate: `${i * 10}deg`,
                             translateY: '110px'
                           }}
                           initial={{ height: 4 }}
                           animate={{ 
                             height: isPlaying ? [4, Math.random() * 30 + 10, 4] : 4,
                             opacity: isPlaying ? [0.4, 1, 0.4] : 0.2
                           }}
                           transition={{
                             repeat: Infinity,
                             duration: 0.5 + Math.random() * 0.5,
                             delay: i * 0.05
                           }}
                         />
                       );
                     })}
                  </div>

                  {/* Orbiting Playhead */}
                  <motion.div 
                    className="absolute w-full h-full pointer-events-none"
                    style={{ rotate: `${(progress / 100) * 360}deg` }}
                  >
                    <div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-lg" 
                      style={{ backgroundColor: '#fff', boxShadow: `0 0 15px ${activeTrack.color}` }}
                    />
                  </motion.div>

                  {/* Center Content: Transcriptions */}
                  <div className={`absolute inset-0 m-12 rounded-full flex flex-col items-center justify-center text-center p-6 ${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-md border border-white/10 shadow-xl overflow-hidden`}>
                    <p className={`text-xs uppercase tracking-widest mb-2 opacity-50 font-bold`} style={{ color: activeTrack.color }}>{activeTrack.title}</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={Math.floor(progress / 10)}
                        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                        className={`font-serif text-lg leading-snug ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
                      >
                        {progress < 10 && "Focus your breathing before we begin..."}
                        {progress >= 10 && progress < 20 && "Immerse yourself into the dialogue."}
                        {progress >= 20 && progress < 30 && "Listen for the rising intonation..."}
                        {progress >= 30 && progress < 40 && "Notice how they connect their words."}
                        {progress >= 40 && progress < 50 && "The rhythm reveals the meaning..."}
                        {progress >= 50 && progress < 60 && "Embrace the natural flow..."}
                        {progress >= 60 && "Let the language wash over you."}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  
                </div>

                {/* Minimal Controls */}
                <div className="mt-16 flex items-center justify-center gap-8 px-3 w-full">
                  <button className={`p-3 transition-colors ${isDarkMode ? 'text-white/50 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}>
                    <SkipBack size={24} />
                  </button>
                  
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                    style={{ 
                      backgroundColor: activeTrack.color,
                      boxShadow: `0 0 30px ${activeTrack.color}66`
                    }}
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-2" />}
                  </button>

                  <button className={`p-3 transition-colors ${isDarkMode ? 'text-white/50 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}>
                    <SkipForward size={24} />
                  </button>
                </div>

                {/* Scrubbing area hint */}
                <div className="mt-12 text-center">
                  <p className={`text-xs tracking-widest uppercase mb-2 ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>Immersion Rate</p>
                  <div className="flex gap-2">
                    {['0.75x', '1x', '1.25x'].map((speed) => (
                      <button 
                        key={speed} 
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          speed === '1x' 
                            ? (isDarkMode ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800') 
                            : (isDarkMode ? 'text-white/40 glass border border-white/10' : 'text-slate-500 border border-slate-200')
                        }`}
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
