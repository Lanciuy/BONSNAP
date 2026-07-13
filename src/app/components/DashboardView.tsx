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
    <div className="relative w-full h-full text-slate-800 bg-[#fdfbfb] overflow-hidden flex flex-col">
      {/* Background graphic */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-top opacity-30"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Profile Header */}
        <div className="px-6 pt-12 pb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div 
              onClick={() => { setIsProfileModalOpen(true); setMood("cute"); setMsg("Mau update profil biar makin badai ya? 💅"); }} 
              className={`cursor-pointer w-14 h-14 rounded-full overflow-hidden border-4 shadow-md relative transition-transform active:scale-95 bg-white ${isMecha ? 'border-blue-500' : 'border-pink-200'}`}
            >
              <img src={avatarUrl} alt="Profile" className={`w-full h-full object-contain ${theme === 'original' ? 'scale-[1.3] pt-2' : 'scale-110'}`} />
            </div>
            <div>
              <div className="text-sm text-slate-500 font-bold">{isMecha ? 'Pilot Online,' : 'Okaeri,'}</div>
              <div className="text-xl font-black tracking-tight text-slate-800">{isMecha ? 'PILOT-01 🚀' : '@bestie 🌸'}</div>
            </div>
          </div>
          <button 
            onClick={() => { setIsSettingsModalOpen(true); setMood("surprised"); setMsg(isMecha ? "SYSTEM CONFIGURATION." : "Mau ngoprek settings nih? Kepo deh! ⚙️"); }} 
            className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 transition ${isMecha ? 'hover:bg-blue-50 text-slate-400 hover:text-blue-500' : 'hover:bg-pink-50 text-slate-400 hover:text-pink-500'}`}
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Budget Card */}
        <div className="px-6 mb-8 mt-2" onMouseEnter={() => { setMood("excited"); setMsg(isMecha ? "CREDITS SUFFICIENT FOR UPGRADE." : "Jujurly saldo lo bikin mupeng! 🤑"); }} onMouseLeave={() => setMood("happy")}>
          <div className={`bg-white/80 backdrop-blur-xl border rounded-[32px] p-6 relative overflow-hidden shadow-xl ${isMecha ? 'border-blue-300 shadow-blue-100/50' : 'border-pink-200 shadow-pink-100/50'}`}>
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[30px] pointer-events-none ${isMecha ? 'bg-blue-200/50' : 'bg-pink-200/50'}`} />
            <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-[30px] pointer-events-none ${isMecha ? 'bg-red-200/50' : 'bg-purple-200/50'}`} />
            
            <div className={`flex items-center gap-2 mb-2 relative z-10 ${isMecha ? 'text-blue-600' : 'text-pink-500'}`}>
              <Wallet size={16} strokeWidth={2.5} />
              <span className="text-[11px] uppercase tracking-wider font-black">{isMecha ? 'AVAILABLE CREDITS' : 'Total Magic Coins'}</span>
            </div>
            
            <div className="text-[38px] font-black tracking-tighter leading-none mb-6 text-slate-800 relative z-10 font-mono">
              Rp 1.750.000
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-3 relative z-10 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className={`h-full rounded-full ${isMecha ? 'bg-gradient-to-r from-blue-500 to-red-500' : 'bg-gradient-to-r from-pink-400 to-purple-400'}`}
              />
            </div>
            <div className="flex justify-between text-xs font-bold relative z-10 mb-5">
              <span className="text-slate-500">Spent: Rp 4.250.000</span>
              <span className="text-slate-400">Limit: Rp 6.000.000</span>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-4 gap-2 pt-5 border-t border-slate-200/60 relative z-10">
              {quickActions.map((action, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  onClick={() => onNavigate(action.id)}
                  onMouseEnter={() => { setMood(action.hoverMood as MascotMood); setMsg(action.hoverMsg); }}
                  onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-1 ${action.bg} ${action.color}`}>
                    <action.icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">{action.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Savings Goal */}
        <div className="px-6 mb-6">
          <div 
            onClick={() => onNavigate("savings")}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[24px] p-5 text-white shadow-lg shadow-purple-200/50 flex items-center justify-between cursor-pointer"
            onMouseEnter={() => { setMood("excited"); setMsg("Dikit lagi tiket konser kebeli nih! Puasa boba dulu ya! 🎫"); }}
            onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-[16px] flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Target size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black mb-0.5">Tabungan Konser Bias</h4>
                <div className="text-xs text-white/80 font-bold">Rp 1.2M / Rp 3.0M</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-white/70" />
          </div>
        </div>

        {/* Transactions List */}
        <div className="px-6">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-lg font-black tracking-tight text-slate-800">{isMecha ? 'LATEST LOGS 📊' : 'Recent Magic ✨'}</h3>
            <button onClick={() => onNavigate("history")} className={`text-sm font-bold transition ${isMecha ? 'text-blue-500 hover:text-blue-600' : 'text-pink-500 hover:text-pink-600'}`}>See All</button>
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
                className="flex items-center gap-4 bg-white/80 backdrop-blur-md p-3.5 rounded-[24px] border border-white hover:shadow-md hover:bg-white transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-[16px] ${tx.bg} flex items-center justify-center shrink-0`}>
                  <tx.icon size={20} className={tx.color} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[15px] text-slate-800 truncate">{tx.merchant}</div>
                  <div className="text-xs text-slate-500 truncate font-bold mt-0.5">
                    {tx.category} • {tx.time}
                  </div>
                </div>
                <div className="font-black text-[15px] text-slate-800 shrink-0 tracking-tight font-mono">
                  -{tx.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Floating Bottom Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] h-[72px] bg-white/95 backdrop-blur-2xl border rounded-[32px] px-2 flex justify-between items-center shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-40 pointer-events-auto border-slate-100">
        
        {/* Home */}
        <button className={`flex flex-col items-center justify-center w-[20%] group ${isMecha ? 'text-blue-600' : 'text-pink-500'}`}>
          <div className={`p-1.5 rounded-xl shadow-inner mb-0.5 ${isMecha ? 'bg-blue-100' : 'bg-pink-100'}`}>
            <Home size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-black tracking-wide">Home</span>
        </button>

        {/* History */}
        <button 
          onClick={() => onNavigate('history')} 
          className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 transition-colors ${isMecha ? 'hover:text-blue-500' : 'hover:text-pink-500'}`}
        >
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-blue-50' : 'group-hover:bg-pink-50'}`}>
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
              className={`group flex flex-col items-center justify-center w-[68px] h-[68px] rounded-full hover:scale-105 active:scale-95 transition-all border-4 border-white ${isMecha ? 'bg-gradient-to-tr from-blue-500 to-red-500 shadow-[0_10px_20px_rgba(59,130,246,0.4)]' : 'bg-gradient-to-tr from-pink-400 to-purple-400 shadow-[0_10px_20px_rgba(244,114,182,0.4)]'}`}
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
          className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 transition-colors ${isMecha ? 'hover:text-red-500' : 'hover:text-purple-500'}`}
        >
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-red-50' : 'group-hover:bg-purple-50'}`}>
            <PieChart size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-bold tracking-wide">Insights</span>
        </button>

        {/* Profile */}
        <button 
          onClick={() => { setIsProfileModalOpen(true); setMood("cute"); setMsg("Mau update profil biar makin cetar? 💅"); }}
          className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 transition-colors ${isMecha ? 'hover:text-teal-500' : 'hover:text-pink-500'}`}
        >
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-teal-50' : 'group-hover:bg-pink-50'}`}>
            <User size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-bold tracking-wide">Profile</span>
        </button>

      </div>

      <Mascot mood={mood} message={msg} theme={theme} />

      <AnimatePresence>
        {isProfileModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 z-[60] backdrop-blur-sm pointer-events-auto"
              onClick={() => { setIsProfileModalOpen(false); setMood("happy"); setMsg(defaultMsg); }}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute bottom-0 left-0 w-full h-[90%] bg-white/95 backdrop-blur-3xl rounded-t-[32px] z-[70] p-6 shadow-2xl pointer-events-auto flex flex-col ${isMecha ? 'border-t-4 border-blue-200' : 'border-t-4 border-pink-100'}`}
            >
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h2 className="text-xl font-black text-slate-800">{isMecha ? 'PILOT DATA' : 'Profile 💅'}</h2>
                <button onClick={() => { setIsProfileModalOpen(false); setMood("happy"); setMsg(defaultMsg); }} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition"><X size={20} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar pb-10 flex flex-col gap-6">
                <div className="flex flex-col items-center justify-center pt-4">
                  <div className={`w-28 h-28 rounded-full overflow-hidden border-4 shadow-lg bg-white mb-4 relative group cursor-pointer ${isMecha ? 'border-blue-400' : 'border-pink-300'}`}>
                    <img src={avatarUrl} alt="Profile" className={`w-full h-full object-contain ${theme === 'original' ? 'scale-[1.3] pt-2' : 'scale-110'}`} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <button className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${isMecha ? 'bg-blue-50 text-blue-500 hover:bg-blue-100' : 'bg-pink-50 text-pink-500 hover:bg-pink-100'}`}>
                    {isMecha ? 'UPDATE AVATAR' : 'Change Avatar'}
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className={`bg-slate-50 rounded-[20px] p-4 border border-slate-100 transition-colors ${isMecha ? 'focus-within:border-blue-300' : 'focus-within:border-pink-300'}`}>
                    <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-400' : 'text-slate-400'}`}>Display Name</label>
                    <input type="text" defaultValue={isMecha ? 'PILOT-01' : 'Okaeri'} className={`w-full bg-transparent text-sm text-slate-800 outline-none font-bold ${isMecha && 'font-mono'}`} />
                  </div>
                  <div className={`bg-slate-50 rounded-[20px] p-4 border border-slate-100 transition-colors ${isMecha ? 'focus-within:border-blue-300' : 'focus-within:border-pink-300'}`}>
                    <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-400' : 'text-slate-400'}`}>Username</label>
                    <input type="text" defaultValue={isMecha ? 'SYSTEM_ADMIN' : '@bestie'} className={`w-full bg-transparent text-sm text-slate-800 outline-none font-bold ${isMecha && 'font-mono'}`} />
                  </div>
                  <div className={`bg-slate-50 rounded-[20px] p-4 border border-slate-100 transition-colors ${isMecha ? 'focus-within:border-blue-300' : 'focus-within:border-pink-300'}`}>
                    <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-400' : 'text-slate-400'}`}>Email</label>
                    <input type="email" defaultValue="user@bonsnap.app" className={`w-full bg-transparent text-sm text-slate-800 outline-none font-bold ${isMecha && 'font-mono'}`} />
                  </div>
                </div>

                <button onClick={() => setIsProfileModalOpen(false)} className={`mt-2 w-full flex items-center justify-center gap-2 p-4 rounded-[24px] text-white font-black transition ${isMecha ? 'bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 shadow-[0_10px_20px_rgba(59,130,246,0.3)]' : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 shadow-[0_10px_20px_rgba(244,114,182,0.3)]'}`}>
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
              className="absolute inset-0 bg-slate-900/40 z-[60] backdrop-blur-sm pointer-events-auto"
              onClick={() => { setIsSettingsModalOpen(false); setMood("happy"); setMsg(defaultMsg); }}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute bottom-0 left-0 w-full h-[80%] bg-white/95 backdrop-blur-3xl rounded-t-[32px] z-[70] p-6 shadow-2xl pointer-events-auto flex flex-col ${isMecha ? 'border-t-4 border-blue-200' : 'border-t-4 border-pink-100'}`}
            >
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h2 className="text-xl font-black text-slate-800">{isMecha ? 'SYSTEM CONFIG' : 'Settings ⚙️'}</h2>
                <button onClick={() => { setIsSettingsModalOpen(false); setMood("happy"); setMsg(defaultMsg); }} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition"><X size={20} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar pb-10 flex flex-col gap-6">

                {/* Theme Selection */}
                <div>
                  <h3 className={`text-xs font-black uppercase tracking-wider mb-3 ml-2 ${isMecha ? 'text-blue-500' : 'text-pink-400'}`}>
                    Assistant Theme
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      className={`p-4 rounded-[24px] border-4 transition-all border-pink-400 bg-pink-50 shadow-lg shadow-pink-200/50`}
                    >
                      <div className="text-4xl mb-2">✨</div>
                      <div className="font-black text-slate-800">Bon-chan</div>
                      <div className="text-[10px] text-pink-500 font-bold mt-1">GenZ Mode (Active)</div>
                    </button>

                    <button 
                      disabled
                      className={`p-4 rounded-[24px] border-4 transition-all border-slate-100 bg-slate-50 opacity-70 cursor-not-allowed`}
                    >
                      <div className="text-4xl mb-2 grayscale">🤖</div>
                      <div className="font-black text-slate-500">More Themes</div>
                      <div className="text-[10px] text-slate-400 font-bold mt-1">Coming Soon...</div>
                    </button>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className={`text-xs font-black uppercase tracking-wider mb-3 ml-2 ${isMecha ? 'text-blue-500' : 'text-pink-400'}`}>
                    Preferences
                  </h3>
                  <div className="bg-slate-50 border border-slate-100 rounded-[24px] overflow-hidden">
                    <div onClick={() => setNotifOn(!notifOn)} className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-white transition cursor-pointer">
                      <div className="flex items-center gap-3 text-slate-700 font-bold">
                        <Bell size={18} className="text-slate-400" /> Notifications
                      </div>
                      <div className={`w-10 h-6 rounded-full relative shadow-inner transition-colors ${notifOn ? 'bg-green-400' : 'bg-slate-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all ${notifOn ? 'right-1' : 'left-1'}`}></div>
                      </div>
                    </div>
                    <div onClick={() => setLangEn(!langEn)} className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-white transition cursor-pointer">
                      <div className="flex items-center gap-3 text-slate-700 font-bold">
                        <Globe size={18} className="text-slate-400" /> Language
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-400">{langEn ? "English" : "Bahasa"} <ChevronRight size={16} /></div>
                    </div>
                    <div onClick={() => setCurrIdr(!currIdr)} className="flex items-center justify-between p-4 hover:bg-white transition cursor-pointer">
                      <div className="flex items-center gap-3 text-slate-700 font-bold">
                        <CreditCard size={18} className="text-slate-400" /> Currency
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-400">{currIdr ? "IDR (Rp)" : "USD ($)"} <ChevronRight size={16} /></div>
                    </div>
                  </div>
                </div>

                {/* Log Out */}
                <button onClick={() => onNavigate("login")} className="mt-2 w-full flex items-center justify-center gap-2 p-4 rounded-[24px] bg-red-50 text-red-500 font-black hover:bg-red-100 transition">
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