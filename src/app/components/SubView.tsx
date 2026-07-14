import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Receipt, History, Target, User, Search, ArrowDownRight, ArrowUpRight, Image as ImageIcon, Camera } from "lucide-react";
import { Mascot, MascotMood } from "./Mascot";
import { ThemeState } from "../App";

interface SubViewProps {
  type: "income" | "splitBill" | "expense" | "history" | "savings" | "editProfile";
  onBack: () => void;
  theme: ThemeState;
}

export const SubView: React.FC<SubViewProps> = ({ type, onBack, theme }) => {
  const isMecha = theme === "mecha";
  const [mood, setMood] = useState<MascotMood>("happy");

  const config = {
    income: {
      title: isMecha ? "INCOMING ASSET" : "Catat Pemasukan 💵",
      icon: ArrowDownRight,
      msg: isMecha ? "UPLOAD PROOF OF DEPOSIT." : "Upload screenshot transfer atau foto bukti pemasukan ya!",
      color: "text-emerald-500",
      bg: "bg-emerald-500/20"
    },
    expense: {
      title: isMecha ? "OUTGOING ASSET" : "Catat Pengeluaran 💸",
      icon: ArrowUpRight,
      msg: isMecha ? "UPLOAD INVOICE OR RECEIPT." : "Upload invoice Shopee/Tokped atau foto struk fisik!",
      color: "text-rose-500",
      bg: "bg-rose-500/20"
    },
    splitBill: {
      title: isMecha ? "SMART DIVISION" : "Split Bill Pintar 🧮",
      icon: Receipt,
      msg: isMecha ? "SCANNING RECEIPT FOR SELECTIVE DISTRIBUTION." : "Foto struknya, pilih menu yang lu makan doang, beres!",
      color: "text-orange-500",
      bg: "bg-orange-500/20"
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

  const isScannerMode = type === "income" || type === "expense" || type === "splitBill";

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
        <button className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md border transition-all opacity-0 pointer-events-none`}>
          <Search size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pb-32">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`w-24 h-24 rounded-[32px] flex items-center justify-center mb-6 shadow-xl ${currConfig.bg} ${isMecha ? 'border-2 border-slate-700' : 'border border-white/50 backdrop-blur-md'}`}
        >
          <Icon size={48} className={currConfig.color} strokeWidth={2.5} />
        </motion.div>
        
        {isScannerMode ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full flex flex-col gap-4 mt-4"
          >
            <p className={`text-center font-bold text-sm mb-2 ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>
              Pilih metode input pencatatan:
            </p>
            
            <button className={`w-full py-4 rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 ${isMecha ? 'bg-slate-800 border-slate-600 hover:border-blue-400 text-slate-300' : 'bg-white/50 border-slate-300 hover:border-pink-400 text-slate-700'}`}>
              <ImageIcon size={32} className={currConfig.color} />
              <div className="text-center">
                <div className="font-black">Upload Foto / Screenshot</div>
                <div className="text-xs font-bold opacity-70">JPG, PNG, format digital</div>
              </div>
            </button>

            <button className={`w-full py-4 rounded-[24px] flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 text-white ${isMecha ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-200'}`}>
              <Camera size={32} />
              <div className="text-center">
                <div className="font-black">Scan Struk Fisik</div>
                <div className="text-xs font-bold opacity-90">Kamera AI otomatis</div>
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className={`text-3xl font-black text-center tracking-tight mb-2 ${isMecha ? 'text-white' : 'text-slate-800'}`}>
              {currConfig.title}
            </h2>
            <p className={`text-center font-bold px-4 ${isMecha ? 'text-slate-400 font-mono' : 'text-slate-500'}`}>
              Fitur ini sedang dibangun...
            </p>
          </motion.div>
        )}

      </div>

      <Mascot mood={mood} message={currConfig.msg} theme={theme} placement="right" />
    </div>
  );
};
