import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ShieldAlert, UserPlus, LogIn, ArrowLeft } from "lucide-react";
import { Mascot, MascotMood, moodMap, getGeneratedMascotUrl } from "./Mascot";
import { ThemeState } from '../App';

import bgImage from "../../imports/image-10.png";

interface LoginViewProps {
  onLogin: () => void;
  theme: ThemeState;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, theme }) => {
  const [mood, setMood] = useState<MascotMood>("happy");
  const [mode, setMode] = useState<"login" | "register">("login");
  
  const initialMsg = theme === "mecha" 
    ? "SYSTEM ONLINE. AWAITING PILOT AUTHENTICATION." 
    : "Halo bestie! Bon-chan siap bantu nge-track pengeluaran lo nih! ✨";
    
  const [msg, setMsg] = useState(initialMsg);

  const isMecha = theme === "mecha";
  const avatarUrl = theme === "original" ? moodMap["happy"] : getGeneratedMascotUrl("happy", theme);

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col px-8 text-slate-800">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-white/20 backdrop-blur-[2px]" />

      <AnimatePresence mode="wait">
        {mode === "login" ? (
          <motion.div 
            key="login-form"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col justify-center h-full w-full relative z-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center mb-10 -mt-24"
            >
              <div className={`w-28 h-28 backdrop-blur-xl border-4 border-white rounded-[32px] flex items-center justify-center mb-6 shadow-xl overflow-hidden ${isMecha ? 'bg-blue-50 shadow-blue-200/50' : 'bg-pink-50 shadow-pink-200/50'}`}>
                {isMecha ? (
                  <ShieldAlert size={44} className="text-blue-500" strokeWidth={2.5} />
                ) : (
                  <img src={avatarUrl} alt="Logo" className={`w-full h-full object-contain ${theme === 'original' ? 'scale-[1.3] pt-4' : 'scale-110'}`} />
                )}
              </div>
              <h1 className="text-[44px] font-black tracking-tighter mb-2 text-center leading-none text-slate-800 drop-shadow-sm">BonSnap</h1>
              <p className="text-slate-700 text-[15px] tracking-wide text-center font-bold bg-white/50 px-4 py-1 rounded-full">
                {isMecha ? 'Tactical Finance Core 🤖' : 'AI Tracker Paling Slay ✨'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col gap-4"
            >
              <div className={`bg-white/80 backdrop-blur-xl rounded-[24px] p-4 border-2 border-white transition-all shadow-lg focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[11px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>
                  {isMecha ? 'Pilot ID' : 'Username'}
                </label>
                <input 
                  type="text" 
                  placeholder={isMecha ? "PILOT-01" : "@bestie"} 
                  onFocus={() => { 
                    setMood("thinking"); 
                    setMsg(isMecha ? "IDENTIFYING PILOT CREDENTIALS..." : "Spill username lo dong, biar akrab! 🧐"); 
                  }}
                  onBlur={() => { 
                    setMood("happy"); 
                    setMsg(isMecha ? "READY FOR INPUT." : "Gas terus bestie! 🌸"); 
                  }}
                  className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60 text-lg" 
                />
              </div>
              
              <div className={`bg-white/80 backdrop-blur-xl rounded-[24px] p-4 border-2 border-white transition-all shadow-lg focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[11px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>
                  {isMecha ? 'Access Code' : 'Password'}
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  onFocus={() => { 
                    setMood("shy"); 
                    setMsg(isMecha ? "ENCRYPTING CONNECTION..." : "Selow, password lo aman kok sama AI gue! 🫣"); 
                  }}
                  onBlur={() => { 
                    setMood("love"); 
                    setMsg(isMecha ? "ENCRYPTION SECURE." : "Sip, tinggal masuk aja nih! ✨"); 
                  }}
                  className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60 text-lg" 
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col gap-3 pb-32"
            >
              <button 
                onClick={onLogin}
                onMouseEnter={() => { 
                  setMood("excited"); 
                  setMsg(isMecha ? "COMMENCING LOGIN SEQUENCE." : "Let's go! Gak sabar flexing AI keuangan! 🎉"); 
                }}
                onMouseLeave={() => { 
                  setMood("happy"); 
                  setMsg(initialMsg); 
                }}
                className={`w-full text-white font-black rounded-[24px] py-4 flex items-center justify-center gap-2 transition-all active:scale-[0.96] text-lg group border-2 border-white ${isMecha ? 'bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 shadow-[0_10px_30px_rgba(59,130,246,0.4)]' : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 shadow-[0_10px_30px_rgba(244,114,182,0.4)]'}`}
              >
                {isMecha ? 'INITIALIZE 🚀' : 'Masuk Yuk! 🌸'}
                <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => {
                  setMode("register");
                  setMood("surprised");
                  setMsg(isMecha ? "NEW PILOT REGISTRATION PROTOCOL INITIATED." : "Wih, member baru nih! Sini gue bantuin daftar! 🎉");
                }}
                className={`w-full bg-white/50 hover:bg-white/80 font-black rounded-[24px] py-4 flex items-center justify-center gap-2 transition-all active:scale-[0.96] border-2 border-white backdrop-blur-md ${isMecha ? 'text-blue-600' : 'text-pink-500'}`}
              >
                <UserPlus size={18} strokeWidth={2.5} /> 
                {isMecha ? 'REGISTER NEW PILOT' : 'Belum Punya Akun? Daftar!'}
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="register-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col h-full w-full relative z-10 pt-16 pb-32 overflow-y-auto no-scrollbar"
          >
            <button 
              onClick={() => {
                setMode("login");
                setMood("happy");
                setMsg(initialMsg);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-white/50 backdrop-blur-md border border-white transition-all ${isMecha ? 'text-blue-500 hover:bg-blue-50' : 'text-pink-500 hover:bg-pink-50'}`}
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </button>
            
            <h2 className={`text-3xl font-black tracking-tighter mb-6 ${isMecha ? 'text-blue-600' : 'text-pink-500'}`}>
              {isMecha ? 'PILOT REGISTRATION' : 'Buat Akun Baru ✨'}
            </h2>
            
            <div className="flex flex-col gap-3">
              <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60" />
              </div>
              
              <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Username</label>
                <input type="text" placeholder="@newbestie" className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60" />
              </div>
              
              <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm`}>
                  <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Gender</label>
                  <select className="w-full bg-transparent text-slate-800 outline-none font-bold">
                    <option value="">Pilih...</option>
                    <option value="m">Cowok 👦</option>
                    <option value="f">Cewek 👧</option>
                    <option value="o">Lainnya ✨</option>
                  </select>
                </div>
                <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm`}>
                  <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Status</label>
                  <select className="w-full bg-transparent text-slate-800 outline-none font-bold">
                    <option value="">Pilih...</option>
                    <option value="student">Pelajar 📚</option>
                    <option value="worker">Bekerja 💼</option>
                    <option value="freelance">Freelance 💻</option>
                  </select>
                </div>
              </div>

              <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Bio (Opsional)</label>
                <textarea rows={2} placeholder="Suka jajan boba tiap hari..." className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60 resize-none"></textarea>
              </div>

              <button 
                onClick={onLogin}
                onMouseEnter={() => { setMood("love"); setMsg(isMecha ? "READY TO COMMIT DATA." : "Udah keisi semua? Yuk gass! 🚀"); }}
                className={`mt-4 w-full text-white font-black rounded-[24px] py-4 flex items-center justify-center gap-2 transition-all active:scale-[0.96] text-lg group border-2 border-white ${isMecha ? 'bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 shadow-[0_10px_30px_rgba(59,130,246,0.4)]' : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 shadow-[0_10px_30px_rgba(244,114,182,0.4)]'}`}
              >
                {isMecha ? 'SUBMIT CONFIGURATION' : 'Daftar Sekarang! 🎉'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Mascot mood={mood} message={msg} theme={theme} />
    </div>
  );
};