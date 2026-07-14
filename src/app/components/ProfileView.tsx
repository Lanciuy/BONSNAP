import React, { useState } from "react";
import { Camera, PieChart, Home, ReceiptText, User, ChevronLeft, MapPin, GraduationCap, Link2, Sparkles, Trophy, Scan, ShieldCheck, LogOut, Lock, Palette } from "lucide-react";
import { Mascot, MascotMood } from "./Mascot";
import { ThemeState, Inventory } from '../App';
import { motion } from "motion/react";

interface ProfileViewProps {
  onGoToCamera: () => void;
  onGoToDashboard: () => void;
  theme: ThemeState;
  onNavigate: (view: string) => void;
  points: number;
  level: number;
  inventory: Inventory;
  setInventory: React.Dispatch<React.SetStateAction<Inventory>>;
  setTheme: (theme: ThemeState) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// Customization Options
const BANNER_OPTIONS = [
  { id: 'default', name: 'Default', bg: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400' },
  { id: 'neon', name: 'Neon City', bg: 'bg-gradient-to-r from-fuchsia-600 to-pink-600' },
  { id: 'holographic', name: 'Holographic', bg: 'bg-gradient-to-tr from-emerald-400 via-cyan-400 to-blue-500' },
  { id: 'dark', name: 'Dark Mode', bg: 'bg-gradient-to-br from-slate-800 to-slate-900' }
];

const FRAME_OPTIONS = [
  { id: 'none', name: 'None', class: 'border-4 border-white' },
  { id: 'gold', name: 'Gold VIP', class: 'border-[6px] border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]' },
  { id: 'neon', name: 'Cyber Neon', class: 'border-[6px] border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]' },
  { id: 'flame', name: 'Hot Streak', class: 'border-[6px] border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.7)]' },
  { id: 'stardust', name: 'Stardust Effect', class: 'border-4 border-transparent', imageUrl: '/gifs/Stardust.gif' }
];

export const ProfileView: React.FC<ProfileViewProps> = ({ onGoToCamera, onGoToDashboard, theme, onNavigate, points, level, inventory }) => {
  const [mood, setMood] = useState<MascotMood>("happy");
  const [msg, setMsg] = useState("Profil lo udah cakep banget bestie! 💅");
  
  // Customization State
  const [activeBanner, setActiveBanner] = useState(BANNER_OPTIONS[0]);
  const [activeFrame, setActiveFrame] = useState(FRAME_OPTIONS[1]);

  const isMecha = theme === "mecha";

  const handleSelectBanner = (opt: typeof BANNER_OPTIONS[0]) => {
    if (inventory.banners.includes(opt.id)) {
      setActiveBanner(opt);
      setMood("cute"); setMsg(`Wah, banner ${opt.name} kelihatan keren banget! ✨`);
    } else {
      setMood("alert"); setMsg(`Ups, banner ${opt.name} belum kebuka. Beli dulu di Rewards Hub! 🛍️`);
      onNavigate('rewards');
    }
  };

  const handleSelectFrame = (opt: typeof FRAME_OPTIONS[0]) => {
    if (inventory.frames.includes(opt.id)) {
      setActiveFrame(opt);
      setMood("excited"); setMsg(`Frame ${opt.name} bikin foto profil lo makin bersinar! 👑`);
    } else {
      setMood("alert"); setMsg(`Ups, frame ${opt.name} masih dikunci. Beli dulu pakai poin! 🛍️`);
      onNavigate('rewards');
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col ${isMecha ? 'bg-slate-900 text-white' : 'bg-[#fdfbfb] text-slate-800'}`}>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-top opacity-30"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-[280px]">
        {/* Dynamic Banner Hero */}
        <div className={`relative h-48 w-full transition-all duration-500 ${activeBanner.bg}`}>
          {/* Header Actions */}
          <div className="absolute top-0 left-0 w-full px-6 pt-12 pb-4 flex items-center justify-between z-20">
            <button onClick={onGoToDashboard} className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md bg-white/30 border border-white/50 text-white hover:bg-white/50 transition-colors">
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md bg-white/30 border border-white/50 text-white hover:bg-white/50 transition-colors">
              <LogOut size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Avatar & Badges */}
          <div className="absolute -bottom-14 left-6 z-20 flex items-end gap-4">
            <div className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 ${activeFrame.class}`}>
              {/* Outer GIF layer if available */}
              {activeFrame.imageUrl && (
                <div 
                  className="absolute inset-0 z-30 rounded-full pointer-events-none scale-125 mix-blend-screen opacity-80"
                  style={{ backgroundImage: `url(${activeFrame.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              )}
              {/* Actual Avatar */}
              <div className="w-full h-full rounded-full overflow-hidden bg-white relative z-10 border-2 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="px-6 pt-16 pb-6">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
            
            {/* Bio Info */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className={`text-2xl font-black tracking-tight ${isMecha ? 'text-white' : 'text-slate-800'}`}>Sarah Jenkins</h1>
                <ShieldCheck size={20} className="text-blue-500 fill-blue-100" />
              </div>
              <p className={`font-bold font-mono text-sm tracking-wide ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>@sarahj.str</p>
              
              <div className="flex items-center gap-4 mt-3 text-sm font-bold">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isMecha ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                  <GraduationCap size={16} className={isMecha ? 'text-teal-400' : 'text-pink-500'} />
                  <span>Universitas Indonesia</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isMecha ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                  <MapPin size={16} className={isMecha ? 'text-blue-400' : 'text-purple-500'} />
                  <span>Jakarta Selatan</span>
                </div>
              </div>

              <p className={`mt-4 text-sm font-medium leading-relaxed ${isMecha ? 'text-slate-400' : 'text-slate-600'}`}>
                Coffee addict ☕ | UI/UX Designer by day, professional overthinker by night. Trying to stop my Shopee checkout habit (failed miserably).
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
              <div className={`backdrop-blur-xl border rounded-[20px] p-4 flex flex-col items-center shadow-sm ${isMecha ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-pink-100'}`}>
                <Trophy size={20} className="text-yellow-500 mb-1" />
                <span className={`text-lg font-black font-mono ${isMecha ? 'text-white' : 'text-slate-800'}`}>Lvl {level}</span>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Rank</span>
              </div>
              <div className={`backdrop-blur-xl border rounded-[20px] p-4 flex flex-col items-center shadow-sm cursor-pointer hover:scale-105 transition-transform ${isMecha ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-pink-100'}`} onClick={() => onNavigate("store")}>
                <Sparkles size={20} className={isMecha ? 'text-blue-400' : 'text-pink-500 mb-1'} />
                <span className={`text-lg font-black font-mono ${isMecha ? 'text-white' : 'text-slate-800'}`}>{points}</span>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Points</span>
              </div>
              <div className={`backdrop-blur-xl border rounded-[20px] p-4 flex flex-col items-center shadow-sm ${isMecha ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-pink-100'}`}>
                <Scan size={20} className="text-emerald-500 mb-1" />
                <span className={`text-lg font-black font-mono ${isMecha ? 'text-white' : 'text-slate-800'}`}>145</span>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Scans</span>
              </div>
            </motion.div>

            {/* Customization Section */}
            <motion.div variants={itemVariants} className={`backdrop-blur-xl border rounded-[28px] p-5 shadow-sm mt-2 ${isMecha ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-purple-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Palette size={18} className={isMecha ? 'text-blue-400' : 'text-purple-500'} />
                  <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-white' : 'text-slate-800'}`}>Profile Decorator</h2>
                </div>
                <button onClick={() => onNavigate("store")} className={`text-[10px] font-bold px-3 py-1 rounded-full ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-100 text-purple-600'}`}>Get More</button>
              </div>
              
              <div className="mb-4">
                <p className={`text-xs font-bold mb-2 ml-1 ${isMecha ? 'text-slate-400' : 'text-slate-400'}`}>Select Banner Theme</p>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {BANNER_OPTIONS.map(opt => {
                    const isOwned = inventory.banners.includes(opt.id);
                    return (
                      <button 
                        key={opt.id}
                        onClick={() => handleSelectBanner(opt)}
                        className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all flex items-center gap-1.5 ${activeBanner.id === opt.id ? (isMecha ? 'border-blue-500 bg-blue-900/50 text-blue-300' : 'border-purple-500 bg-purple-50 text-purple-600 shadow-sm') : (isMecha ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-200 bg-white text-slate-500')}`}
                      >
                        {!isOwned && <Lock size={12} />}
                        {opt.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className={`text-xs font-bold mb-2 ml-1 ${isMecha ? 'text-slate-400' : 'text-slate-400'}`}>Select Avatar Frame</p>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {FRAME_OPTIONS.map(opt => {
                    const isOwned = inventory.frames.includes(opt.id);
                    return (
                      <button 
                        key={opt.id}
                        onClick={() => handleSelectFrame(opt)}
                        className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all flex items-center gap-1.5 ${activeFrame.id === opt.id ? (isMecha ? 'border-teal-500 bg-teal-900/50 text-teal-300' : 'border-pink-500 bg-pink-50 text-pink-600 shadow-sm') : (isMecha ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-200 bg-white text-slate-500')}`}
                      >
                        {!isOwned && <Lock size={12} />}
                        {opt.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Links / Integrations */}
            <motion.div variants={itemVariants} className={`backdrop-blur-xl border rounded-[28px] overflow-hidden shadow-sm ${isMecha ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-100'}`}>
               <div className={`p-4 border-b flex items-center justify-between transition-colors cursor-pointer ${isMecha ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-100 hover:bg-slate-50'}`} onMouseEnter={() => { setMood("thinking"); setMsg("Mau nyambungin ke Instagram ya? 🔗"); }}>
                 <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMecha ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                     <Link2 size={18} />
                   </div>
                   <div className={`font-bold text-sm ${isMecha ? 'text-white' : 'text-slate-700'}`}>Linked Accounts</div>
                 </div>
                 <ChevronLeft size={16} className="text-slate-400 rotate-180" />
               </div>
               <div className={`p-4 flex items-center justify-between transition-colors cursor-pointer ${isMecha ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`} onMouseEnter={() => { setMood("thinking"); setMsg("Mau ngatur privasi akun? 🔒"); }}>
                 <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMecha ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                     <ShieldCheck size={18} />
                   </div>
                   <div className={`font-bold text-sm ${isMecha ? 'text-white' : 'text-slate-700'}`}>Privacy & Security</div>
                 </div>
                 <ChevronLeft size={16} className="text-slate-400 rotate-180" />
               </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Modern Floating Bottom Navigation */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] h-[72px] backdrop-blur-2xl border rounded-[32px] px-2 flex justify-between items-center z-40 pointer-events-auto ${isMecha ? 'bg-slate-800/95 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/95 border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]'}`}>
        
        <button onClick={onGoToDashboard} className={`flex flex-col items-center justify-center w-[20%] group transition-colors ${isMecha ? 'text-slate-400 hover:text-blue-400' : 'text-slate-400 hover:text-pink-500'}`}>
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-blue-500/20' : 'group-hover:bg-pink-50'}`}><Home size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">Home</span>
        </button>

        <button onClick={() => onNavigate('history')} className={`flex flex-col items-center justify-center w-[20%] group transition-colors ${isMecha ? 'text-slate-400 hover:text-blue-400' : 'text-slate-400 hover:text-pink-500'}`}>
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-blue-500/20' : 'group-hover:bg-pink-50'}`}><ReceiptText size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">History</span>
        </button>

        <div className="w-[20%] flex justify-center relative">
          <div className="absolute -top-10">
            <button onClick={onGoToCamera} className={`group flex flex-col items-center justify-center w-[68px] h-[68px] rounded-full hover:scale-105 active:scale-95 transition-all border-4 ${isMecha ? 'border-slate-900 bg-gradient-to-tr from-blue-600 to-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.5)]' : 'border-white bg-gradient-to-tr from-pink-400 to-purple-400 shadow-[0_10px_20px_rgba(244,114,182,0.4)]'}`}>
              <Camera size={28} strokeWidth={2.5} className="text-white group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <button onClick={() => onNavigate('insights')} className={`flex flex-col items-center justify-center w-[20%] group transition-colors ${isMecha ? 'text-slate-400 hover:text-red-400' : 'text-slate-400 hover:text-purple-500'}`}>
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-red-500/20' : 'group-hover:bg-purple-50'}`}><PieChart size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">Insights</span>
        </button>

        <button className={`flex flex-col items-center justify-center w-[20%] group ${isMecha ? 'text-teal-400' : 'text-pink-500'}`}>
          <div className={`p-1.5 rounded-xl shadow-inner mb-0.5 ${isMecha ? 'bg-teal-500/20' : 'bg-pink-100'}`}><User size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-black tracking-wide">Profile</span>
        </button>

      </div>

      <Mascot mood={mood} message={msg} theme={theme} placement="right" />
    </div>
  );
};
