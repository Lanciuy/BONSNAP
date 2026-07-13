import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Send, Receipt, Plus, Gift, History, Target, User, Search, Settings2, Sparkles, Crosshair } from "lucide-react";
import { Mascot, MascotMood } from "./Mascot";
import { ThemeState } from "../App";

interface SubViewProps {
  type: "transfer" | "splitBill" | "topUp" | "deals" | "history" | "savings" | "editProfile";
  onBack: () => void;
  theme: ThemeState;
}

export const SubView: React.FC<SubViewProps> = ({ type, onBack, theme }) => {
  const isMecha = theme === "mecha";
  const [mood, setMood] = useState<MascotMood>("happy");

  const config = {
    transfer: {
      title: isMecha ? "FUNDS TRANSFER" : "Kirim Uang 💸",
      icon: Send,
      msg: isMecha ? "AWAITING TARGET COORDINATES." : "Mau pamer saldo ke siapa nih bestie?",
      color: "text-blue-500",
      bg: "bg-blue-500/20"
    },
    splitBill: {
      title: isMecha ? "ASSET DIVISION" : "Bagi Tagihan 🧮",
      icon: Receipt,
      msg: isMecha ? "CALCULATING RESOURCE DISTRIBUTION." : "Gak jaman nombokin temen! Tagih sekarang!",
      color: "text-orange-500",
      bg: "bg-orange-500/20"
    },
    topUp: {
      title: isMecha ? "RECHARGE CORE" : "Isi Saldo 💳",
      icon: Plus,
      msg: isMecha ? "ENERGY LOW. PLEASE RECHARGE." : "Asyik saldo nambah, bisa jajan lagi dong!",
      color: "text-green-500",
      bg: "bg-green-500/20"
    },
    deals: {
      title: isMecha ? "TACTICAL OFFERS" : "Promo Mantul 🎁",
      icon: Gift,
      msg: isMecha ? "SCANNING FOR TACTICAL ADVANTAGES." : "Mata diskon nyala nih! Sikat semua promo!",
      color: "text-pink-500",
      bg: "bg-pink-500/20"
    },
    history: {
      title: isMecha ? "TRANSACTION LOGS" : "Riwayat Jajan 📜",
      icon: History,
      msg: isMecha ? "ACCESSING PREVIOUS DIRECTIVES." : "Waduh, panjang bener nih list dosa keuangan lo!",
      color: "text-purple-500",
      bg: "bg-purple-500/20"
    },
    savings: {
      title: isMecha ? "OBJECTIVE: CONCERT" : "Tabungan Konser 🎫",
      icon: Target,
      msg: isMecha ? "RESOURCE ALLOCATION AT 40%." : "Sabar ya, dikit lagi tiket VIP kebeli kok!",
      color: "text-indigo-500",
      bg: "bg-indigo-500/20"
    },
    editProfile: {
      title: isMecha ? "PILOT CONFIGURATION" : "Edit Profil 💅",
      icon: User,
      msg: isMecha ? "OVERRIDING PILOT DATA." : "Ganti PP bio dulu biar makin cetar!",
      color: "text-teal-500",
      bg: "bg-teal-500/20"
    }
  };

  const currConfig = config[type];
  const Icon = currConfig.icon;

  return (
    <div className={`w-full h-full relative overflow-hidden flex flex-col text-slate-800 ${isMecha ? 'bg-slate-900' : 'bg-[#fdfbfb]'}`}>
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-top opacity-20"
        style={{ backgroundImage: isMecha ? 'url("https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=1000&auto=format&fit=crop")' : 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />
      
      {/* Header */}
      <div className="relative z-10 px-6 pt-12 pb-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md border transition-all ${isMecha ? 'bg-blue-500/10 border-blue-500/30 text-blue-500 hover:bg-blue-500/20' : 'bg-white/80 border-pink-100 text-pink-500 hover:bg-pink-50'}`}
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <div className={`font-black text-lg tracking-wide ${isMecha ? 'text-blue-500 font-mono' : 'text-slate-800'}`}>
          {currConfig.title}
        </div>
        <button className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md border transition-all ${isMecha ? 'bg-blue-500/10 border-blue-500/30 text-blue-500 hover:bg-blue-500/20' : 'bg-white/80 border-pink-100 text-pink-500 hover:bg-pink-50'}`}>
          <Search size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pb-32">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className={`w-32 h-32 rounded-[32px] flex items-center justify-center mb-8 border-4 backdrop-blur-md shadow-2xl ${currConfig.bg} ${isMecha ? 'border-blue-400/50 shadow-blue-500/20' : 'border-white shadow-pink-200/50'}`}
        >
          <Icon size={64} className={currConfig.color} strokeWidth={2} />
        </motion.div>
        
        <h2 className={`text-2xl font-black text-center mb-3 ${isMecha ? 'text-white font-mono' : 'text-slate-800'}`}>
          {isMecha ? 'FEATURE IN DEVELOPMENT' : 'Lagi Dibangun Nih! 🚧'}
        </h2>
        <p className={`text-center font-bold px-4 ${isMecha ? 'text-blue-200/60 font-mono text-xs' : 'text-slate-500 text-sm'}`}>
          {isMecha 
            ? "THIS MODULE IS CURRENTLY UNDERGOING SYSTEM UPDATES. PLEASE CHECK BACK LATER." 
            : "Sabar ya bestie, fitur ini lagi digodok sama dev-nya biar makin mantul pas lo pakai!"}
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className={`mt-10 px-8 py-4 rounded-[24px] font-black tracking-wide shadow-lg flex items-center gap-2 border-2 ${isMecha ? 'bg-blue-500/20 text-blue-400 border-blue-400/30 hover:bg-blue-500/30' : 'bg-white text-pink-500 border-pink-100 hover:bg-pink-50'}`}
        >
          {isMecha ? <Settings2 size={20} /> : <Sparkles size={20} />}
          {isMecha ? 'RETURN TO HUB' : 'Balik ke Dashboard'}
        </motion.button>
      </div>

      <Mascot theme={theme} mood={mood} message={currConfig.msg} />
    </div>
  );
};
