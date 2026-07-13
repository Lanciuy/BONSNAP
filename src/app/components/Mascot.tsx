import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import img1 from "../../imports/image-1.png";
import img2 from "../../imports/image-2.png";
import img3 from "../../imports/image-3.png";
import img4 from "../../imports/image-4.png";
import img5 from "../../imports/image-5.png";
import img6 from "../../imports/image-6.png";
import img7 from "../../imports/image-7.png";
import img8 from "../../imports/image-8.png";
import img9 from "../../imports/image-9.png";
import { ThemeState } from '../App';

export type MascotMood = "happy" | "surprised" | "sad" | "wink" | "cute" | "thinking" | "excited" | "neutral" | "alert" | "confused" | "love" | "angry" | "sleepy" | "cool" | "shy" | "laughing" | "scared" | "smug";

interface MascotProps {
  mood: MascotMood;
  message?: string;
  showDialogue?: boolean;
  theme: ThemeState;
  placement?: "default" | "top" | "bottom" | "left" | "right";
}

export const moodMap: Record<MascotMood, string> = {
  happy: img1,
  surprised: img2,
  sad: img3,
  wink: img4,
  cute: img5,
  thinking: img6,
  excited: img7,
  neutral: img8,
  alert: img9,
  confused: img6,
  love: img5,
  angry: img3,
  sleepy: img8,
  cool: img1,
  shy: img4,
  laughing: img7,
  scared: img2,
  smug: img1,
};

export const getGeneratedMascotUrl = (mood: MascotMood, theme: ThemeState) => {
  if (theme === "mecha") {
    const botSeedMap: Record<string, string> = { 
      happy: "GundamMax", surprised: "GundamAlert", sad: "GundamLow", 
      wink: "GundamReady", cute: "GundamIdle", thinking: "GundamCalc",
      excited: "GundamMax", neutral: "GundamIdle", alert: "GundamAlert",
      confused: "GundamError", love: "GundamHeart", angry: "GundamRage",
      sleepy: "GundamSleep", cool: "GundamPrime", shy: "GundamHide",
      laughing: "GundamJoy", scared: "GundamFear", smug: "GundamBoss"
    };
    return `https://api.dicebear.com/9.x/bottts/svg?seed=${botSeedMap[mood]}&backgroundColor=transparent&baseColor=f8fafc&primaryColor=ef4444,3b82f6`;
  }
  
  // Gen Z Waifu
  const seedMap: Record<MascotMood, string> = {
    happy: "Lily", surprised: "Mia", sad: "Zoe", wink: "Chloe",
    cute: "Ruby", thinking: "Luna", excited: "Stella", neutral: "Leo", alert: "Aria",
    confused: "Nala", love: "Bella", angry: "Max",
    sleepy: "Milo", cool: "Felix", shy: "Daisy",
    laughing: "Coco", scared: "Lola", smug: "Charlie"
  };
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${seedMap[mood]}&backgroundColor=transparent`;
};

export const Mascot: React.FC<MascotProps> = ({ mood, message = "", showDialogue = true, theme, placement = "default" }) => {
  const [displayedText, setDisplayedText] = useState("");

  const getInitialAnimation = () => {
    switch (placement) {
      case "top": return { y: -50, opacity: 0 };
      case "bottom": return { y: 50, opacity: 0 };
      case "left": return { x: -50, opacity: 0 };
      case "right": return { x: 50, opacity: 0 };
      default: return { scale: 0.95, opacity: 0 };
    }
  };

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < message.length) {
        setDisplayedText((prev) => prev + message.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [message]);

  const isOriginal = theme === "original";
  const avatarUrl = isOriginal ? moodMap[mood] || img1 : getGeneratedMascotUrl(mood, theme);
  const mascotName = theme === "mecha" ? "G-UNIT 01 🤖" : "Bon-chan 🌸";

  return (
    <div className="absolute bottom-24 left-0 w-full z-50 pointer-events-none px-4 flex flex-col items-end">
      <motion.div 
        drag 
        dragConstraints={{ left: -300, right: 0, top: -600, bottom: 50 }}
        dragElastic={0.2}
        initial={getInitialAnimation()}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className="pointer-events-auto flex flex-col items-end cursor-grab active:cursor-grabbing w-full max-w-[90%]"
      >
        {/* Mascot Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mood + theme}
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative z-10 drop-shadow-2xl ${isOriginal ? 'w-32 h-32 mr-[-10px] mb-[-15px]' : 'w-24 h-24 mr-2 mb-[-10px]'}`}
          >
            <img 
              src={avatarUrl} 
              alt="Mascot" 
              className={`w-full h-full object-contain filter pointer-events-none ${theme === 'mecha' ? 'drop-shadow-[0_10px_15px_rgba(59,130,246,0.5)]' : 'drop-shadow-[0_10px_15px_rgba(244,114,182,0.5)]'}`} 
            />
          </motion.div>
        </AnimatePresence>

        {/* Visual Novel Dialogue Box */}
        <AnimatePresence>
          {showDialogue && message && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`w-full bg-white/95 backdrop-blur-xl border-[2px] rounded-[20px] p-3 relative ${theme === 'mecha' ? 'border-blue-200 shadow-[0_15px_40px_rgba(59,130,246,0.2)]' : 'border-pink-200 shadow-[0_15px_40px_rgba(244,114,182,0.2)]'}`}
            >
              {/* Name Tag */}
              <div className={`absolute -top-3 left-4 text-white font-black px-3 py-0.5 rounded-full text-[9px] uppercase tracking-wider shadow-lg border-[2px] border-white ${theme === 'mecha' ? 'bg-gradient-to-r from-blue-500 to-red-500' : 'bg-gradient-to-r from-pink-400 to-purple-400'}`}>
                {mascotName}
              </div>
              <p className="text-slate-700 font-bold text-xs leading-relaxed min-h-[36px]">
                {displayedText}
                <span className={`animate-pulse ml-1 ${theme === 'mecha' ? 'text-blue-500' : 'text-pink-400'}`}>▼</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};