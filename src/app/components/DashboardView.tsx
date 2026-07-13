import React, { useState } from "react";
import { Camera, Coffee, ShoppingBag, Car, Settings, Wallet, PieChart, Home, Sparkles, X, Bell, Globe, CreditCard, ChevronRight, LogOut, Swords, Send, Plus, Receipt, Gift, Target, ReceiptText, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Mascot, MascotMood, getGeneratedMascotUrl } from "./Mascot";
import { ThemeState } from '../App';

import img1 from "../../imports/image-1.png";

interface DashboardViewProps {
  onGoToCamera: () => void;
  onGoToInsights: () => void;
  theme: ThemeState;
  setTheme: (theme: ThemeState) => void;
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onGoToCamera, onGoToInsights, theme, setTheme, onNavigate }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [mood, setMood] = useState<MascotMood>("happy");
  const [notifOn, setNotifOn] = useState(true);
  const [langEn, setLangEn] = useState(true);
  const [currIdr, setCurrIdr] = useState(true);
  
  const isMecha = theme === "mecha";

  const defaultMsg = isMecha 
    ? "CREDITS AT 29%. RECOMMEND TACTICAL CONSERVATION FOR UPGRADES." 
    : "Wih, sisa budget lo masih Rp 1.750.000! Valid no debat, yuk jajan cantik! 🍰";
    
  const [msg, setMsg] = useState(defaultMsg);

  const transactions = isMecha ? [
    { id: 1, merchant: "Ammunition Depot", category: "Supplies", time: "Today, 14:30", amount: "Rp 45.000", icon: Swords, color: "text-red-500", bg: "bg-red-100", hoverMsg: "RESTOCKING KINETIC ROUNDS.", hoverMood: "alert" },
    { id: 2, merchant: "Energy Rations", category: "Fuel", time: "Yesterday, 18:15", amount: "Rp 125.000", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-100", hoverMsg: "CORE REFUELING COMPLETED.", hoverMood: "thinking" },
    { id: 3, merchant: "Mech Transit", category: "Transport", time: "Yesterday, 09:00", amount: "Rp 35.000", icon: Car, color: "text-slate-500", bg: "bg-slate-100", hoverMsg: "RELOCATING TO SECTOR 7.", hoverMood: "happy" },
  ] : [
    { id: 1, merchant: "Maid Cafe", category: "Food & Beverage", time: "Today, 14:30", amount: "Rp 45.000", icon: Coffee, color: "text-pink-500", bg: "bg-pink-100", hoverMsg: "Buset jajan manis mulu, gak takut diabetes? 🍰", hoverMood: "cute" },
    { id: 2, merchant: "Convenience Store", category: "Groceries", time: "Yesterday, 18:15", amount: "Rp 125.000", icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-100", hoverMsg: "Nyetok camilan buat marathon drakor ya? 🍫", hoverMood: "thinking" },
    { id: 3, merchant: "Train Ticket", category: "Transport", time: "Yesterday, 09:00", amount: "Rp 35.000", icon: Car, color: "text-blue-500", bg: "bg-blue-100", hoverMsg: "Jalan-jalan terus, FOMO ya bestie? 🚋", hoverMood: "happy" },
  ];

  const quickActions = [
    { id: "transfer", icon: Send, label: "Transfer", color: "text-blue-500", bg: "bg-blue-50", hoverMood: "excited", hoverMsg: "Wih mau transfer ke siapa tuh? Jangan lupa sedekah! 💸" },
    { id: "splitBill", icon: Receipt, label: "Split Bill", color: "text-orange-500", bg: "bg-orange-50", hoverMood: "thinking", hoverMsg: "Nah gini dong patungan, jangan mau rugi bandar! 🧮" },
    { id: "topUp", icon: Plus, label: "Top Up", color: "text-green-500", bg: "bg-green-50", hoverMood: "happy", hoverMsg: "Asyik, amunisi dompet nambah lagi nih! 💳" },
    { id: "deals", icon: Gift, label: "Deals", color: "text-pink-500", bg: "bg-pink-50", hoverMood: "cute", hoverMsg: "Mata langsung melek kalau denger diskon! 👀🎁" }
  ];

  const avatarUrl = theme === "original" ? moodMap["happy"] : getGeneratedMascotUrl("happy", theme);

  return (
    <div className={`relative w-full h-full text-slate-800 overflow-hidden flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900' : 'bg-[#fdfbfb]'}`}>
      {/* Background graphic */}
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-top opacity-30 ${isMecha ? 'mix-blend-luminosity opacity-10' : ''}`}
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-[320px]">
        {/* Profile Header */}
        <div className="px-6 pt-12 pb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div 
              onClick={() => { setIsProfileModalOpen(true); setMood("cute"); setMsg("Mau update profil biar makin badai ya? 💅"); }} 
              className={`cursor-pointer w-14 h-14 rounded-full overflow-hidden border-4 shadow-md relative transition-transform active:scale-95 bg-white ${isMecha ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]' : 'border-pink-200'}`}
            >
              <img src={avatarUrl} alt="Profile" className={`w-full h-full object-contain ${theme === 'original' ? 'scale-[1.3] pt-2' : 'scale-110'}`} />
            </div>
            <div>
              <div className={`text-sm font-bold ${isMecha ? 'text-blue-400' : 'text-slate-500'}`}>{isMecha ? 'Pilot Online,' : 'Okaeri,'}</div>
              <div className={`text-xl font-black tracking-tight ${isMecha ? 'text-white' : 'text-slate-800'}`}>{isMecha ? 'PILOT-01 🚀' : '@bestie 🌸'}</div>
            </div>
          </div>
          <button 
            onClick={() => { setIsSettingsModalOpen(true); setMood("surprised"); setMsg(isMecha ? "SYSTEM CONFIGURATION." : "Mau ngoprek settings nih? Kepo deh! ⚙️"); }} 
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition ${isMecha ? 'bg-slate-800 border-blue-500 hover:bg-blue-900 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-white border-slate-100 hover:bg-pink-50 text-slate-400 hover:text-pink-500'}`}
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Bento Box Dashboard */}
        <div className="px-6 mb-6 mt-2 grid grid-cols-2 gap-4">
          
          {/* Main Budget Card (col-span-2) */}
          <div 
            className={`col-span-2 bg-white/80 backdrop-blur-xl border rounded-[28px] p-5 relative overflow-hidden shadow-xl ${isMecha ? 'bg-slate-800/80 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-pink-200 shadow-pink-100/50'}`}
            onMouseEnter={() => { setMood("excited"); setMsg(isMecha ? "CREDITS SUFFICIENT FOR UPGRADE." : "Jujurly saldo lo bikin mupeng! 🤑"); }} 
            onMouseLeave={() => setMood("happy")}
          >
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[30px] pointer-events-none ${isMecha ? 'bg-blue-500/20' : 'bg-pink-200/50'}`} />
            
            <div className={`flex items-center gap-2 mb-2 relative z-10 ${isMecha ? 'text-blue-400' : 'text-pink-500'}`}>
              <Wallet size={16} strokeWidth={2.5} />
              <span className="text-[11px] uppercase tracking-wider font-black">{isMecha ? 'AVAILABLE CREDITS' : 'Total Magic Coins'}</span>
            </div>
            
            <div className={`text-[36px] font-black tracking-tighter leading-none mb-4 relative z-10 font-mono ${isMecha ? 'text-white' : 'text-slate-800'}`}>
              Rp 1.750.000
            </div>
            
            {/* Gamified Wobble Progress Bar */}
            <div className={`w-full h-3 rounded-full overflow-hidden mb-2 relative z-10 shadow-inner ${isMecha ? 'bg-slate-900' : 'bg-slate-200'}`}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: "70%",
                  rotate: [0, 0.5, -0.5, 0] // Wobble effect
                }}
                transition={{ 
                  width: { duration: 1, delay: 0.2, ease: "easeOut" },
                  rotate: { duration: 0.4, delay: 1.2, repeat: 2, ease: "easeInOut" }
                }}
                className={`h-full rounded-full origin-left ${isMecha ? 'bg-gradient-to-r from-blue-500 to-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]' : 'bg-gradient-to-r from-pink-400 to-purple-400'}`}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold relative z-10">
              <span className={isMecha ? 'text-blue-300' : 'text-slate-500'}>Spent: Rp 4.250.000</span>
              <span className={isMecha ? 'text-slate-500' : 'text-slate-400'}>Limit: Rp 6.000.000</span>
            </div>
          </div>

          {/* Bento Item: Savings Goal (col-span-1) */}
          <motion.div 
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("savings")}
            className={`col-span-1 rounded-[24px] p-4 flex flex-col justify-between cursor-pointer relative overflow-hidden ${isMecha ? 'bg-slate-800 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-purple-200/50 text-white'}`}
            onMouseEnter={() => { setMood("excited"); setMsg("Dikit lagi tiket konser kebeli nih! Puasa boba dulu ya! 🎫"); }}
            onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
          >
            <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center backdrop-blur-sm border mb-2 ${isMecha ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' : 'bg-white/20 border-white/30 text-white'}`}>
              <Target size={20} />
            </div>
            <div>
              <h4 className={`text-[11px] font-black mb-1 leading-tight ${isMecha ? 'text-slate-300' : 'text-white'}`}>Konser Bias</h4>
              <div className={`text-[10px] font-bold ${isMecha ? 'text-purple-400' : 'text-white/80'}`}>40% Done</div>
            </div>
          </motion.div>

          {/* Bento Item: Limit Status (col-span-1) */}
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className={`col-span-1 rounded-[24px] p-4 flex flex-col justify-between cursor-pointer border ${isMecha ? 'bg-slate-800 border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-white/80 border-slate-100 shadow-md'}`}
          >
            <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center mb-2 ${isMecha ? 'bg-teal-500/20 text-teal-400' : 'bg-emerald-100 text-emerald-500'}`}>
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className={`text-[11px] font-black mb-1 leading-tight ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>Safe to Spend</h4>
              <div className={`text-[10px] font-bold ${isMecha ? 'text-teal-400' : 'text-emerald-500'}`}>Rp 1.75M left</div>
            </div>
          </motion.div>

        </div>

        {/* Transactions List */}
        <div className="px-6">
          <div className="flex justify-between items-end mb-4">
            <h3 className={`text-lg font-black tracking-tight ${isMecha ? 'text-white' : 'text-slate-800'}`}>{isMecha ? 'LATEST LOGS 📊' : 'Recent Magic ✨'}</h3>
            <button onClick={() => onNavigate("history")} className={`text-[11px] font-bold transition uppercase tracking-wider ${isMecha ? 'text-blue-400 hover:text-blue-300' : 'text-pink-500 hover:text-pink-600'}`}>See All</button>
          </div>

          <div className="space-y-3">
            {transactions.map((tx, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                key={tx.id} 
                onMouseEnter={() => { setMood(tx.hoverMood as MascotMood); setMsg(tx.hoverMsg); }}
                onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
                className={`flex items-center gap-3 backdrop-blur-md p-3 rounded-[20px] border hover:shadow-md transition-all cursor-pointer ${isMecha ? 'bg-slate-800/80 border-slate-700 hover:border-blue-500/50' : 'bg-white/80 border-white hover:bg-white'}`}
              >
                <div className={`w-10 h-10 rounded-[14px] ${isMecha ? 'bg-slate-700' : tx.bg} flex items-center justify-center shrink-0`}>
                  <tx.icon size={18} className={isMecha ? tx.color.replace('500', '400') : tx.color} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-[13px] truncate ${isMecha ? 'text-slate-200' : 'text-slate-800'}`}>{tx.merchant}</div>
                  <div className={`text-[10px] truncate font-bold mt-0.5 ${isMecha ? 'text-slate-500' : 'text-slate-500'}`}>
                    {tx.category} • {tx.time}
                  </div>
                </div>
                <div className={`font-black text-[13px] shrink-0 tracking-tight font-mono ${isMecha ? 'text-red-400' : 'text-slate-800'}`}>
                  -{tx.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumb-Zone Quick Actions (Floating above nav) */}
      <div className="absolute bottom-28 left-0 w-full px-6 z-30 pointer-events-none">
        <div className={`w-full flex justify-between p-2 rounded-[24px] backdrop-blur-xl border pointer-events-auto ${isMecha ? 'bg-slate-800/90 border-blue-500/30 shadow-[0_10px_30px_rgba(59,130,246,0.2)]' : 'bg-white/90 border-pink-100 shadow-[0_10px_30px_rgba(244,114,182,0.15)]'}`}>
          {quickActions.map((action, i) => (
            <button 
              key={i} 
              className="flex flex-col items-center gap-1 w-1/4 group transition-transform active:scale-95"
              onClick={() => onNavigate(action.id)}
              onMouseEnter={() => { setMood(action.hoverMood as MascotMood); setMsg(action.hoverMsg); }}
              onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isMecha ? 'bg-slate-700 group-hover:bg-slate-600' : `${action.bg} group-hover:opacity-80`}`}>
                <action.icon size={18} strokeWidth={2.5} className={isMecha ? action.color.replace('500', '400') : action.color} />
              </div>
              <span className={`text-[9px] font-bold ${isMecha ? 'text-slate-400' : 'text-slate-600'}`}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contextual Mascot Slide-in */}
      <Mascot mood={mood} message={msg} theme={theme} placement="right" />

      {/* Modern Floating Bottom Navigation */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] h-[72px] backdrop-blur-2xl border rounded-[32px] px-2 flex justify-between items-center z-40 pointer-events-auto ${isMecha ? 'bg-slate-800/95 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/95 border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]'}`}>
        
        {/* Home */}
        <button className={`flex flex-col items-center justify-center w-[20%] group ${isMecha ? 'text-blue-400' : 'text-pink-500'}`}>
          <div className={`p-1.5 rounded-xl shadow-inner mb-0.5 ${isMecha ? 'bg-blue-500/20' : 'bg-pink-100'}`}>
            <Home size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-black tracking-wide">Home</span>
        </button>

        {/* History */}
        <button 
          onClick={() => onNavigate('history')} 
          className={`flex flex-col items-center justify-center w-[20%] group transition-colors ${isMecha ? 'text-slate-400 hover:text-blue-400' : 'text-slate-400 hover:text-pink-500'}`}
        >
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-blue-500/20' : 'group-hover:bg-pink-50'}`}>
            <ReceiptText size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-bold tracking-wide">History</span>
        </button>

        {/* Center Scan FAB */}
        <div className="w-[20%] flex justify-center relative">
          <div className="absolute -top-10">
            <button 
              onClick={onGoToCamera}
              onMouseEnter={() => { setMood("alert"); setMsg(isMecha ? "SCANNER ONLINE." : "Ada struk baru? Sini gue scan-in pakai AI! 📸"); }}
              onMouseLeave={() => { setMood("thinking"); setMsg(defaultMsg); }}
              className={`group flex flex-col items-center justify-center w-[68px] h-[68px] rounded-full hover:scale-105 active:scale-95 transition-all border-4 ${isMecha ? 'border-slate-900 bg-gradient-to-tr from-blue-600 to-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.5)]' : 'border-white bg-gradient-to-tr from-pink-400 to-purple-400 shadow-[0_10px_20px_rgba(244,114,182,0.4)]'}`}
            >
              <Camera size={28} strokeWidth={2.5} className="text-white group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Insights */}
        <button 
          onClick={onGoToInsights} 
          onMouseEnter={() => { setMood("thinking"); setMsg(isMecha ? "ACCESSING DIAGNOSTICS." : "Yuk kita pantau pengeluaran lo, biar gak boncos! 📊"); }}
          onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
          className={`flex flex-col items-center justify-center w-[20%] group transition-colors ${isMecha ? 'text-slate-400 hover:text-red-400' : 'text-slate-400 hover:text-purple-500'}`}
        >
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-red-500/20' : 'group-hover:bg-purple-50'}`}>
            <PieChart size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-bold tracking-wide">Insights</span>
        </button>

        {/* Profile */}
        <button 
          onClick={() => { setIsProfileModalOpen(true); setMood("cute"); setMsg("Mau update profil biar makin cetar? 💅"); }}
          className={`flex flex-col items-center justify-center w-[20%] group transition-colors ${isMecha ? 'text-slate-400 hover:text-teal-400' : 'text-slate-400 hover:text-pink-500'}`}
        >
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-teal-500/20' : 'group-hover:bg-pink-50'}`}>
            <User size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-bold tracking-wide">Profile</span>
        </button>

      </div>

      <AnimatePresence>
        {isProfileModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 z-[60] backdrop-blur-sm pointer-events-auto"
              onClick={() => { setIsProfileModalOpen(false); setMood("happy"); setMsg(defaultMsg); }}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute bottom-0 left-0 w-full h-[90%] backdrop-blur-3xl rounded-t-[32px] z-[70] p-6 shadow-2xl pointer-events-auto flex flex-col ${isMecha ? 'bg-slate-800/95 border-t-4 border-blue-500 shadow-[0_-10px_40px_rgba(59,130,246,0.3)]' : 'bg-white/95 border-t-4 border-pink-100'}`}
            >
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h2 className={`text-xl font-black ${isMecha ? 'text-white' : 'text-slate-800'}`}>{isMecha ? 'PILOT DATA' : 'Profile 💅'}</h2>
                <button onClick={() => { setIsProfileModalOpen(false); setMood("happy"); setMsg(defaultMsg); }} className={`p-2 rounded-full transition ${isMecha ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'}`}><X size={20} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar pb-10 flex flex-col gap-6">
                <div className="flex flex-col items-center justify-center pt-4">
                  <div className={`w-28 h-28 rounded-full overflow-hidden border-4 shadow-lg bg-white mb-4 relative group cursor-pointer ${isMecha ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'border-pink-300'}`}>
                    <img src={avatarUrl} alt="Profile" className={`w-full h-full object-contain ${theme === 'original' ? 'scale-[1.3] pt-2' : 'scale-110'}`} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <button className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${isMecha ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 border border-blue-500/30' : 'bg-pink-50 text-pink-500 hover:bg-pink-100'}`}>
                    {isMecha ? 'UPDATE AVATAR' : 'Change Avatar'}
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className={`rounded-[20px] p-4 border transition-colors ${isMecha ? 'bg-slate-900/50 border-slate-700 focus-within:border-blue-500' : 'bg-slate-50 border-slate-100 focus-within:border-pink-300'}`}>
                    <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-400' : 'text-slate-400'}`}>Display Name</label>
                    <input type="text" defaultValue={isMecha ? 'PILOT-01' : 'Okaeri'} className={`w-full bg-transparent text-sm outline-none font-bold ${isMecha ? 'font-mono text-white' : 'text-slate-800'}`} />
                  </div>
                  <div className={`rounded-[20px] p-4 border transition-colors ${isMecha ? 'bg-slate-900/50 border-slate-700 focus-within:border-blue-500' : 'bg-slate-50 border-slate-100 focus-within:border-pink-300'}`}>
                    <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-400' : 'text-slate-400'}`}>Username</label>
                    <input type="text" defaultValue={isMecha ? 'SYSTEM_ADMIN' : '@bestie'} className={`w-full bg-transparent text-sm outline-none font-bold ${isMecha ? 'font-mono text-white' : 'text-slate-800'}`} />
                  </div>
                  <div className={`rounded-[20px] p-4 border transition-colors ${isMecha ? 'bg-slate-900/50 border-slate-700 focus-within:border-blue-500' : 'bg-slate-50 border-slate-100 focus-within:border-pink-300'}`}>
                    <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-400' : 'text-slate-400'}`}>Email</label>
                    <input type="email" defaultValue="user@bonsnap.app" className={`w-full bg-transparent text-sm outline-none font-bold ${isMecha ? 'font-mono text-white' : 'text-slate-800'}`} />
                  </div>
                </div>

                <button onClick={() => setIsProfileModalOpen(false)} className={`mt-2 w-full flex items-center justify-center gap-2 p-4 rounded-[24px] text-white font-black transition ${isMecha ? 'bg-gradient-to-r from-blue-600 to-teal-400 hover:from-blue-500 hover:to-teal-300 shadow-[0_10px_20px_rgba(45,212,191,0.3)]' : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 shadow-[0_10px_20px_rgba(244,114,182,0.3)]'}`}>
                  {isMecha ? 'SAVE CONFIGURATION' : 'Save Changes ✨'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 z-[60] backdrop-blur-sm pointer-events-auto"
              onClick={() => { setIsSettingsModalOpen(false); setMood("happy"); setMsg(defaultMsg); }}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute bottom-0 left-0 w-full h-[80%] backdrop-blur-3xl rounded-t-[32px] z-[70] p-6 shadow-2xl pointer-events-auto flex flex-col ${isMecha ? 'bg-slate-800/95 border-t-4 border-blue-500 shadow-[0_-10px_40px_rgba(59,130,246,0.3)]' : 'bg-white/95 border-t-4 border-pink-100'}`}
            >
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h2 className={`text-xl font-black ${isMecha ? 'text-white' : 'text-slate-800'}`}>{isMecha ? 'SYSTEM CONFIG' : 'Settings ⚙️'}</h2>
                <button onClick={() => { setIsSettingsModalOpen(false); setMood("happy"); setMsg(defaultMsg); }} className={`p-2 rounded-full transition ${isMecha ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'}`}><X size={20} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar pb-10 flex flex-col gap-6">

                {/* Theme Selection */}
                <div>
                  <h3 className={`text-xs font-black uppercase tracking-wider mb-3 ml-2 ${isMecha ? 'text-blue-400' : 'text-pink-400'}`}>
                    Assistant Theme
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setTheme("genz")}
                      className={`p-4 rounded-[24px] border-4 transition-all ${theme === 'genz' ? 'border-pink-400 bg-pink-50 shadow-lg shadow-pink-200/50' : 'border-slate-100 bg-white hover:bg-pink-50'}`}
                    >
                      <div className="text-4xl mb-2">✨</div>
                      <div className={`font-black ${theme === 'genz' ? 'text-slate-800' : 'text-slate-500'}`}>Bon-chan</div>
                      <div className={`text-[10px] font-bold mt-1 ${theme === 'genz' ? 'text-pink-500' : 'text-slate-400'}`}>GenZ Mode</div>
                    </button>

                    <button 
                      onClick={() => setTheme("mecha")}
                      className={`p-4 rounded-[24px] border-4 transition-all ${theme === 'mecha' ? 'border-blue-500 bg-slate-900 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
                    >
                      <div className="text-4xl mb-2">🤖</div>
                      <div className={`font-black ${theme === 'mecha' ? 'text-white' : 'text-slate-500'}`}>G-UNIT</div>
                      <div className={`text-[10px] font-bold mt-1 ${theme === 'mecha' ? 'text-blue-400' : 'text-slate-400'}`}>Mecha Mode</div>
                    </button>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className={`text-xs font-black uppercase tracking-wider mb-3 ml-2 ${isMecha ? 'text-blue-400' : 'text-pink-400'}`}>
                    Preferences
                  </h3>
                  <div className={`border rounded-[24px] overflow-hidden ${isMecha ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    <div onClick={() => setNotifOn(!notifOn)} className={`flex items-center justify-between p-4 border-b transition cursor-pointer ${isMecha ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-100 hover:bg-white'}`}>
                      <div className={`flex items-center gap-3 font-bold ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Bell size={18} className={isMecha ? 'text-blue-400' : 'text-slate-400'} /> Notifications
                      </div>
                      <div className={`w-10 h-6 rounded-full relative shadow-inner transition-colors ${notifOn ? (isMecha ? 'bg-teal-500' : 'bg-green-400') : 'bg-slate-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all ${notifOn ? 'right-1' : 'left-1'}`}></div>
                      </div>
                    </div>
                    <div onClick={() => setLangEn(!langEn)} className={`flex items-center justify-between p-4 border-b transition cursor-pointer ${isMecha ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-100 hover:bg-white'}`}>
                      <div className={`flex items-center gap-3 font-bold ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Globe size={18} className={isMecha ? 'text-blue-400' : 'text-slate-400'} /> Language
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-bold ${isMecha ? 'text-slate-400' : 'text-slate-400'}`}>{langEn ? "English" : "Bahasa"} <ChevronRight size={16} /></div>
                    </div>
                    <div onClick={() => setCurrIdr(!currIdr)} className={`flex items-center justify-between p-4 transition cursor-pointer ${isMecha ? 'hover:bg-slate-800' : 'hover:bg-white'}`}>
                      <div className={`flex items-center gap-3 font-bold ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>
                        <CreditCard size={18} className={isMecha ? 'text-blue-400' : 'text-slate-400'} /> Currency
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-bold ${isMecha ? 'text-slate-400' : 'text-slate-400'}`}>{currIdr ? "IDR (Rp)" : "USD ($)"} <ChevronRight size={16} /></div>
                    </div>
                  </div>
                </div>

                {/* Log Out */}
                <button onClick={() => onNavigate("login")} className={`mt-2 w-full flex items-center justify-center gap-2 p-4 rounded-[24px] font-black transition ${isMecha ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}>
                  <LogOut size={18} strokeWidth={2.5} /> TERMINATE SESSION
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};