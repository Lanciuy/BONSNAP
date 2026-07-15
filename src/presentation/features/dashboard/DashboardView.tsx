import React, { useState } from "react";
import { Camera, Coffee, ShoppingBag, Car, Settings, Wallet, PieChart, Home, Sparkles, X, Bell, Globe, CreditCard, ChevronRight, LogOut, Swords, Send, Plus, Receipt, Gift, Target, ReceiptText, User, ArrowDownRight, ArrowUpRight, Activity, Users, Volume2, Music, Zap, Cloud } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Mascot, MascotMood, getGeneratedMascotUrl } from "../../shared/Mascot/Mascot";
import { ThemeState, Inventory, UserProfile } from '../../../core/entities';
import { AVATAR_OPTIONS, WALLET_SKIN_OPTIONS } from "../profile/ProfileView";
import { useAppStore } from "../../../core/store/useAppStore";
import { generateMascotResponse, MascotResponse } from "../../../infrastructure/services/groqService";

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
  const { transactions } = useAppStore();
  
  // Calculate expenses from transactions
  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const remainingBudget = Math.max(0, userProfile.budget - totalExpenses);
  
  const defaultMsg = isMecha 
    ? "CREDITS AT 29%. RECOMMEND TACTICAL CONSERVATION FOR UPGRADES." 
    : `Wih, sisa budget lo masih Rp ${remainingBudget.toLocaleString('id-ID')}! Valid no debat, yuk jajan cantik! 🍰`;
    
  const [msg, setMsg] = useState(defaultMsg);

  React.useEffect(() => {
    let isMounted = true;
    const fetchDynamicGreeting = async () => {
      if (transactions.length === 0) return; // Use default if no transactions
      
      try {
        const lastTx = transactions[0];
        const context = `User recently spent Rp ${lastTx.amount} at ${lastTx.name}. They have Rp ${remainingBudget} left. Give a quick reaction!`;
        
        const response: MascotResponse = await generateMascotResponse(context, userProfile.financialPersona, isMecha);
        if (isMounted) {
          setMsg(response.message);
          setMood(response.mood as MascotMood);
        }
      } catch (e) {
        console.error(e);
      }
    };
    
    // Slight delay to avoid jitter on mount
    const timeout = setTimeout(() => {
      fetchDynamicGreeting();
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [transactions, remainingBudget, userProfile.financialPersona, isMecha]);

  const quickActions = [
    { id: "income", label: "Income", icon: ArrowDownRight, color: "text-emerald-500", bg: "bg-emerald-100", hoverMsg: "Ada uang masuk? Upload SS-an notif transfer atau invoice-nya ke sini!", hoverMood: "excited" },
    { id: "expense", label: "Expense", icon: ArrowUpRight, color: "text-rose-500", bg: "bg-rose-100", hoverMsg: "Habis jajan di e-commerce? Upload screenshot invoice atau foto struk kasirnya!", hoverMood: "alert" },
    { id: "splitBill", label: "Split Bill", icon: Receipt, color: "text-orange-500", bg: "bg-orange-100", hoverMsg: "Makan bareng temen tapi nota digabung? Foto aja, nanti AI milihin mana menu yang lu beli doang!", hoverMood: "thinking" },
    { id: "rewards", label: "Rewards", icon: Gift, color: "text-purple-500", bg: "bg-purple-100", hoverMsg: "Tuker koin kamu sama hiasan profil kece! 🎁", hoverMood: "cute" },
  ];

  const activeAvatar = AVATAR_OPTIONS.find(a => a.id === userProfile.activeAvatarId) || AVATAR_OPTIONS[0];
  const avatarUrl = (theme === "mecha" && activeAvatar.id === 'default') ? getGeneratedMascotUrl("happy", theme) : activeAvatar.imageUrl;
  
  const activeWalletSkin = WALLET_SKIN_OPTIONS.find(w => w.id === userProfile.activeWalletSkinId) || WALLET_SKIN_OPTIONS[0];

  return (
    <div className={`relative w-full h-full text-slate-800 overflow-hidden flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900' : 'bg-[#fdfbfb]'}`}>
      {/* Dynamic Premium Background */}
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-top transition-all duration-1000 ${isMecha ? 'mix-blend-luminosity opacity-20' : 'opacity-40'}`}
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />
      
      {/* Ambient glowing orbs */}
      <div className={`absolute -top-20 -left-20 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-pulse z-0 ${isMecha ? 'bg-blue-600/40' : 'bg-pink-300/50'}`}></div>
      <div className={`absolute top-1/2 -right-20 w-80 h-80 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-pulse z-0 ${isMecha ? 'bg-cyan-500/30' : 'bg-purple-300/40'}`} style={{ animationDelay: '2s' }}></div>

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
          
          {/* 1. Wallet Card (Realistic ATM/VISA Style) */}
          <motion.div 
            variants={itemVariants} 
            className={`w-full aspect-[1.586/1] rounded-[24px] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-700 ${activeWalletSkin.bg}`}
            onMouseEnter={() => { setMood("thinking"); setMsg(isMecha ? "ANALYZING FINANCIAL RESERVES..." : "Wah, isi dompetnya lumayan nih! 💳"); }}
            onMouseLeave={() => setMood("happy")}
          >
            {/* Holographic Anime/Manga Accents */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/40 to-transparent opacity-50 mix-blend-overlay z-0 pointer-events-none"></div>
            
            {/* Subtle halftone dots pattern for manga feel */}
            <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            
            {/* Hologram Effects */}
            {!isMecha && <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 pointer-events-none z-0" size={160} strokeWidth={1} />}
            {!isMecha && <Sparkles className="absolute top-6 right-8 text-yellow-100/90 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)] z-0 pointer-events-none" size={24} />}
            {!isMecha && <Sparkles className="absolute bottom-12 left-6 text-pink-100/80 z-0 pointer-events-none animate-pulse" size={18} />}
            
            <div className={`absolute top-[-20%] right-[-10%] w-56 h-56 rounded-full blur-[60px] opacity-40 z-0 pointer-events-none ${isMecha ? 'bg-blue-500' : 'bg-white'}`}></div>
            <div className={`absolute bottom-[-20%] left-[-20%] w-56 h-56 rounded-full blur-[50px] opacity-50 z-0 pointer-events-none ${isMecha ? 'bg-cyan-500' : 'bg-pink-300'}`}></div>
            
            {/* Top row: Contactless */}
            <div className="relative z-10 flex justify-end items-start w-full">
              <div className={isMecha ? 'text-blue-400/80' : 'text-white/90'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm"><path d="M8.5 4c2.5 0 4.5 2 4.5 4.5 0 1.2-.5 2.3-1.3 3.1"/><path d="M11.5 4c3.5 0 6.5 3 6.5 6.5 0 1.8-.7 3.4-1.9 4.6"/><path d="M14.5 4c4.5 0 8.5 4 8.5 8.5 0 2.3-.9 4.5-2.5 6.1"/><path d="M5.5 4c1.5 0 2.5 1 2.5 2.5 0 .7-.3 1.3-.8 1.8"/></svg>
              </div>
            </div>
            
            {/* Middle row: EMV Chip and Balance */}
            <div className="relative z-10 flex flex-col justify-center flex-1 py-1">
              {/* EMV Chip */}
              <div className="w-11 h-8 rounded-[6px] bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-500 mb-4 flex items-center justify-center opacity-95 shadow-[0_2px_4px_rgba(0,0,0,0.1)] border border-yellow-500/50 relative overflow-hidden shrink-0">
                 <div className="absolute inset-0 border border-black/10 rounded-[6px]"></div>
                 <div className="w-full h-[1px] bg-black/10 absolute top-1/2"></div>
                 <div className="h-full w-[1px] bg-black/10 absolute left-1/3"></div>
                 <div className="h-full w-[1px] bg-black/10 absolute right-1/3"></div>
                 <div className="w-[50%] h-[40%] border border-black/10 rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              {/* Balance */}
              <div className={`text-[30px] sm:text-[38px] font-black tracking-tight leading-none flex items-center gap-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)] ${isMecha ? 'text-white' : 'text-white'}`} style={{ textShadow: '1px 2px 2px rgba(0,0,0,0.2)' }}>
                <span className={`text-xl font-bold tracking-normal opacity-90`}>Rp</span>
                {remainingBudget.toLocaleString('id-ID')}
              </div>
            </div>
            
            {/* Bottom row: Details & Card Logo */}
            <div className="relative z-10 flex justify-between items-end w-full">
              <div className="flex flex-col gap-1">
                <div className={`text-[9px] uppercase tracking-widest opacity-80 ${isMecha ? 'text-blue-200' : 'text-pink-100'}`}>CARDHOLDER</div>
                <div className={`text-[13px] sm:text-[15px] font-black uppercase tracking-wider drop-shadow-sm ${isMecha ? 'text-white' : 'text-white'}`}>
                  {userProfile.walletName.toUpperCase()}
                </div>
              </div>
              
              {/* VISA-style Logo */}
              <div className={`text-[24px] sm:text-[28px] leading-none font-black italic tracking-tighter self-end relative ${isMecha ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'text-white drop-shadow-lg'}`}>
                <span className="relative z-10">BONSNAP</span>
                {!isMecha && <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>}
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
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center border shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-active:scale-95 ${isMecha ? 'bg-slate-800/80 border-slate-700/50 shadow-blue-500/10 group-hover:shadow-blue-500/30' : 'bg-white/80 border-white/60 shadow-pink-500/5 group-hover:shadow-pink-500/20'} ${action.bg}`}>
                  <action.icon size={24} className={`transition-transform duration-300 group-hover:scale-110 ${isMecha ? action.color.replace('500', '400') : action.color}`} strokeWidth={2.5} />
                </div>
                <span className={`text-[11px] font-black tracking-tight ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>{action.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* 3. Spending Trend Chart (Premium Anime Style) */}
          <motion.div variants={itemVariants} className={`p-6 rounded-[32px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border backdrop-blur-sm ${isMecha ? 'bg-slate-900/80 border-slate-700' : 'bg-white/90 border-slate-100/80'}`}>
             <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                   <div className={`p-2.5 rounded-[14px] shadow-sm ${isMecha ? 'bg-slate-800 text-purple-400 border border-slate-700' : 'bg-gradient-to-br from-pink-50 to-purple-50 text-pink-500 border border-pink-100/50'}`}>
                      <Activity size={18} strokeWidth={2.5} />
                   </div>
                   <h3 className={`text-[14px] font-bold uppercase tracking-[0.1em] ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>Weekly Expense 📈</h3>
                </div>
             </div>
             
             <div className="flex justify-between items-end h-32 gap-2 mt-2">
                {[
                  { day: 'Mon', h: '40%', val: '40k' },
                  { day: 'Tue', h: '70%', val: '70k' },
                  { day: 'Wed', h: '30%', val: '30k' },
                  { day: 'Thu', h: '90%', val: '90k', today: true },
                  { day: 'Fri', h: '50%', val: '50k' },
                  { day: 'Sat', h: '20%', val: '20k' },
                  { day: 'Sun', h: '10%', val: '10k' },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 gap-2 group h-full">
                     <span className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>{bar.val}</span>
                     <div className="w-full relative flex justify-center h-full items-end">
                       {/* Ghost Bar */}
                       <div className={`absolute bottom-0 w-3 sm:w-4 rounded-full transition-all duration-300 h-full ${isMecha ? 'bg-slate-800/50' : 'bg-slate-100'}`}></div>
                       {/* Active Bar */}
                       <div className={`relative w-3 sm:w-4 rounded-full transition-all duration-700 ease-out ${bar.today ? (isMecha ? 'bg-gradient-to-t from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-gradient-to-t from-pink-500 to-purple-500 shadow-[0_4px_15px_rgba(236,72,153,0.4)]') : (isMecha ? 'bg-slate-600 group-hover:bg-slate-500' : 'bg-slate-300 group-hover:bg-slate-400')} group-hover:scale-110`} style={{ height: bar.h }}></div>
                     </div>
                     <span className={`text-[11px] font-bold mt-1 tracking-wider ${bar.today ? (isMecha ? 'text-cyan-400' : 'text-pink-600') : (isMecha ? 'text-slate-500' : 'text-slate-400')}`}>{bar.day}</span>
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
                  className={`flex items-center gap-3 group relative cursor-pointer p-3.5 rounded-[20px] transition-all duration-300 hover:scale-[1.02] backdrop-blur-md border shadow-sm ${isMecha ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 hover:shadow-blue-500/10' : 'bg-white/60 border-white/60 hover:bg-white/90 hover:shadow-pink-500/10'}`}
                  onMouseEnter={() => { setMood(tx.hoverMood as any); setMsg(tx.hoverMsg); }}
                  onMouseLeave={() => { setMood("happy"); setMsg(defaultMsg); }}
                >
                  <div className={`p-2.5 rounded-[14px] shadow-sm ${tx.bg}`}>
                    {tx.iconName === 'Swords' && <Swords size={18} className={tx.color} />}
                    {tx.iconName === 'ShoppingBag' && <ShoppingBag size={18} className={tx.color} />}
                    {tx.iconName === 'Car' && <Car size={18} className={tx.color} />}
                    {tx.iconName === 'Coffee' && <Coffee size={18} className={tx.color} />}
                    {!['Swords', 'ShoppingBag', 'Car', 'Coffee'].includes(tx.iconName) && <ShoppingBag size={18} className={tx.color} />}
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`text-[14px] font-black tracking-tight ${isMecha ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-900'}`}>{tx.merchant}</div>
                    <div className="text-[11px] font-bold text-slate-400 group-hover:text-slate-500 transition-colors">{tx.category} • {tx.time}</div>
                  </div>
                  <div className={`text-[15px] font-black font-mono tracking-tighter ${isMecha ? 'text-red-400' : 'text-slate-800'}`}>
                    -Rp {tx.amount.toLocaleString('id-ID')}
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
                  <LogOut size={18} strokeWidth={3} /> LOG OUT
                </button>
                <div className="h-[200px] shrink-0 w-full"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};