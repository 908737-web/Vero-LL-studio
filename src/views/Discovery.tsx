import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BookOpen, Map, Headphones, Sparkles, Plus, Check, ChevronUp, Filter, Search } from 'lucide-react';
import { DiscoveryTile } from '../components/DiscoveryTile';
import { CinematicBackground } from '../components/CinematicBackground';

interface Package {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  image: string;
  video: string;
  color: string;
  size: 'large' | 'medium' | 'vertical' | 'small';
  packages: Package[];
}

const CATEGORIES: Category[] = [
  {
    id: 'vocab',
    title: 'Vocabulary Realm',
    subtitle: 'VENETIAN GLASS',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee2887a35f?auto=format&fit=crop&q=80&w=1000',
    video: 'https://cdn.pixabay.com/video/2016/09/21/5412-183786499_tiny.mp4', 
    color: '#3b82f6',
    size: 'large',
    packages: [
      { id: 'top100', title: 'Essential 100 Words', description: 'Master the foundations of Venetian survival.', icon: BookOpen, color: '#3b82f6' },
      { id: 'kitchen', title: 'Maritime Slang', description: 'Speak like the ancient Lagoon explorers.', icon: BookOpen, color: '#3b82f6' },
      { id: 'poetry', title: 'Lyric Expressions', description: 'The romantic tongue of the canals.', icon: BookOpen, color: '#3b82f6' },
    ]
  },
  {
    id: 'grammar',
    title: 'Grammar Quest',
    subtitle: 'LAGOON WHISPERS',
    icon: Map,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1000',
    video: 'https://cdn.pixabay.com/video/2021/08/11/84683-587212450_large.mp4', 
    color: '#10b981',
    size: 'medium',
    packages: [
      { id: 'congiuntivo', title: 'The Subjunctive Seal', description: 'Express desires in the city of masks.', icon: Map, color: '#10b981' }
    ]
  },
  {
    id: 'media',
    title: 'Media Archive',
    subtitle: 'CANALSIDE AUDIO',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c17?auto=format&fit=crop&q=80&w=1000',
    video: 'https://cdn.pixabay.com/video/2023/11/14/188981-884841968_large.mp4',
    color: '#8b5cf6',
    size: 'vertical',
    packages: [
      { id: 'podcast', title: 'Echoes of Venice', description: 'Tales from the Rialto Bridge.', icon: Headphones, color: '#8b5cf6' }
    ]
  },
  {
    id: 'culture',
    title: 'Heritage Nuggets',
    subtitle: 'NICHES OF HISTORY',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1516483642781-71dbad03d46f?auto=format&fit=crop&q=80&w=1000',
    video: 'https://cdn.pixabay.com/video/2019/04/17/22880-331580175_large.mp4',
    color: '#f59e0b',
    size: 'small',
    packages: [
      { id: 'gestures', title: 'Mask Etiquette', description: 'Unspoken rules of the Carnival.', icon: Sparkles, color: '#f59e0b' },
      { id: 'gondola', title: 'Gondola Code', description: 'Traditional calls and row patterns.', icon: Sparkles, color: '#10b981' }
    ]
  }
];

interface DiscoveryProps {
  onAddPackage: (pkg: Package, coords?: { x: number, y: number }) => void;
  activePackageIds: string[];
  themeColor: string;
  setThemeColor: (color: string) => void;
  isDarkMode?: boolean;
}

const PackageCardButton: React.FC<{ isActive: boolean, onAddPackage: (pkg: Package, coords?: { x: number, y: number }) => void, pkg: Package, isDarkMode: boolean }> = ({ isActive, onAddPackage, pkg, isDarkMode }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActive) return;
    setIsAnimating(true);
    setTimeout(() => {
      onAddPackage(pkg, { x: e.clientX, y: e.clientY });
      setIsAnimating(false);
    }, 400); // match animation duration
  };

  return (
    <button
      onClick={handleClick}
      disabled={isActive || isAnimating}
      className={`w-[65px] h-[20px] rounded-xl font-bold text-[10px] tracking-wider transition-all border flex items-center justify-center gap-1 overflow-hidden relative ${
        isActive 
          ? isDarkMode ? 'bg-white/5 border-white/5 text-white/20' : 'bg-black/5 border-black/5 text-black/20'
          : isDarkMode 
            ? 'bg-blue-500/20 border-blue-500/30 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
            : 'bg-white/40 border-white/50 text-blue-600 shadow-sm hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
      <AnimatePresence mode="wait">
        {isAnimating && (
          <motion.div 
            className="absolute inset-0 bg-white/40 z-0"
            initial={{ x: '-100%', skewX: -20 }}
            animate={{ x: '100%', skewX: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      <span className="relative flex items-center justify-center gap-1 z-10 w-full h-full pointer-events-none">
      {isActive ? (
        <>
          <Check size={10} strokeWidth={2.5} />
          <span>ADDED</span>
        </>
      ) : (
        <>
          <Plus size={10} strokeWidth={2.5} />
          <span>GET</span>
        </>
      )}
      </span>
    </button>
  );
};

const PackageCard: React.FC<{ pkg: Package, isActive: boolean, onAddPackage: (pkg: Package, coords?: { x: number, y: number }) => void, themeColor: string, isDarkMode: boolean }> = ({ pkg, isActive, onAddPackage, themeColor, isDarkMode }) => {
  return (
    <div
      className="relative p-4 rounded-[24px] border border-white/20 flex flex-col gap-1.5 overflow-hidden w-[275px] h-[95px] shrink-0 shadow-md"
      style={{ 
        background: isDarkMode 
          ? `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)`
          : `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)`, 
        backdropFilter: `blur(25px)`,
        WebkitBackdropFilter: `blur(25px)`,
        boxShadow: `0 10px 25px -5px ${themeColor}${isDarkMode ? '20' : '30'}, 0 5px 10px -5px rgba(255,255,255,0.1)`,
        borderColor: isDarkMode ? `rgba(255, 255, 255, 0.15)` : `rgba(255, 255, 255, 0.3)`
      }}
    >
      <div className="flex items-center justify-between pointer-events-none">
         <div className="flex items-center gap-1.5 relative z-10 w-full pr-5">
           <div className="p-0 border-0 shrink-0 opacity-80" style={{ color: pkg.color || '#fff' }}>
             <pkg.icon size={16} strokeWidth={1.5} />
           </div>
           <h4 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-bold text-[13px] tracking-tight leading-tight`}>{pkg.title}</h4>
         </div>
      </div>
      
      <div className={`${isDarkMode ? 'text-white/60' : 'text-slate-700/70'} text-[11px] font-medium leading-relaxed mt-1 flex-1`}>
        {pkg.description}
      </div>
      
      <div className="flex justify-end mt-1 relative z-10">
         <PackageCardButton isActive={isActive} onAddPackage={onAddPackage} pkg={pkg} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

const PackageStack3D: React.FC<{ title: string, data: Package[], onAddPackage: (pkg: Package, coords?: { x: number, y: number }) => void, activePackageIds: string[], themeColor: string, isDarkMode: boolean }> = ({ title, data, onAddPackage, activePackageIds, themeColor, isDarkMode }) => {
  return (
    <div className="w-full">
      <h3 className={`px-6 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} tracking-tight mb-4`}>{title}</h3>
      <div className="relative w-full h-[150px] px-6">
        {data.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={false}
            animate={{ 
              scale: 1 - (i * 0.04), 
              y: i * 12,
              rotate: i > 0 ? (i % 2 === 0 ? 1.5 : -1.5) : 0,
              zIndex: data.length - i 
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="absolute left-6 origin-bottom"
          >
            <PackageCard 
              pkg={pkg} 
              isActive={activePackageIds.includes(pkg.id)}
              onAddPackage={onAddPackage}
              themeColor={themeColor}
              isDarkMode={isDarkMode}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CategoryDetailView: React.FC<{ category: Category, onBack: () => void, onAddPackage: (pkg: Package, coords?: { x: number, y: number }) => void, activePackageIds: string[], themeColor: string, isDarkMode: boolean }> = ({ category, onBack, onAddPackage, activePackageIds, themeColor, isDarkMode }) => {
  const allPackages = category.packages;
  const usefulPhrases = allPackages.length > 1 ? [...allPackages].reverse() : allPackages;
  const communityFavs = allPackages.length > 0 ? [...allPackages, ...allPackages].slice(0, 3) : allPackages;
  
  return (
    <motion.div
      key="category-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex flex-col bg-transparent"
    >
      <div className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide relative">
        <header className="px-6 pt-12 pb-8 flex flex-col gap-6 items-center">
            {/* Search Capsule */}
            <div className={`h-10 w-4/5 rounded-full border border-white/10 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center px-4 backdrop-blur-xl`}>
              <Search className={`w-4 h-4 ${isDarkMode ? 'text-white/30' : 'text-black/30'}`} />
              <input 
                className={`bg-transparent border-none ml-2 w-full text-sm placeholder:${isDarkMode ? 'text-white/20' : 'text-black/20'} ${isDarkMode ? 'text-white' : 'text-black'}`} 
                placeholder="Search in Venetian glasses..." 
              />
            </div>
            
            {/* Title */}
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} text-center`}>Vocabulary Realm</h2>
        </header>

        <div className="space-y-16 pb-32">
          <PackageStack3D 
            title="Top Picks" 
            data={allPackages} 
            onAddPackage={onAddPackage}
            activePackageIds={activePackageIds}
            themeColor={themeColor}
            isDarkMode={isDarkMode}
          />
          <PackageStack3D 
            title="Community Favorites" 
            data={communityFavs} 
            onAddPackage={onAddPackage}
            activePackageIds={activePackageIds}
            themeColor={themeColor}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const Discovery: React.FC<DiscoveryProps> = ({ onAddPackage, activePackageIds, themeColor, setThemeColor, isDarkMode = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setThemeColor(cat.color);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setThemeColor('');
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <CinematicBackground 
        videoUrl={selectedCategory?.video} 
        isActive={!!selectedCategory} 
        themeColor={themeColor} 
        isDarkMode={isDarkMode}
      />

      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full h-full p-4 grid grid-cols-2 auto-rows-[160px] gap-4 pb-24 overflow-y-auto scrollbar-hide"
          >
            {CATEGORIES.map((cat) => (
              <DiscoveryTile
                key={cat.id}
                {...cat}
                onClick={() => handleCategorySelect(cat)}
              />
            ))}
          </motion.div>
        ) : (
          <CategoryDetailView
            category={selectedCategory}
            onBack={handleBack}
            onAddPackage={onAddPackage}
            activePackageIds={activePackageIds}
            themeColor={themeColor}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
