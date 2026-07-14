import React, { useState } from "react";
import { Camera, Coffee, ShoppingBag, Car, Settings, Wallet, PieChart, Home, Sparkles, X, Bell, Globe, CreditCard, ChevronRight, LogOut, Swords, Send, Plus, Receipt, Gift, Target, ReceiptText, User, ArrowDownRight, ArrowUpRight, Activity, Users, Volume2, Music, Zap, Cloud } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Mascot, MascotMood, getGeneratedMascotUrl } from "./Mascot";
import { ThemeState, Inventory, UserProfile } from '../App';
import { AVATAR_OPTIONS } from "./ProfileView";

interface DashboardViewProps {
  onGoToCamera: () => void;
  onGoToInsights: () => void;
  theme: ThemeState;
  setTheme: (theme: ThemeState) => void;
  onNavigate: (view: string) => void;
  points?: number;
  level?: number;
  inventory?: Inventory;
  userProfile: UserProfile;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const DashboardView: React.FC<DashboardViewProps> = ({ onGoToCamera, onGoToInsights, theme, setTheme, onNavigate, points, level, inventory, userProfile }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [mood, setMood] = useState<MascotMood>("happy");
  const [notifOn, setNotifOn] = useState(true);
  const [langEn, setLangEn] = useState(true);
  const [currIdr, setCurrIdr] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);
  const [bgmOn, setBgmOn] = useState(false);
  
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
    { id: "income", label: "Income", icon: ArrowDownRight, color: "text-emerald-500", bg: "bg-emerald-100", hoverMsg: "Ada uang masuk? Upload SS-an notif transfer atau invoice-nya ke sini!", hoverMood: "excited" },
    { id: "expense", label: "Expense", icon: ArrowUpRight, color: "text-rose-500", bg: "bg-rose-100", hoverMsg: "Habis jajan di e-commerce? Upload screenshot invoice atau foto struk kasirnya!", hoverMood: "alert" },
    { id: "splitBill", label: "Split Bill", icon: Receipt, color: "text-orange-500", bg: "bg-orange-100", hoverMsg: "Makan bareng temen tapi nota digabung? Foto aja, nanti AI milihin mana menu yang lu beli doang!", hoverMood: "thinking" },
    { id: "rewards", label: "Rewards", icon: Gift, color: "text-purple-500", bg: "bg-purple-100", hoverMsg: "Tuker koin kamu sama hiasan profil kece! 🎁", hoverMood: "cute" },
  ];

  const activeAvatar = AVATAR_OPTIONS.find(a => a.id === userProfile.activeAvatarId) || AVATAR_OPTIONS[0];
  const avatarUrl = (theme === "mecha" && activeAvatar.id === 'default') ? getGeneratedMascotUrl("happy", theme) : activeAvatar.imageUrl;

  return (
    <div className={`relative w-full h-full text-slate-800 overflow-hidden flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900' : 'bg-[#fdfbfb]'}`}>
      {/* Background graphic */}
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-top opacity-30 ${isMecha ? 'mix-blend-luminosity opacity-10' : ''}`}
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-[280px]">
        {/* Profile Header */}
        <div className="px-6 pt-12 pb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div 
              onClick={() => onNavigate('editProfile')} 
              onMouseEnter={() => { setMood("cute"); setMsg("Mau update profil biar makin badai ya? 💅"); }} 
              onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
              className={`cursor-pointer w-14 h-14 rounded-full overflow-hidden border-4 shadow-md relative transition-transform active:scale-95 bg-white ${isMecha ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]' : 'border-pink-200'}`}
            >
              <img src={avatarUrl} alt="Profile" className={`w-full h-full object-cover ${theme === 'original' ? '' : 'scale-110'}`} />
            </div>
            <div>
              <div className={`text-sm font-bold ${isMecha ? 'text-blue-400' : 'text-slate-500'}`}>{isMecha ? 'System Online,' : 'Good Morning,'}</div>
              <div className={`text-xl font-black tracking-tight ${isMecha ? 'text-white' : 'text-slate-800'}`}>{isMecha ? 'PILOT-01 🚀' : `${userProfile.name.split(' ')[0]} 🌸`}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition relative ${isMecha ? 'bg-slate-800 border-blue-500 hover:bg-blue-900 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-white border-slate-100 hover:bg-pink-50 text-slate-400 hover:text-pink-500'}`}>
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => { setIsSettingsModalOpen(true); setMood("surprised"); setMsg(isMecha ? "SYSTEM CONFIGURATION." : "Mau ngoprek settings nih? Kepo deh! ⚙️"); }} 
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition ${isMecha ? 'bg-slate-800 border-blue-500 hover:bg-blue-900 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-white border-slate-100 hover:bg-pink-50 text-slate-400 hover:text-pink-500'}`}
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="px-6 flex flex-col gap-5 mt-2">
          
          {/* 1. Anime / RPG Style Balance Card */}
          <motion.div variants={itemVariants}
            className={`w-full rounded-[32px] p-6 relative overflow-hidden shadow-2xl ${isMecha ? 'bg-slate-900 border-2 border-blue-500 shadow-[0_15px_30px_rgba(59,130,246,0.3)]' : 'bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 border-2 border-white/40 shadow-purple-200/50 text-white'}`}
            onMouseEnter={() => { setMood("excited"); setMsg(isMecha ? "CREDITS SUFFICIENT FOR UPGRADE." : "Jujurly saldo lo bikin mupeng! 🤑"); }} 
            onMouseLeave={() => setMood("happy")}
          >
            {/* Anime Sparkles & Magic overlays */}
            {!isMecha && <Sparkles className="absolute top-4 right-4 text-yellow-300 opacity-80" size={32} />}
            {!isMecha && <Sparkles className="absolute bottom-10 left-6 text-pink-200 opacity-50" size={20} />}
            <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-50 ${isMecha ? 'bg-blue-600' : 'bg-white/40'}`}></div>
            <div className={`absolute bottom-[-10%] left-[-10%] w-32 h-32 rounded-full blur-2xl opacity-60 ${isMecha ? 'bg-teal-600' : 'bg-pink-300'}`}></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-1">
                <div className={`flex items-center gap-1.5 text-xs uppercase tracking-widest font-black ${isMecha ? 'text-blue-400' : 'text-white/90'}`}>
                  {isMecha ? 'CORE CREDITS' : '✨ MAGIC POUCH ✨'}
                </div>
              </div>
              
              <div className={`text-[46px] font-black tracking-tighter leading-none mb-6 mt-2 ${isMecha ? 'text-white font-mono' : 'text-white drop-shadow-md'}`}>
                <span className={`text-xl align-top mr-1 ${isMecha ? 'text-blue-400' : 'text-white/80'}`}>Rp</span>
                1.750<span className={isMecha ? 'text-blue-400' : 'text-white/70'}>.000</span>
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-white/20">
                <div className="flex-1">
                  <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider mb-1 ${isMecha ? 'text-emerald-400' : 'text-emerald-300'}`}>
                    <ArrowDownRight size={12} strokeWidth={3} /> LOOT (IN)
                  </div>
                  <div className={`text-sm font-black ${isMecha ? 'text-white font-mono' : 'text-white'}`}>Rp 5.200k</div>
                </div>
                <div className="w-px bg-white/20"></div>
                <div className="flex-1">
                  <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider mb-1 ${isMecha ? 'text-rose-400' : 'text-rose-200'}`}>
                    <ArrowUpRight size={12} strokeWidth={3} /> GACHA (OUT)
                  </div>
                  <div className={`text-sm font-black ${isMecha ? 'text-white font-mono' : 'text-white'}`}>Rp 3.450k</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Quick Action Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-4 gap-3">
            {quickActions.map((action, i) => (
              <motion.button 
                key={action.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(action.id)}
                onMouseEnter={() => { setMood(action.hoverMood as MascotMood); setMsg(action.hoverMsg); }}
                onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center border shadow-sm ${isMecha ? 'bg-slate-800 border-slate-700 shadow-blue-500/10' : 'bg-white border-slate-100'} ${action.bg}`}>
                  <action.icon size={24} className={isMecha ? action.color.replace('500', '400') : action.color} strokeWidth={2.5} />
                </div>
                <span className={`text-[11px] font-black tracking-tight ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>{action.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* 3. Spending Trend Chart (Anime Style) */}
          <motion.div variants={itemVariants} className={`p-5 rounded-[28px] border-2 shadow-sm ${isMecha ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-100'}`}>
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                   <div className={`p-2 rounded-xl ${isMecha ? 'bg-purple-500/20 text-purple-400' : 'bg-pink-100 text-pink-500'}`}>
                      <Activity size={18} strokeWidth={3} />
                   </div>
                   <h3 className={`text-[13px] font-black uppercase tracking-wider ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>Weekly Quest 📊</h3>
                </div>
             </div>
             
             <div className="flex justify-between items-end h-28 gap-2">
                {[
                  { day: 'Mon', h: '40%', val: '40k' },
                  { day: 'Tue', h: '70%', val: '70k' },
                  { day: 'Wed', h: '30%', val: '30k' },
                  { day: 'Thu', h: '90%', val: '90k', today: true },
                  { day: 'Fri', h: '50%', val: '50k' },
                  { day: 'Sat', h: '20%', val: '20k' },
                  { day: 'Sun', h: '10%', val: '10k' },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 gap-1">
                     <span className={`text-[9px] font-black opacity-0 hover:opacity-100 transition-opacity ${isMecha ? 'text-slate-400' : 'text-pink-400'}`}>{bar.val}</span>
                     <div className={`w-full rounded-full transition-all duration-500 ${bar.today ? (isMecha ? 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'bg-pink-500 shadow-[0_4px_10px_rgba(236,72,153,0.4)]') : (isMecha ? 'bg-slate-700' : 'bg-slate-100')} hover:scale-110`} style={{ height: bar.h }}></div>
                     <span className={`text-[10px] font-black mt-2 ${bar.today ? (isMecha ? 'text-blue-400' : 'text-pink-600') : (isMecha ? 'text-slate-500' : 'text-slate-400')}`}>{bar.day}</span>
                  </div>
                ))}
             </div>
          </motion.div>

          {/* 4. Transactions List */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-end mb-4 px-1">
              <h3 className={`text-lg font-black tracking-tight ${isMecha ? 'text-white' : 'text-slate-800'}`}>{isMecha ? 'LATEST LOGS 📊' : 'Recent Magic ✨'}</h3>
              <button onClick={() => onNavigate("history")} className={`text-[11px] font-bold transition uppercase tracking-wider flex items-center gap-1 ${isMecha ? 'text-blue-400 hover:text-blue-300' : 'text-pink-500 hover:text-pink-600'}`}>See All <ChevronRight size={12} /></button>
            </div>

            <div className="space-y-3">
              {transactions.map((tx, i) => (
                <div 
                  key={tx.id} 
                  onClick={() => onNavigate("history")}
                  onMouseEnter={() => { setMood(tx.hoverMood as MascotMood); setMsg(tx.hoverMsg); }}
                  onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
                  className={`flex items-center gap-3 p-3 rounded-[20px] border hover:shadow-md transition-all cursor-pointer ${isMecha ? 'bg-slate-800 border-slate-700 hover:border-blue-500/50' : 'bg-white border-slate-100 hover:border-pink-200'}`}
                >
                  <div className={`w-12 h-12 rounded-[16px] ${isMecha ? 'bg-slate-700' : tx.bg} flex items-center justify-center shrink-0`}>
                    <tx.icon size={20} className={isMecha ? tx.color.replace('500', '400') : tx.color} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-[14px] truncate ${isMecha ? 'text-slate-200' : 'text-slate-800'}`}>{tx.merchant}</div>
                    <div className={`text-[11px] truncate font-bold mt-0.5 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>
                      {tx.category} • {tx.time}
                    </div>
                  </div>
                  <div className={`font-black text-[14px] shrink-0 tracking-tight font-mono ${isMecha ? 'text-red-400' : 'text-slate-800'}`}>
                    -{tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
        </motion.div>
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
          onClick={() => onNavigate('editProfile')}
          onMouseEnter={() => { setMood("cute"); setMsg("Mau update profil biar makin cetar? 💅"); }}
          onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
          className={`flex flex-col items-center justify-center w-[20%] group transition-colors ${isMecha ? 'text-slate-400 hover:text-teal-400' : 'text-slate-400 hover:text-pink-500'}`}
        >
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-teal-500/20' : 'group-hover:bg-pink-50'}`}>
            <User size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-bold tracking-wide">Profile</span>
        </button>

      </div>

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
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${isMecha ? 'text-blue-400' : 'text-pink-500'}`}>
                    <Sparkles size={14} /> AI Assistant Persona
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setTheme("genz")}
                      className={`relative p-4 rounded-[20px] border-2 overflow-hidden transition-all duration-300 ${theme === 'genz' ? 'border-pink-500 bg-pink-50/80 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'border-slate-200 bg-white hover:border-pink-300'}`}
                    >
                      {theme === 'genz' && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-200/20 to-transparent"></div>}
                      <div className="text-4xl mb-2 relative z-10">🌸</div>
                      <div className={`font-black tracking-tight relative z-10 ${theme === 'genz' ? 'text-pink-600' : 'text-slate-600'}`}>Bon-chan</div>
                      <div className={`text-[9px] font-bold mt-1 uppercase tracking-wider relative z-10 ${theme === 'genz' ? 'text-pink-400' : 'text-slate-400'}`}>GenZ / Casual</div>
                    </button>

                    <button 
                      disabled={!inventory.themes.includes("mecha")}
                      onClick={() => setTheme("mecha")}
                      className={`relative p-4 rounded-[20px] border-2 overflow-hidden transition-all duration-300 ${theme === 'mecha' ? 'border-blue-500 bg-slate-800 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-200 bg-white hover:border-blue-300 opacity-60'} ${inventory.themes.includes("mecha") ? 'cursor-pointer' : 'opacity-40 grayscale'}`}
                    >
                      {theme === 'mecha' && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent"></div>}
                      <div className="text-4xl mb-2 relative z-10">🤖</div>
                      <div className={`font-black tracking-tight relative z-10 ${theme === 'mecha' ? 'text-white' : 'text-slate-600'}`}>G-UNIT</div>
                      <div className={`text-[9px] font-bold mt-1 uppercase tracking-wider relative z-10 ${inventory.themes.includes("mecha") ? (theme === 'mecha' ? 'text-blue-400' : 'text-blue-500') : 'text-slate-400'}`}>
                        {inventory.themes.includes("mecha") ? 'Tactical Mode' : 'Locked'}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Audio Settings */}
                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${isMecha ? 'text-blue-400' : 'text-purple-500'}`}>
                    <Volume2 size={14} /> Audio & FX
                  </h3>
                  <div className={`rounded-[20px] overflow-hidden border-2 shadow-sm ${isMecha ? 'bg-slate-900 border-slate-700' : 'bg-white border-purple-100'}`}>
                    <div onClick={() => setBgmOn(!bgmOn)} className={`flex items-center justify-between p-3.5 border-b-2 cursor-pointer transition-colors ${isMecha ? 'border-slate-800 hover:bg-slate-800' : 'border-purple-50 hover:bg-purple-50/50'}`}>
                      <div className={`flex items-center gap-3 font-bold text-sm ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Music size={16} className={isMecha ? 'text-blue-400' : 'text-purple-400'} /> Background Music
                      </div>
                      <div className={`w-11 h-6 rounded-full relative transition-colors border-2 ${bgmOn ? (isMecha ? 'bg-blue-500 border-blue-400' : 'bg-purple-500 border-purple-400') : (isMecha ? 'bg-slate-800 border-slate-600' : 'bg-slate-200 border-slate-300')}`}>
                        <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all shadow-sm ${bgmOn ? 'right-1 bg-white' : 'left-1 bg-white/70'}`}></div>
                      </div>
                    </div>
                    <div onClick={() => setSfxOn(!sfxOn)} className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${isMecha ? 'hover:bg-slate-800' : 'hover:bg-purple-50/50'}`}>
                      <div className={`flex items-center gap-3 font-bold text-sm ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Zap size={16} className={isMecha ? 'text-blue-400' : 'text-purple-400'} /> SFX & Voice Lines
                      </div>
                      <div className={`w-11 h-6 rounded-full relative transition-colors border-2 ${sfxOn ? (isMecha ? 'bg-blue-500 border-blue-400' : 'bg-purple-500 border-purple-400') : (isMecha ? 'bg-slate-800 border-slate-600' : 'bg-slate-200 border-slate-300')}`}>
                        <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all shadow-sm ${sfxOn ? 'right-1 bg-white' : 'left-1 bg-white/70'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Settings */}
                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${isMecha ? 'text-blue-400' : 'text-emerald-500'}`}>
                    <Settings size={14} /> System Config
                  </h3>
                  <div className={`rounded-[20px] overflow-hidden border-2 shadow-sm ${isMecha ? 'bg-slate-900 border-slate-700' : 'bg-white border-emerald-100'}`}>
                    <div onClick={() => setNotifOn(!notifOn)} className={`flex items-center justify-between p-3.5 border-b-2 cursor-pointer transition-colors ${isMecha ? 'border-slate-800 hover:bg-slate-800' : 'border-emerald-50 hover:bg-emerald-50/50'}`}>
                      <div className={`flex items-center gap-3 font-bold text-sm ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Bell size={16} className={isMecha ? 'text-blue-400' : 'text-emerald-400'} /> Push Notifications
                      </div>
                      <div className={`w-11 h-6 rounded-full relative transition-colors border-2 ${notifOn ? (isMecha ? 'bg-blue-500 border-blue-400' : 'bg-emerald-500 border-emerald-400') : (isMecha ? 'bg-slate-800 border-slate-600' : 'bg-slate-200 border-slate-300')}`}>
                        <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all shadow-sm ${notifOn ? 'right-1 bg-white' : 'left-1 bg-white/70'}`}></div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-between p-3.5 border-b-2 transition-colors ${isMecha ? 'border-slate-800' : 'border-emerald-50'}`}>
                      <div className={`flex items-center gap-3 font-bold text-sm ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Globe size={16} className={isMecha ? 'text-blue-400' : 'text-emerald-400'} /> Language
                      </div>
                      <div className="flex bg-slate-200 rounded-lg p-0.5 border border-slate-300">
                         <button onClick={() => setLangEn(true)} className={`px-2 py-1 text-[10px] font-black rounded-md transition ${langEn ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>EN</button>
                         <button onClick={() => setLangEn(false)} className={`px-2 py-1 text-[10px] font-black rounded-md transition ${!langEn ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>ID</button>
                      </div>
                    </div>

                    <div className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${isMecha ? 'hover:bg-slate-800' : 'hover:bg-emerald-50/50'}`}>
                      <div className={`flex items-center gap-3 font-bold text-sm ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Cloud size={16} className={isMecha ? 'text-blue-400' : 'text-emerald-400'} /> Cloud Save
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-100 text-emerald-600'}`}>Synced</span>
                    </div>
                  </div>
                </div>

                {/* Log Out */}
                <button onClick={() => onNavigate("login")} className={`mt-2 mb-4 w-full relative overflow-hidden flex items-center justify-center gap-2 p-4 rounded-[20px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 border-2 ${isMecha ? 'bg-slate-900 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'}`}>
                  <LogOut size={18} strokeWidth={3} /> LOG OUT / QUIT GAME
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};