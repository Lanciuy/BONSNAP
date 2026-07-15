import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ShieldAlert, UserPlus, LogIn, ArrowLeft } from "lucide-react";
import { Mascot, MascotMood, moodMap, getGeneratedMascotUrl } from "../../shared/Mascot/Mascot";
import { ThemeState } from '../../../core/entities';

import bgImage from "../../../imports/image.png";

interface LoginViewProps {
  onLogin: () => void;
  theme: ThemeState;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, theme }) => {
  const [mood, setMood] = useState<MascotMood>("happy");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [gender, setGender] = useState("");
  
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
      <div className={`absolute inset-0 z-0 backdrop-blur-[4px] ${isMecha ? 'bg-slate-900/70' : 'bg-white/60'}`} />

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
              <div className={`w-28 h-28 backdrop-blur-xl border-[3px] rounded-[32px] flex items-center justify-center mb-5 shadow-xl overflow-hidden ${isMecha ? 'bg-slate-800 border-blue-500/50 shadow-blue-500/20' : 'bg-white/80 border-white shadow-slate-200/50'}`}>
                {isMecha ? (
                  <ShieldAlert size={44} className="text-blue-500" strokeWidth={2.5} />
                ) : (
                  <img src={avatarUrl} alt="Logo" className={`w-full h-full object-contain ${theme === 'original' ? 'scale-[1.3] pt-4' : 'scale-110'}`} />
                )}
              </div>
              <h1 className={`text-[36px] font-black tracking-tight mb-1 ${isMecha ? 'text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'text-slate-800 drop-shadow-sm'}`}>
                BONSNAP
              </h1>
              <p className={`text-[13px] font-bold mb-8 max-w-[260px] mx-auto ${isMecha ? 'text-blue-200/80' : 'text-slate-600'}`}>
                {isMecha ? 'Tactical Asset Management' : 'Level up your financial stats!'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col gap-4"
            >
              <div className={`bg-white/90 backdrop-blur-xl rounded-[24px] p-4 border-2 transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-indigo-400 shadow-indigo-500/20'} ${isMecha ? 'border-slate-700/50 text-slate-800' : 'border-slate-200'}`}>
                <label className={`text-[11px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-600' : 'text-indigo-500'}`}>
                  {isMecha ? 'Pilot ID' : 'Username'}
                </label>
                <input 
                  type="text" 
                  placeholder={isMecha ? "PILOT-01" : "@user"} 
                  onFocus={() => { 
                    setMood("thinking"); 
                    setMsg(isMecha ? "IDENTIFYING PILOT CREDENTIALS..." : "Input handle lo buat continue cuy! 🧐"); 
                  }}
                  onBlur={() => { 
                    setMood("happy"); 
                    setMsg(isMecha ? "READY FOR INPUT." : "Ready buat track financial stats lo? ✨"); 
                  }}
                  className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60 text-lg" 
                />
              </div>
              
              <div className={`bg-white/90 backdrop-blur-xl rounded-[24px] p-4 border-2 transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-indigo-400 shadow-indigo-500/20'} ${isMecha ? 'border-slate-700/50 text-slate-800' : 'border-slate-200'}`}>
                <label className={`text-[11px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-600' : 'text-indigo-500'}`}>
                  {isMecha ? 'Access Code' : 'Password'}
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  onFocus={() => { 
                    setMood("shy"); 
                    setMsg(isMecha ? "ENCRYPTING CONNECTION..." : "Password is secure, keep it hidden ya bestie! 🫣"); 
                  }}
                  onBlur={() => { 
                    setMood("love"); 
                    setMsg(isMecha ? "ENCRYPTION SECURE." : "Welcome back cuy! Ready buat track stats lo? ✨"); 
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
                className={`w-full text-white font-black rounded-full py-4 flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg ${isMecha ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30' : 'bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 shadow-pink-500/30'}`}
              >
                {isMecha ? 'INITIALIZE 🚀' : 'Login'}
                <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => {
                  setMode("register");
                  setMood("surprised");
                  setMsg(isMecha ? "NEW PILOT REGISTRATION PROTOCOL INITIATED." : "New user ya? Let's set up account lo bestie! 🎉");
                }}
                className={`w-full font-black rounded-full py-4 flex items-center justify-center gap-2 transition-all active:scale-[0.96] border-2 backdrop-blur-md ${isMecha ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-blue-400' : 'bg-white/90 hover:bg-white border-slate-200 text-slate-700 shadow-sm'}`}
              >
                <UserPlus size={18} strokeWidth={2.5} /> 
                {isMecha ? 'REGISTER NEW PILOT' : 'Create Account'}
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
            className="flex flex-col h-full w-full relative z-10 pt-16 overflow-y-auto no-scrollbar"
          >
            <button 
              onClick={() => {
                setMode("login");
                setMood("happy");
                setMsg(initialMsg);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-white/50 backdrop-blur-md border border-white transition-all ${isMecha ? 'text-blue-500 hover:bg-blue-50' : 'text-indigo-500 hover:bg-indigo-50'}`}
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </button>
            
            <h2 className={`text-3xl font-black tracking-tighter mb-6 ${isMecha ? 'text-blue-600' : 'text-indigo-500'}`}>
              {isMecha ? 'PILOT REGISTRATION' : 'Join the Community ✨'}
            </h2>
            
            <div className="flex flex-col gap-3">
              <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  onFocus={() => {
                    setMood("thinking");
                    if (gender === 'm') setMsg(isMecha ? "INPUT NAME." : "Spill nama asli lo dong ngab!");
                    else if (gender === 'f') setMsg(isMecha ? "INPUT NAME." : "Spill real name lo dong bestie! ✨");
                    else setMsg(isMecha ? "INPUT NAME." : "Input nama lengkap lo cuy! 📝");
                  }}
                  className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60" 
                />
              </div>
              
              <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Username</label>
                <input 
                  type="text" 
                  placeholder="@newbestie" 
                  onFocus={() => {
                    setMood("wink");
                    if (gender === 'm') setMsg(isMecha ? "INPUT CALLSIGN." : "Bikin username yang slay dong ngab! 😎");
                    else if (gender === 'f') setMsg(isMecha ? "INPUT CALLSIGN." : "Bikin username yang aesthetic dong bestie! 🌸");
                    else setMsg(isMecha ? "INPUT CALLSIGN." : "Choose username yang keren buat account lo! 🎯");
                  }}
                  className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60" 
                />
              </div>
              
              <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  onFocus={() => {
                    setMood("shy");
                    if (gender === 'm') setMsg(isMecha ? "INPUT ENCRYPTION KEY." : "Password-nya strictly secret ya ngab, jangan bocor! 🤫");
                    else if (gender === 'f') setMsg(isMecha ? "INPUT ENCRYPTION KEY." : "Password-nya literally top secret ya bestie! 🤫");
                    else setMsg(isMecha ? "INPUT ENCRYPTION KEY." : "Bikin password yang strong ya cuy! 🔒");
                  }}
                  className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm`}>
                  <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Gender</label>
                  <select 
                    value={gender}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGender(val);
                      if (val === 'm') {
                        setMood("cool");
                        setMsg(isMecha ? "MALE PILOT IDENTIFIED." : "Ready join squad nih ngab? Gass lah cuy! 🔥");
                      } else if (val === 'f') {
                        setMood("cute");
                        setMsg(isMecha ? "FEMALE PILOT IDENTIFIED." : "Slay bestie! Bakal literally seru banget kita budgeting bareng! 💅✨");
                      } else {
                        setMood("happy");
                        setMsg(isMecha ? "AWAITING PILOT DATA." : "Yuk lengkapi profil kamu! 🌟");
                      }
                    }}
                    className="w-full bg-transparent text-slate-800 outline-none font-bold"
                  >
                    <option value="">Pilih...</option>
                    <option value="m">Cowok 👦</option>
                    <option value="f">Cewek 👧</option>
                  </select>
                </div>
                <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm`}>
                  <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Status</label>
                  <select 
                    onFocus={() => {
                      setMood("happy");
                      if (gender === 'm') setMsg(isMecha ? "SELECT PILOT CLASS." : "Kesibukan lo sekarang apa nih, man? 💼");
                      else if (gender === 'f') setMsg(isMecha ? "SELECT PILOT CLASS." : "Kesibukan kamu sekarang apa nih, bestie? 💼");
                      else setMsg(isMecha ? "SELECT PILOT CLASS." : "Pilih status kamu saat ini ya! 🎓");
                    }}
                    className="w-full bg-transparent text-slate-800 outline-none font-bold"
                  >
                    <option value="">Pilih...</option>
                    <option value="student">Pelajar 📚</option>
                    <option value="worker">Bekerja 💼</option>
                    <option value="freelance">Freelance 💻</option>
                  </select>
                </div>
              </div>

              <div className={`bg-white/80 backdrop-blur-xl rounded-[20px] p-3 border-2 border-white transition-all shadow-sm focus-within:${isMecha ? 'border-blue-500' : 'border-pink-400'}`}>
                <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-500'}`}>Bio (Opsional)</label>
                <textarea 
                  rows={2} 
                  placeholder="Suka jajan boba tiap hari..." 
                  onFocus={() => {
                    setMood("excited");
                    if (gender === 'm') setMsg(isMecha ? "INPUT PILOT BIO." : "Spill bio lo ngab, biar vibes-nya asik! 🎸");
                    else if (gender === 'f') setMsg(isMecha ? "INPUT PILOT BIO." : "Spill bio yang cute dong bestie! 🎀");
                    else setMsg(isMecha ? "INPUT PILOT BIO." : "Spill dikit tentang lo dong cuy! ✍️");
                  }}
                  className="w-full bg-transparent text-slate-800 outline-none font-bold placeholder:text-slate-400/60 resize-none"
                ></textarea>
              </div>

              <button 
                onClick={onLogin}
                className="w-full flex justify-center items-center gap-3 p-4 rounded-[20px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 text-white bg-slate-800 shadow-[0_10px_30px_rgba(30,41,59,0.3)] hover:shadow-[0_10px_30px_rgba(30,41,59,0.5)] border border-slate-700 mt-6"
              >
                {isMecha ? 'SUBMIT CONFIGURATION' : 'Daftar Sekarang! 🎉'}
              </button>
              
              {/* Spacer so the button can be scrolled past the Mascot */}
              <div className="h-[220px] w-full shrink-0"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Mascot mood={mood} message={msg} theme={theme} />
    </div>
  );
};