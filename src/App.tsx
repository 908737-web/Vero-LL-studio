/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpDown, BookOpen, Calendar, ChevronRight, Flame, Headphones, LayoutGrid, Library, MessageSquare, PenTool, Search, Settings, Trophy, User, Youtube, FlaskConical, Plus, X, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import GridLayout, { WidthProvider } from "react-grid-layout/legacy";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { LiquidCapsuleButton } from './components/LiquidCapsuleButton';
import { PackageSelectorDrawer } from './components/PackageSelectorDrawer';
import { MODULE_PACKAGES } from './constants/packages';
import { CardCategory, FlashcardData, Gender, SRSLevel, ThemeColors, DailyGoal } from './types';
import { Flashcard } from './components/Flashcard';
import { GlassCard } from './components/GlassCard';
import { SettingsScreen } from './components/SettingsScreen';
import { BioPortal, StudyState } from './components/BioPortal';
import { BottomNav } from './components/BottomNav';
import { BackgroundEffects } from './components/BackgroundEffects';
import { AudioPlayer } from './components/AudioPlayer';
import { AddMenu, AVAILABLE_ITEMS } from './components/AddMenu';
import { MOCK_FLASHCARDS } from './constants/mockData';
import { THEMES } from './constants/themes';

const ReactGridLayout = WidthProvider(GridLayout);
type Layout = any;

const initialLayout: Layout[] = [
  { i: 'vocab', x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 1 },
  { i: 'grammar', x: 0, y: 2, w: 2, h: 2, minW: 2, minH: 1 },
  { i: 'listening', x: 2, y: 2, w: 2, h: 2, minW: 2, minH: 1 },
  { i: 'verblab', x: 0, y: 4, w: 2, h: 3, minW: 2, minH: 2 },
  { i: 'stories', x: 2, y: 4, w: 2, h: 2, minW: 2, minH: 1 },
  { i: 'youtube', x: 2, y: 6, w: 2, h: 2, minW: 2, minH: 1 },
  { i: 'smartlib', x: 0, y: 8, w: 4, h: 2, minW: 2, minH: 1 },
];

type AppView = 'dashboard' | 'study' | 'discover' | 'dictionary' | 'salotto';

import { Discovery } from './views/Discovery';
import { Dictionary } from './views/Dictionary';
import { LaboratorioOverlay } from './components/LaboratorioOverlay';
import { UserProfileScreen } from './views/UserProfileScreen';
import { UserProfileDrawer } from './components/UserProfileDrawer';

export default function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [view, setView] = useState<AppView>('dashboard');
  const [gridState, setGridState] = useState<Layout[]>(initialLayout);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [contentVersion, setContentVersion] = useState(1);
  const [isLabOpen, setIsLabOpen] = useState(false);

  // Theme State
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(currentTheme.mode);

  // Sync theme mode when currentTheme changes manually (from some other place if any)
  useEffect(() => {
    if (currentTheme.mode !== themeMode) {
      // If we switched to a theme that exclusively supports one mode, we could sync it
      // But for now let's just let the user toggle mode independently if they want
    }
  }, [currentTheme]);

  // Version Check Simulation
  useEffect(() => {
    const checkVersion = async () => {
      // Simulating an API call to Google Sheets / Cloud config
      await new Promise(resolve => setTimeout(resolve, 2000));
      const latestVersion = 2; // In real app, this would come from fetch
      if (latestVersion > contentVersion) {
        console.log('New content version detected: Refreshing lists...');
        setContentVersion(latestVersion);
      }
    };
    checkVersion();
  }, [contentVersion]);

  const handleToggleModule = (id: string) => {
    const exists = gridState.find(l => l.i === id);
    if (exists) {
      setGridState(gridState.filter(l => l.i !== id));
    } else {
      // Find default config or create one
      let defaultConfig = initialLayout.find(l => l.i === id);
      if (!defaultConfig) {
        // Find if it's one of the discovery packages
        // We'll just define some dynamic placement logic
        defaultConfig = { i: id, x: 0, y: gridState.length * 2, w: 2, h: 2, minW: 2, minH: 1 };
      }
      setGridState([...gridState, defaultConfig]);
    }
  };

  const handleDiscoveryAdd = (pkg: { id: string, color: string }, coords?: { x: number, y: number }) => {
    handleToggleModule(pkg.id);
    if (coords) {
      setParticleAnimation({ ...coords, color: pkg.color });
      setTimeout(() => setParticleAnimation(null), 1000);
    }
  };

  const [streak, setStreak] = useState(12);
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>({ cardTarget: 20, cardsReviewedToday: 0 });
  const [selectedPackages, setSelectedPackages] = useState<Record<string, string>>({
    vocab: 'business',
    grammar: 'congiuntivo',
    listening: 'coffee',
    verblab: 'irreg',
    stories: 'pinocchio',
    youtube: 'easy',
    smartlib: 'progetto'
  });
  const [isHeatmapExpanded, setIsHeatmapExpanded] = useState(false);
  const [discoveryThemeColor, setDiscoveryThemeColor] = useState('');
  const [particleAnimation, setParticleAnimation] = useState<{ x: number, y: number, color: string } | null>(null);
  
  const handlePackageSelect = (moduleId: string, packageId: string) => {
    setSelectedPackages(prev => ({ ...prev, [moduleId]: packageId }));
    
    // Inject particle animation logic
    // Find the tile position (approximate or just from center to bottom)
    setParticleAnimation({ 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2, 
      color: '#3b82f6' // Default blue glow for injection
    });
    setTimeout(() => setParticleAnimation(null), 1000);
  };
  
  const handleAnswer = (level: SRSLevel) => {
    console.log(`Answered ${level}`);
    setDailyGoal(prev => ({ ...prev, cardsReviewedToday: prev.cardsReviewedToday + 1 }));
    handleNextCard();
  };

  const ALL_PORTAL_STATES: StudyState[] = [
    'IDLE', 'CONSISTENCY', 'HIGH_ENERGY', 'DEEP_FOCUS', 'RAPID', 
    'LEVEL_UP', 'DROPPING', 'HIGH_ERROR', 'INACTIVE', 'COMPLETED'
  ];
  const [portalState, setPortalState] = useState<StudyState>('IDLE');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isPackageSelectorOpen, setIsPackageSelectorOpen] = useState(false);
  const [selectorModuleId, setSelectorModuleId] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<'vocab' | 'grammar' | null>(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const [uiScale, setUiScale] = useState<'small' | 'medium' | 'large'>('medium');

  // Apply CSS Variables instantly
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-gradient', currentTheme.gradient);
    root.style.setProperty('--theme-accent', currentTheme.accent);
    root.style.setProperty('--theme-glow', currentTheme.glow);
    
    // UI Scaling Map
    const scaleFactorMap = {
      'small': '0.8',
      'medium': '1.0',
      'large': '1.2'
    };
    const fontSizeMap = {
      'small': '12px',
      'medium': '16px',
      'large': '20px'
    };
    root.style.setProperty('--ui-factor', scaleFactorMap[uiScale]);
    root.style.setProperty('--font-base', fontSizeMap[uiScale]);
    
    // Parse the tailwind class string into individual parts.
    // E.g., '!border-rose-300/30 shadow-[inset_0_1px_2px_rgba(251,146,60,0.2),0_10px_40px_rgba(244,114,182,0.1)] !bg-pink-100/[0.02]'
    
    // In Light mode, we adjust some global contrasts
    if (themeMode === 'light') {
      root.style.setProperty('--theme-bg-brightness', '1.1');
      root.style.setProperty('--theme-overlay-opacity', '0.05');
    } else {
      root.style.setProperty('--theme-bg-brightness', '1');
      root.style.setProperty('--theme-overlay-opacity', '0.2');
    }

    const bgMatch = currentTheme.navGlassClass?.match(/bg-([A-Za-z0-9-\/\[\]\.]+)/);
    const borderMatch = currentTheme.navGlassClass?.match(/border-([A-Za-z0-9-\/\[\]\.]+)/);
    const shadowMatch = currentTheme.navGlassClass?.match(/shadow-\[([^\]]+)\]/);
    const cardBgMatch = currentTheme.cardGlassClass?.match(/bg-([A-Za-z0-9-\/\[\]\.]+)/);
    const cardBorderMatch = currentTheme.cardGlassClass?.match(/border-([A-Za-z0-9-\/\[\]\.]+)/);
    const cardShadowMatch = currentTheme.cardGlassClass?.match(/shadow-\[([^\]]+)\]/);

    // Provide some fallback defaults
    root.style.setProperty('--theme-nav-shadow', shadowMatch ? shadowMatch[1].replace(/_/g, ' ') : 'inset 0 1px 2px rgba(255,255,255,0.1), 0 10px 40px rgba(0,0,0,0.4)');
    root.style.setProperty('--theme-card-shadow', cardShadowMatch ? cardShadowMatch[1].replace(/_/g, ' ') : '0 0 30px rgba(255,255,255,0.05)');

    // For demonstration, instead of parsing bg/border tailwind classes to raw rgba directly, we can just use the provided actual colors in THEMES object later if needed.
    // But since the setup uses generic variables now, this removes glitches.
    // The classes themselves can be removed from Daily Mastery component in favor of the shadow/border variables.
  }, [currentTheme, uiScale]);

  const handleNextCard = () => {
    if (currentCardIndex < MOCK_FLASHCARDS.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setView('dashboard');
      setCurrentCardIndex(0);
    }
  };

  const isStudying = view === 'study';
  const isDarkMode = themeMode === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const mutedTextColor = isDarkMode ? 'text-white/40' : 'text-slate-500';

  return (
    <>
      <div 
        className={`fixed inset-0 z-[100] backdrop-blur-xl transition-all duration-300 ${activeDropdown ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0, 0, 0, 0.6)' }}
        onClick={() => setActiveDropdown(null)}
      />
      <AudioPlayer url={currentTheme.ambientSoundUrl} />
      
      {/* Orientation Blocker */}
      <div id="orientation-lock" className="hidden fixed inset-0 z-[9999] bg-[#030712] flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl border-4 border-dashed border-white/20 flex items-center justify-center animate-pulse">
            <Settings className="w-10 h-10 text-white/40 rotate-90" />
        </div>
        <div className="space-y-2">
            <h2 className="text-xl font-bold text-white farsi-text">لطفاً گوشی خود را بچرخانید</h2>
            <p className="text-white/40 text-sm">Vero is designed for portrait mode only.</p>
        </div>
      </div>

      <div 
        className={`relative w-full font-sans selection:bg-white/20 transition-all duration-300 ease-in-out ${view === 'settings' ? 'min-h-screen' : 'h-screen overflow-hidden'} ${currentTheme.textClass || ''} ${(activeDropdown || isPackageSelectorOpen) ? 'scale-[0.98]' : 'scale-100'}`}
        style={{ background: 'var(--theme-gradient)', backgroundAttachment: 'fixed' }}
      >
        <div 
          className={`fixed inset-0 z-[190] backdrop-blur-[100px] transition-all duration-500 ${isPackageSelectorOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          style={{ background: 'rgba(0, 0, 0, 0.4)' }}
        />
        <div 
          className="fixed inset-0 pointer-events-none z-0"
        >
          <div 
            className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] blur-[120px] rounded-full animate-mesh opacity-50`} 
            style={{ background: 'var(--theme-glow)' }}
          />
          <BackgroundEffects themeName={currentTheme.name} />
        </div>

        {/* Main Container */}
        <div className={`relative z-10 max-w-[26.875rem] mx-auto flex flex-col pt-safe px-6 pb-20 h-full overflow-hidden`}>
          <header className={`flex items-center justify-between z-10 shrink-0 ${view === 'study' ? 'h-[10%]' : 'py-6'}`}>
            <div className="flex items-center space-x-4">
              {view === 'dashboard' ? (
                <div className="relative z-50">
                  <BioPortal
                    studyState={portalState}
                    currentTheme={currentTheme}
                  />
                </div>
              ) : view !== 'discover' ? (
                <button 
                  onClick={() => setView('dashboard')}
                  className="glass p-3 rounded-2xl border-white/20 text-white/60 hover:text-white transition-colors"
                  aria-label="Back to dashboard"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
              ) : null}
              <div className="flex flex-col text-left">
                <div 
                  className="flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
                  onClick={() => setIsProfileDrawerOpen(true)}
                >
                  <span className={`${textColor} text-lg font-semibold tracking-tight`}>
                    {view === 'discover' ? '' : 'Salman Arab'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 relative z-[150]">
              {(view === 'dashboard' || view === 'study') && (
                <button 
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  className={`p-3 glass rounded-full border border-white/20 ${isDarkMode ? 'text-white' : 'text-slate-800'} hover:bg-white/10 transition-all text-xl`}
                >
                  {showAddMenu ? <X size={20} /> : <ArrowUpDown size={20} />}
                </button>
              )}
              {view !== 'dashboard' && view !== 'study' && (
                  <button 
                    className={`p-3 glass rounded-full border border-white/20 ${isDarkMode ? 'text-white' : 'text-slate-800'} hover:bg-white/10 transition-all text-xl`}
                  >
                    <Search size={20} />
                  </button>
              )}
            </div>
          </header>

          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.main 
                key="dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col justify-around min-h-0 mt-2 py-4 gap-4 z-20"
              >
              {/* Asymmetrical Bento Grid - Dynamic Ecosystem */}
              <div 
                className="w-full h-full overflow-y-auto pb-6 scrollbar-hide pt-1 font-sans relative"
              >
                  <ReactGridLayout
                    className="layout"
                    layout={gridState}
                    cols={4}
                    rowHeight={65}
                    onLayoutChange={(newLayout: any) => setGridState(newLayout)}
                    isDraggable={false}
                    isResizable={false}
                    margin={[12, 12]}
                    containerPadding={[0, 0]}
                    compactType="vertical"
                    useCSSTransforms={true}
                  >
                    {/* Top Level: Main Vocabulary Hub */}
                    {gridState.some(l => l.i === 'vocab') && (
                      <div 
                        key="vocab"
                        className="relative rounded-[24px] border-[0.5px] border-white/10 group active:scale-95 transition-transform duration-200"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                          backdropFilter: 'blur(40px)',
                          WebkitBackdropFilter: 'blur(40px)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                        }}
                      >
                        <div
                          className="w-full h-full cursor-pointer rounded-[24px] overflow-hidden relative"
                          onClick={() => setView('study')}
                        >
                          {/* Active Package Glowing Orb */}
                          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] group-hover:bg-blue-400/30 transition-colors" />
                          
                          {/* SM-2 Curve / Chart Background */}
                          <div className="absolute inset-0 flex items-end opacity-20 pointer-events-none">
                            <svg width="100%" height="80%" viewBox="0 0 100 50" preserveAspectRatio="none">
                              <motion.path 
                                d="M0,50 Q20,40 40,30 T80,10 T100,5 L100,50 Z" 
                                fill="url(#vocabGrad)" 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                              />
                              <defs>
                                <linearGradient id="vocabGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>

                          <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
                            <div>
                              <div className="bg-blue-500/20 w-fit p-3.5 rounded-[2rem] border border-blue-500/20 shadow-sm backdrop-blur-md mb-4 group-hover:scale-110 transition-transform">
                                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                              </div>
                              <h3 className={isDarkMode ? "text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none shadow-sm" : "text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none shadow-sm"}>
                                Vocabulary Realm
                              </h3>
                              <p className="text-blue-400/60 text-[0.65rem] font-bold uppercase tracking-[0.2em] mt-2">
                                Mastering Essential Lexis
                              </p>
                            </div>
                            
                            <div className="mt-auto flex justify-start">
                              <LiquidCapsuleButton 
                                onClick={() => {
                                  setSelectorModuleId('vocab');
                                  setIsPackageSelectorOpen(true);
                                }} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Grammar Module */}
                    {gridState.some(l => l.i === 'grammar') && (
                      <div 
                        key="grammar"
                        className="relative rounded-[24px] border-[0.5px] border-white/10 group active:scale-95 transition-transform duration-200"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                          backdropFilter: 'blur(40px)',
                          WebkitBackdropFilter: 'blur(40px)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                        }}
                      >
                        <div
                          className="w-full h-full cursor-pointer rounded-[24px] overflow-hidden relative"
                          onClick={() => setView('study')}
                        >
                          {/* Ghost Progress Background */}
                          <div className="absolute inset-0 z-0 flex flex-col justify-end">
                            <motion.div 
                              className="w-full bg-emerald-500/15" 
                              initial={{ height: 0 }}
                              animate={{ height: '60%' }}
                              transition={{ duration: 1.5, ease: 'easeOut' }}
                            />
                          </div>

                          <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
                            <div>
                               <div className="bg-emerald-500/20 w-fit p-3 rounded-2xl border border-emerald-500/20 shadow-sm backdrop-blur-md mb-3">
                                <MessageSquare className="w-6 h-6 text-emerald-400" />
                              </div>
                              <h3 className={isDarkMode ? "text-xl font-bold text-white tracking-tight uppercase leading-none shadow-sm" : "text-xl font-bold text-slate-900 tracking-tight uppercase leading-none shadow-sm"}>Grammar</h3>
                            </div>
                            <div className="mt-auto">
                              <LiquidCapsuleButton 
                                onClick={() => {
                                  setSelectorModuleId('grammar');
                                  setIsPackageSelectorOpen(true);
                                }} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Listening Module */}
                    {gridState.some(l => l.i === 'listening') && (
                      <div 
                        key="listening"
                        className="relative rounded-[24px] border-[0.5px] border-white/10 group active:scale-95 transition-transform duration-200"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                          backdropFilter: 'blur(40px)',
                          WebkitBackdropFilter: 'blur(40px)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                        }}
                      >
                        <div
                          className="w-full h-full cursor-pointer rounded-[24px] overflow-hidden relative"
                          onClick={() => setView('study')}
                        >
                          {/* Soundwave background */}
                          <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-20 pointer-events-none">
                            {[...Array(12)].map((_, i) => (
                              <motion.div 
                                key={i} 
                                className="w-1.5 bg-purple-400 rounded-full"
                                style={{ height: '20%' }}
                                animate={{ height: ['20%', `${Math.random() * 60 + 20}%`, '20%'] }}
                                transition={{ repeat: Infinity, duration: 1 + Math.random() * 0.5, delay: i * 0.1 }}
                              />
                            ))}
                          </div>

                          <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
                            <div>
                              <div className="bg-purple-500/20 w-fit p-3 rounded-2xl border border-purple-500/20 shadow-sm backdrop-blur-md mb-3">
                                <Headphones className="w-6 h-6 text-purple-400" />
                              </div>
                              <h3 className={isDarkMode ? "text-xl font-bold text-white tracking-tight uppercase leading-none shadow-sm" : "text-xl font-bold text-slate-900 tracking-tight uppercase leading-none shadow-sm"}>Listening</h3>
                            </div>
                            <div className="mt-auto">
                              <LiquidCapsuleButton 
                                onClick={() => {
                                  setSelectorModuleId('listening');
                                  setIsPackageSelectorOpen(true);
                                }} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Verb Lab Module */}
                    {gridState.some(l => l.i === 'verblab') && (
                      <div 
                        key="verblab"
                        className="relative rounded-[24px] border-[0.5px] border-white/10 group active:scale-95 transition-transform duration-200"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                          backdropFilter: 'blur(40px)',
                          WebkitBackdropFilter: 'blur(40px)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                        }}
                      >
                        <div
                          className="w-full h-full cursor-pointer rounded-[24px] overflow-hidden relative"
                          onClick={() => setView('study')}
                        >
                          {/* Abstract Conjugation Background */}
                          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none flex flex-col justify-around text-pink-400 font-mono text-[0.6rem] font-bold leading-tight select-none px-2 transform -rotate-12 scale-150">
                              <motion.div animate={{ x: [0, -50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="whitespace-nowrap">
                                io parlo • tu parli • lui parla
                              </motion.div>
                              <motion.div animate={{ x: [-50, 0, -50] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="whitespace-nowrap">
                                noi parliamo • voi parlate • loro
                              </motion.div>
                              <motion.div animate={{ x: [0, -60, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="whitespace-nowrap">
                                io parlavo • tu parlavi • lui
                              </motion.div>
                              <motion.div animate={{ x: [-40, 0, -40] }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} className="whitespace-nowrap">
                                noi parlavamo • voi parlavate
                              </motion.div>
                          </div>
                          
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent group-hover:scale-110 transition-transform duration-700" />
                          
                          {/* Mercury UI Elements */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-500/10 rounded-full blur-[20px]" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-pink-400/30 border-dashed animate-[spin_10s_linear_infinite]" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-pink-400/20 animate-[spin_7s_linear_infinite_reverse]" />

                          <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between text-left">
                              <div>
                                <div className="bg-pink-500/20 w-fit p-3.5 rounded-2xl border border-pink-500/20 shadow-sm backdrop-blur-md mb-4">
                                  <FlaskConical className="w-6 h-6 text-pink-400" />
                                </div>
                                <h3 className={isDarkMode ? "text-2xl font-bold text-white tracking-tight uppercase leading-none shadow-sm" : "text-2xl font-bold text-slate-900 tracking-tight uppercase leading-none shadow-sm"}>Verb Lab</h3>
                              </div>
                              <div className="mt-auto">
                                <LiquidCapsuleButton 
                                  onClick={() => {
                                    setSelectorModuleId('verblab');
                                    setIsPackageSelectorOpen(true);
                                  }} 
                                />
                              </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stories & Texts */}
                    {gridState.some(l => l.i === 'stories') && (
                      <div 
                        key="stories"
                        className="relative rounded-[24px] border-[0.5px] border-white/10 group active:scale-95 transition-transform duration-200"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                          backdropFilter: 'blur(40px)',
                          WebkitBackdropFilter: 'blur(40px)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                        }}
                      >
                        <div
                          className="w-full h-full cursor-pointer rounded-[24px] overflow-hidden relative"
                          onClick={() => setView('study')}
                        >
                          {/* Animated Text Lines Background */}
                          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-15 pointer-events-none">
                            <motion.div className="h-1 bg-amber-500/50 rounded-full" animate={{ width: ['60%', '90%', '60%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
                            <motion.div className="h-1 bg-amber-500/50 rounded-full w-[80%]" animate={{ width: ['80%', '50%', '80%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
                            <motion.div className="h-1 bg-amber-500/50 rounded-full w-[70%]" animate={{ width: ['70%', '100%', '70%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
                          </div>

                          <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
                            <div>
                              <div className="bg-amber-500/20 w-fit p-3 rounded-2xl border border-amber-500/20 shadow-sm backdrop-blur-md mb-3">
                                <PenTool className="w-6 h-6 text-amber-400" />
                              </div>
                              <h3 className={isDarkMode ? "text-xl font-bold text-white tracking-tight uppercase leading-none shadow-sm" : "text-xl font-bold text-slate-900 tracking-tight uppercase leading-none shadow-sm"}>Stories</h3>
                            </div>
                            <div className="mt-auto">
                                <LiquidCapsuleButton 
                                  onClick={() => {
                                    setSelectorModuleId('stories');
                                    setIsPackageSelectorOpen(true);
                                  }} 
                                />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* YouTube Videos */}
                    {gridState.some(l => l.i === 'youtube') && (
                      <div 
                        key="youtube"
                        className="relative rounded-[24px] border-[0.5px] border-white/10 group active:scale-95 transition-transform duration-200"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                          backdropFilter: 'blur(40px)',
                          WebkitBackdropFilter: 'blur(40px)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                        }}
                      >
                        <div
                          className="w-full h-full cursor-pointer rounded-[24px] overflow-hidden relative"
                          onClick={() => setView('study')}
                        >
                          {/* YouTube Red Play Button Background Decor */}
                          <div className="absolute -bottom-6 -right-6 opacity-20 pointer-events-none">
                            <motion.div 
                              animate={{ scale: [1, 1.1, 1] }} 
                              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <Youtube className="w-32 h-32 text-red-500" />
                            </motion.div>
                          </div>

                          <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
                            <div>
                               <div className="bg-red-500/20 w-fit p-3 rounded-2xl border border-red-500/20 shadow-sm backdrop-blur-md mb-3">
                                <Youtube className="w-6 h-6 text-red-400" />
                              </div>
                              <h3 className={isDarkMode ? "text-xl font-bold text-white tracking-tight uppercase leading-none shadow-sm" : "text-xl font-bold text-slate-900 tracking-tight uppercase leading-none shadow-sm"}>YouTube</h3>
                            </div>
                            <div className="mt-auto">
                                <LiquidCapsuleButton 
                                  onClick={() => {
                                    setSelectorModuleId('youtube');
                                    setIsPackageSelectorOpen(true);
                                  }} 
                                />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Smart Library */}
                    {gridState.some(l => l.i === 'smartlib') && (
                      <div 
                        key="smartlib"
                        className="relative rounded-[24px] border-[0.5px] border-white/10 group active:scale-95 transition-transform duration-200"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                          backdropFilter: 'blur(40px)',
                          WebkitBackdropFilter: 'blur(40px)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                        }}
                      >
                        <div
                          className="w-full h-full cursor-pointer rounded-[24px] overflow-hidden relative"
                          onClick={() => setView('study')}
                        >
                          {/* Glass Shelves Background */}
                          <div className="absolute inset-0 flex flex-col justify-center gap-6 opacity-30 pointer-events-none px-4">
                            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent relative">
                              {/* Glowing Book on Shelf - Active */}
                              <div className="absolute bottom-0 left-[20%] w-6 h-12 bg-cyan-400/40 rounded-sm shadow-[0_0_15px_rgba(34,211,238,0.5)] border-[0.5px] border-cyan-300/50 transform -skew-x-6" />
                              <div className="absolute bottom-0 left-[30%] w-4 h-[2.8rem] bg-indigo-400/20 rounded-sm border-[0.5px] border-white/10" />
                              <div className="absolute bottom-0 left-[35%] w-5 h-[3.2rem] bg-fuchsia-400/20 rounded-sm border-[0.5px] border-white/10" />
                            </div>
                            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent relative">
                              <div className="absolute bottom-0 right-[25%] w-5 h-12 bg-teal-400/20 rounded-sm border-[0.5px] border-white/10" />
                              <div className="absolute bottom-0 right-[15%] w-6 h-10 bg-blue-400/20 rounded-sm border-[0.5px] border-white/10 transform skew-x-6" />
                            </div>
                          </div>

                          <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
                            <div>
                              <div className="bg-cyan-500/20 w-fit p-3.5 rounded-2xl border border-cyan-500/20 shadow-sm backdrop-blur-md mb-4">
                                <Library className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                              </div>
                              <h3 className={isDarkMode ? "text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none shadow-sm" : "text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none shadow-sm"}>
                                Smart Library
                              </h3>
                            </div>
                            
                            <div className="mt-auto">
                                <LiquidCapsuleButton 
                                  onClick={() => {
                                    setSelectorModuleId('smartlib');
                                    setIsPackageSelectorOpen(true);
                                  }} 
                                />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </ReactGridLayout>
              </div>
            </motion.main>
          )}

            {view === 'discover' && (
              <motion.main
                key="discover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex-1 min-h-0 mt-2 py-4 z-20"
              >
                <Discovery 
                  onAddPackage={handleDiscoveryAdd} 
                  activePackageIds={gridState.map(l => l.i)}
                  themeColor={discoveryThemeColor}
                  setThemeColor={setDiscoveryThemeColor}
                  isDarkMode={themeMode === 'dark'}
                />
              </motion.main>
            )}

            {view === 'dictionary' && (
              <motion.main
                key="dictionary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex-1 min-h-0 mt-2 z-20 flex flex-col"
              >
                <Dictionary isDarkMode={isDarkMode} />
              </motion.main>
            )}

            {view === 'study' && (
              <motion.main 
                key="study-mode"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="h-[90%] flex flex-col items-center"
              >
                <div className="w-full flex justify-center items-center flex-1 min-h-0">
                  {MOCK_FLASHCARDS[currentCardIndex] ? (
                    <Flashcard 
                      key={MOCK_FLASHCARDS[currentCardIndex].id} 
                      data={MOCK_FLASHCARDS[currentCardIndex]} 
                      onAnswer={handleAnswer}
                    />
                  ) : (
                    <div className="text-white/20">Card not found</div>
                  )}
                </div>
              </motion.main>
            )}

            {view === 'salotto' && (
              <motion.main
                key="salotto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex-1 min-h-0 mt-2 z-20 flex flex-col items-center justify-center"
              >
                <div className={`text-center ${textColor}`}>
                  <h2 className="text-2xl font-bold mb-2">Il Salotto</h2>
                  <p className="opacity-60 text-sm">Community Forum coming soon.</p>
                </div>
              </motion.main>
            )}
          </AnimatePresence>
          {/* High-functional floating pill navigation */}
          <BottomNav 
            view={view as any} 
            setView={setView as any} 
            portalState={portalState}
            currentTheme={currentTheme}
            discoveryThemeColor={discoveryThemeColor}
            isDarkMode={themeMode === 'dark'}
            onOpenLab={() => setIsLabOpen(true)}
          />
        </div>
        <AddMenu 
          isOpen={showAddMenu} 
          onClose={() => setShowAddMenu(false)} 
          activeIds={gridState.map(l => l.i)}
          onToggle={handleToggleModule}
        />

        <PackageSelectorDrawer
          isOpen={isPackageSelectorOpen}
          onClose={() => setIsPackageSelectorOpen(false)}
          moduleId={selectorModuleId}
          selectedPackageId={selectorModuleId ? selectedPackages[selectorModuleId] : ''}
          onSelect={(pkgId) => selectorModuleId && handlePackageSelect(selectorModuleId, pkgId)}
        />

        <UserProfileDrawer
          isOpen={isProfileDrawerOpen}
          onClose={() => setIsProfileDrawerOpen(false)}
          isDarkMode={themeMode === 'dark'}
          uiScale={uiScale} 
          setUiScale={setUiScale} 
          themeMode={themeMode}
          setThemeMode={(mode) => {
            setThemeMode(mode);
            const compatibleTheme = THEMES.find(t => t.mode === mode);
            if (compatibleTheme) setCurrentTheme(compatibleTheme);
          }}
          dailyGoal={dailyGoal}
          setDailyGoal={setDailyGoal}
        />

        <LaboratorioOverlay 
          isOpen={isLabOpen} 
          onClose={() => setIsLabOpen(false)} 
          isDarkMode={themeMode === 'dark'} 
        />

        {/* Global Particle Animation */}
        <AnimatePresence>
          {particleAnimation && (
            <motion.div
              initial={{ x: particleAnimation.x - 20, y: particleAnimation.y - 20, opacity: 1, scale: 1 }}
              animate={{ 
                x: window.innerWidth / 2 - 20, 
                y: window.innerHeight - 80, 
                opacity: [1, 0.8, 0], 
                scale: [1, 1.5, 0.2],
                filter: ['blur(0px)', 'blur(5px)', 'blur(20px)']
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[9999] w-10 h-10 rounded-2xl pointer-events-none flex items-center justify-center border border-white/30 backdrop-blur-3xl"
              style={{ 
                background: `linear-gradient(135deg, ${particleAnimation.color}80, ${particleAnimation.color}20)`,
                boxShadow: `0 0 40px ${particleAnimation.color}60`
              }}
            >
               <Zap className="w-5 h-5 text-white" />
               <motion.div 
                 className="absolute inset-0 rounded-2xl"
                 animate={{ opacity: [0, 1, 0], scale: [1, 2, 2.5] }}
                 transition={{ duration: 1, repeat: Infinity }}
                 style={{ border: `2px solid ${particleAnimation.color}` }}
               />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

