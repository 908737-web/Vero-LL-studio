import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check, Lock, Play } from "lucide-react";
import { DynamicHomeBar } from "../components/DynamicHomeBar";

interface Lesson {
  id: string;
  title: string;
  topic: string;
  progress: number; // 0 to 100
  status: "locked" | "available" | "completed";
  color: string;
}

const DUMMY_LESSONS: Lesson[] = [
  {
    id: "1",
    title: "Present Simple",
    topic: "Foundation",
    progress: 100,
    status: "completed",
    color: "#10b981",
  }, // Emerald
  {
    id: "2",
    title: "Present Continuous",
    topic: "Action in Progress",
    progress: 65,
    status: "available",
    color: "#fbbf24",
  }, // Amber
  {
    id: "3",
    title: "Past Simple",
    topic: "Time Travel",
    progress: 0,
    status: "locked",
    color: "#8b5cf6",
  }, // Violet
  {
    id: "4",
    title: "Present Perfect",
    topic: "Life Experience",
    progress: 0,
    status: "locked",
    color: "#f43f5e",
  }, // Rose
  {
    id: "5",
    title: "Future Forms",
    topic: "Prediction",
    progress: 0,
    status: "locked",
    color: "#3b82f6",
  }, // Blue
];

interface GrammarStudyViewProps {
  onBack: () => void;
  isDarkMode: boolean;
}

export const GrammarStudyView: React.FC<GrammarStudyViewProps> = ({
  onBack,
  isDarkMode,
}) => {
  const [activeIndex, setActiveIndex] = useState(1); // Start at the first available (index 1)

  // Handle Swipe/Scroll (simplified with buttons or drag for now)
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipeThreshold = 50;
    if (offset.y < -swipeThreshold && activeIndex < DUMMY_LESSONS.length - 1) {
      // Swipe Up (next)
      setActiveIndex(activeIndex + 1);
    } else if (offset.y > swipeThreshold && activeIndex > 0) {
      // Swipe Down (prev)
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden flex flex-col ${isDarkMode ? "bg-[#030712]" : "bg-slate-50"}`}
    >
      <div className="absolute inset-0 w-full max-w-[26.875rem] mx-auto relative h-full flex flex-col">
        {/* Dynamic Cinematic Background based on active lesson color */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: `${DUMMY_LESSONS[activeIndex].color}05` }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full blur-[120px] opacity-20 transition-all duration-1000"
            style={{ backgroundColor: DUMMY_LESSONS[activeIndex].color }}
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* Floating Top Elements */}
        <div className="absolute top-0 left-0 right-0 w-full pt-8 px-3 pointer-events-none z-[150] flex justify-center items-start">
          <div className="text-center pointer-events-auto">
            <h2
              className={`text-sm font-bold tracking-widest uppercase ${isDarkMode ? "text-white/80" : "text-slate-500"}`}
            >
              Mastery Path
            </h2>
            <p
              className={`text-xs ${isDarkMode ? "text-white/50" : "text-slate-400"}`}
            >
              Grammar Foundations
            </p>
          </div>
        </div>

        {/* Z-Axis Depth Journey Container */}
        <div className="relative z-10 flex-1 flex items-center justify-center perspective-[1200px]">
          {/* Track / Context Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-0" />

          <div className="relative w-full h-[60%] flex items-center justify-center preserve-3d">
            <AnimatePresence>
              {DUMMY_LESSONS.map((lesson, idx) => {
                // Calculate relative position to active index
                const distance = idx - activeIndex;

                // Only render a few cards around the active one for performance
                if (Math.abs(distance) > 3) return null;

                // Z-Axis Depth Maths
                // Active card: scale 1, y: 0, z: 0, opacity: 1, blur: 0
                // Next cards (distance > 0): move down (y), scale down, move back (z), opacity down, blur up
                // Prev cards (distance < 0): move up (y), scale down, move back (z), opacity down, blur up

                const yOffset = distance * 80; // Distance in pixels
                const zOffset = -Math.abs(distance) * 150;
                const scale = 1 - Math.abs(distance) * 0.15;
                const opacity =
                  distance === 0
                    ? 1
                    : Math.max(0, 1 - Math.abs(distance) * 0.4);
                const blur = Math.abs(distance) * 8;

                const isActive = distance === 0;

                return (
                  <motion.div
                    key={lesson.id}
                    className="absolute left-0 right-0 mx-auto w-[85%] max-w-[340px] h-[160px] flex items-center justify-center cursor-grab active:cursor-grabbing"
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    onDragEnd={handleDragEnd}
                    initial={false}
                    animate={{
                      y: yOffset,
                      z: zOffset,
                      scale: scale,
                      opacity: opacity,
                      filter: `blur(${blur}px)`,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    style={{
                      transformOrigin: "center center",
                      zIndex: 50 - Math.abs(distance),
                    }}
                    onClick={() => {
                      if (!isActive) setActiveIndex(idx);
                    }}
                  >
                    {/* The Glass Vial Concept */}
                    <div className="relative w-full h-full rounded-[32px] p-1 glass border border-white/20 overflow-hidden shadow-2xl">
                      {/* Glass Surface Base */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[32px] backdrop-blur-xl" />

                      {/* Liquid Fluidity Fill Effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 rounded-b-[30px] opacity-80"
                        initial={{ height: 0 }}
                        animate={{ height: `${lesson.progress}%` }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut",
                          delay: isActive ? 0.3 : 0,
                        }}
                        style={{
                          background: `linear-gradient(to top, ${lesson.color}80, ${lesson.color}20)`,
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        {/* Fluid Surface highlight */}
                        <div
                          className="absolute top-0 inset-x-0 h-[2px] bg-white/40 shadow-[0_0_10px_currentColor]"
                          style={{ color: lesson.color }}
                        />

                        {/* Subdued animated particles/bubbles inside liquid could go here */}
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] font-bold tracking-wider uppercase text-white/60 mb-1">
                              {lesson.topic}
                            </p>
                            <h3
                              className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}
                            >
                              {lesson.title}
                            </h3>
                          </div>

                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center glass border border-white/20 shadow-lg shrink-0`}
                            style={{
                              backgroundColor:
                                lesson.status === "completed"
                                  ? `${lesson.color}40`
                                  : "transparent",
                            }}
                          >
                            {lesson.status === "completed" ? (
                              <Check size={20} className="text-white" />
                            ) : lesson.status === "locked" ? (
                              <Lock size={18} className="text-white/40" />
                            ) : (
                              <Play size={18} className="text-white ml-1" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-800"}`}
                            >
                              {lesson.progress}%
                            </span>
                            <span className="text-xs text-white/50">
                              Fluidity
                            </span>
                          </div>

                          {isActive && lesson.status !== "locked" && (
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="px-3 py-2 rounded-full text-sm font-bold shadow-lg"
                              style={{
                                backgroundColor: lesson.color,
                                color: isDarkMode ? "#000" : "#fff",
                              }}
                            >
                              {lesson.status === "completed"
                                ? "Review"
                                : "Immerse"}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
