import React from "react";
import { motion } from "motion/react";
import { Sparkles, Camera } from "lucide-react";
import { ThemeState } from '../../../core/entities';
import img1 from "../../../imports/image-1.png";

interface SplashViewProps {
  theme: ThemeState;
}

export const SplashView: React.FC<SplashViewProps> = ({ theme }) => {
  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-indigo-500 to-purple-600 text-white">
      {/* Background elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] pointer-events-none" 
      />
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative w-32 h-32 bg-white/20 backdrop-blur-xl border-[4px] border-white rounded-[32px] flex items-center justify-center mb-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden">
          <img src={img1} alt="Logo" className="w-full h-full object-contain scale-[1.3] pt-4 z-10 relative" />
          
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-pink-400 mix-blend-overlay z-20"
          />
        </div>
        
        <h1 className="text-[48px] font-black tracking-tighter mb-2 text-center leading-none drop-shadow-lg">BonSnap</h1>
        <div className="flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/40">
          <Sparkles size={16} />
          <span className="text-[13px] font-bold tracking-widest uppercase">Initializing Magic...</span>
        </div>
      </motion.div>
      
      {/* Loading bar */}
      <div className="absolute bottom-20 w-48 h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full bg-white rounded-full"
        />
      </div>
    </div>
  );
};
