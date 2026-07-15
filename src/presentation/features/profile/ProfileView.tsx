import React, { useState } from "react";
import { Camera, PieChart, Home, ReceiptText, User, ChevronLeft, MapPin, GraduationCap, Link2, Sparkles, Trophy, Scan, ShieldCheck, LogOut, Lock, Palette, Edit2, Settings, Image as ImageIcon, Gamepad2, Target, Heart, Tag, Medal, Crown, Download, Bell, PartyPopper, Coffee, PiggyBank, Flame, Ghost, Pizza, ChevronRight } from "lucide-react";
import { Mascot, MascotMood } from "../../shared/Mascot/Mascot";
import { ThemeState, Inventory, UserProfile } from '../../../core/entities';
import { motion, AnimatePresence } from "motion/react";
import { useMascotAI } from "../../hooks/useMascotAI";

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
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, scale: 0.95 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// Customization Options
export const AVATAR_OPTIONS = [
  { id: 'default', name: 'Default Anime', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 'custom1', name: 'Custom Avatar 1', imageUrl: '/avatars/custom1.png' },
  { id: 'custom2', name: 'Custom Avatar 2', imageUrl: '/avatars/custom2.png' },
];

const BANNER_OPTIONS = [
  { id: 'default', name: 'Default', bg: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400', imageUrl: '' },
  { id: 'neon', name: 'Neon City', bg: 'bg-gradient-to-r from-fuchsia-600 to-pink-600', imageUrl: '' },
  { id: 'holographic', name: 'Holographic', bg: 'bg-gradient-to-tr from-emerald-400 via-cyan-400 to-blue-500', imageUrl: '' },
  { id: 'dark', name: 'Dark Mode', bg: 'bg-gradient-to-br from-slate-800 to-slate-900', imageUrl: '' },
  { id: 'custom_banner1', name: 'Custom Banner 1', bg: 'bg-slate-200', imageUrl: '/banners/custom1.png' },
  { id: 'moonlit-sky-6', name: 'Moonlit Sky', bg: 'bg-slate-900', imageUrl: '/banners/moonlit-sky-6.gif' },
  { id: 'sakura-bridge', name: 'Sakura Bridge', bg: 'bg-pink-200', imageUrl: '/banners/sakura-bridge.gif' },
];

const FRAME_OPTIONS = [
  { id: 'none', name: 'None', class: 'border-4 border-white' },
  { id: 'gold', name: 'Gold VIP', class: 'border-[6px] border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]' },
  { id: 'neon', name: 'Cyber Neon', class: 'border-[6px] border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]' },
  { id: 'flame', name: 'Hot Streak', class: 'border-[6px] border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.7)]' },
  { id: 'stardust', name: 'Stardust Effect', class: 'border-4 border-transparent', imageUrl: '/gifs/Stardust.gif' },
  { id: 'digital-sunrise', name: 'Digital Sunrise', class: 'border-4 border-transparent', imageUrl: '/gifs/Digital_Sunrise.gif' },
  { id: 'dream-dive', name: 'Dream Dive Stars', class: 'border-4 border-transparent', imageUrl: '/gifs/Dream_Dive_Stars.gif' },
  { id: 'starlight', name: 'Starlight Revolver', class: 'border-4 border-transparent', imageUrl: '/gifs/Starlight_Revolver.gif' },
  { id: 'steampunk', name: 'Steampunk Ears', class: 'border-4 border-transparent', imageUrl: '/gifs/Steampunk_Cat_Ears.gif' }
];

export const WALLET_SKIN_OPTIONS = [
  { id: 'default', name: 'Default Magic', bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-white/40 shadow-purple-200/50 text-white' },
  { id: 'wallet-obsidian', name: 'Obsidian Black', bg: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black border-slate-700 shadow-slate-900/50 text-slate-100' },
  { id: 'wallet-hologram', name: 'Hologram Premium', bg: 'bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-500 border-teal-200 shadow-teal-300/50 text-white' },
  { id: 'wallet-gold', name: 'Royal Gold', bg: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 border-yellow-200 shadow-yellow-300/50 text-white' },
];

const PERSONAS = [
  "Wise Owl 🦉 (Master Saver)",
  "Coupon Hunter 🎫 (Promo Seeker)",
  "Gacha Victim 🎰 (Zero Luck)",
  "Dragon Hoarder 🐉 (Never Spends)",
  "Flashy Peacock 🦚 (Flexer)",
  "Coffee Zombie 🧟 (Caffeine Bankrupt)"
];

const ACCENT_COLORS = [
  { id: 'teal', color: 'text-teal-400', bg: 'bg-teal-400' },
  { id: 'pink', color: 'text-pink-500', bg: 'bg-pink-500' },
  { id: 'purple', color: 'text-purple-500', bg: 'bg-purple-500' },
  { id: 'orange', color: 'text-orange-500', bg: 'bg-orange-500' },
  { id: 'blue', color: 'text-blue-500', bg: 'bg-blue-500' },
  { id: 'gold', color: 'text-yellow-400', bg: 'bg-yellow-400' }
];

const ALL_ACHIEVEMENTS = [
  { id: '1', title: 'First Snap! 🎉', desc: 'Berhasil scan struk pertamamu.', icon: PartyPopper, color: 'text-amber-500', bg: 'bg-amber-100', unlocked: true },
  { id: '2', title: 'Coffee Addict ☕', desc: 'Scan 5 struk kopi dalam seminggu.', icon: Coffee, color: 'text-amber-700', bg: 'bg-amber-200', unlocked: true },
  { id: '3', title: 'Super Saver 💰', desc: 'Tidak ada pengeluaran hari ini.', icon: PiggyBank, color: 'text-pink-500', bg: 'bg-pink-100', unlocked: true },
  { id: '4', title: 'On Fire! 🔥', desc: 'Login 7 hari berturut-turut.', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100', unlocked: false },
  { id: '5', title: 'Invisible Money 👻', desc: 'Habis gajian tapi uangnya langsung hilang.', icon: Ghost, color: 'text-purple-500', bg: 'bg-purple-100', unlocked: false },
  { id: '6', title: 'Pizza Party 🍕', desc: 'Jajan fast-food terlalu banyak bulan ini.', icon: Pizza, color: 'text-red-500', bg: 'bg-red-100', unlocked: false },
];

export const ProfileView: React.FC<ProfileViewProps> = ({ onGoToCamera, onGoToDashboard, theme, onNavigate, points, level, inventory, setInventory, setTheme, userProfile, setUserProfile }) => {
  const isMecha = theme === 'mecha';
  const defaultMsg = "Profil lo udah cakep banget bestie! 💅";
  const { msg, mood, handleHover, resetMascot } = useMascotAI(userProfile.financialPersona, isMecha, defaultMsg, "happy");
  
  // Tab States for Modals
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingWallet, setIsEditingWallet] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [isViewingAchievements, setIsViewingAchievements] = useState(false);

  // Sync state with parent
  const activeAvatar = AVATAR_OPTIONS.find(a => a.id === userProfile.activeAvatarId) || AVATAR_OPTIONS[0];
  const setActiveAvatar = (opt: typeof AVATAR_OPTIONS[0]) => setUserProfile({...userProfile, activeAvatarId: opt.id});

  const activeBanner = BANNER_OPTIONS.find(b => b.id === userProfile.activeBannerId) || BANNER_OPTIONS[0];
  const setActiveBanner = (opt: typeof BANNER_OPTIONS[0]) => setUserProfile({...userProfile, activeBannerId: opt.id});
  
  const activeFrame = FRAME_OPTIONS.find(f => f.id === userProfile.activeFrameId) || FRAME_OPTIONS[1];
  const setActiveFrame = (opt: typeof FRAME_OPTIONS[0]) => setUserProfile({...userProfile, activeFrameId: opt.id});
  
  const name = userProfile.name;
  const setName = (v: string) => setUserProfile({...userProfile, name: v});
  const username = userProfile.username;
  const setUsername = (v: string) => setUserProfile({...userProfile, username: v});
  const bio = userProfile.bio;
  const setBio = (v: string) => setUserProfile({...userProfile, bio: v});
  const university = userProfile.university;
  const setUniversity = (v: string) => setUserProfile({...userProfile, university: v});
  const location = userProfile.location;
  const setLocation = (v: string) => setUserProfile({...userProfile, location: v});
  
  const financialPersona = userProfile.financialPersona;
  const setFinancialPersona = (v: string) => setUserProfile({...userProfile, financialPersona: v});
  const accentColor = userProfile.accentColor;
  const setAccentColor = (v: string) => setUserProfile({...userProfile, accentColor: v}); 
  const goalName = userProfile.goalName;
  const setGoalName = (v: string) => setUserProfile({...userProfile, goalName: v});
  const goalTarget = userProfile.goalTarget;
  const setGoalTarget = (v: string) => setUserProfile({...userProfile, goalTarget: v});
  const goalSaved = userProfile.goalSaved;
  const setGoalSaved = (v: string) => setUserProfile({...userProfile, goalSaved: v});

  const walletName = userProfile.walletName;
  const setWalletName = (v: string) => setUserProfile({...userProfile, walletName: v});
  const budget = userProfile.budget;
  const setBudget = (v: number) => setUserProfile({...userProfile, budget: v});
  
  const activeWalletSkin = WALLET_SKIN_OPTIONS.find(w => w.id === userProfile.activeWalletSkinId) || WALLET_SKIN_OPTIONS[0];
  const setActiveWalletSkin = (opt: typeof WALLET_SKIN_OPTIONS[0]) => setUserProfile({...userProfile, activeWalletSkinId: opt.id});

  const isMecha = theme === "mecha";

  const handleSelectAvatar = (opt: typeof AVATAR_OPTIONS[0]) => {
    if (inventory.avatars.includes(opt.id)) {
      setActiveAvatar(opt);
      handleHover(`Avatar ${opt.name} cakep banget! 😍`, "excited");
    } else {
      handleHover(`Ups, avatar ${opt.name} masih dikunci. Beli dulu di Rewards Hub! 🛍️`, "alert");
      onNavigate('store');
    }
  };

  const handleSelectBanner = (opt: typeof BANNER_OPTIONS[0]) => {
    if (inventory.banners.includes(opt.id)) {
      setActiveBanner(opt);
      handleHover(`Wah, banner ${opt.name} kelihatan keren banget! ✨`, "cute");
    } else {
      handleHover(`Ups, banner ${opt.name} belum kebuka. Beli dulu di Rewards Hub! 🛍️`, "alert");
      onNavigate('store');
    }
  };

  const handleSelectFrame = (opt: typeof FRAME_OPTIONS[0]) => {
    if (inventory.frames.includes(opt.id)) {
      setActiveFrame(opt);
      handleHover(`Frame ${opt.name} bikin foto profil lo makin bersinar! 👑`, "excited");
    } else {
      handleHover(`Ups, frame ${opt.name} masih dikunci. Beli dulu pakai poin! 🛍️`, "alert");
      onNavigate('store');
    }
  };

  const handleSelectWalletSkin = (opt: typeof WALLET_SKIN_OPTIONS[0]) => {
    if (inventory.walletSkins.includes(opt.id)) {
      setActiveWalletSkin(opt);
      handleHover(`Wallet Skin ${opt.name} aktif! 💳`, "excited");
    } else {
      handleHover(`Skin ${opt.name} belum dibeli! Beli dulu di Rewards Hub 🛒`, "alert");
      onNavigate('store');
    }
  };

  const renderCardBody = () => (
    <motion.div key="profile-card" variants={containerVariants} initial="hidden" animate="show" exit="exit" className="relative z-10 flex-1 w-full overflow-y-auto no-scrollbar pt-6 pb-[200px] px-4 flex flex-col">
      
      {/* Header Actions for Profile View */}
      <div className="w-full max-w-sm mx-auto flex justify-between items-center mb-4 px-2">
        <button onClick={onGoToDashboard} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMecha ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-white/80 text-slate-600 hover:bg-white shadow-sm'}`}>
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMecha ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-white/80 text-slate-600 hover:bg-white shadow-sm'}`}>
          <LogOut size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Discord Style Card Container */}
      <div className={`w-full max-w-sm mx-auto rounded-[24px] shadow-2xl overflow-hidden relative shrink-0 backdrop-blur-md transition-colors duration-500 ${isMecha ? 'bg-slate-900/80 border border-slate-700 shadow-blue-900/20' : 'bg-white/80 border border-white/60 shadow-slate-200/50'}`}>
        
        {/* Banner */}
        <div 
           className={`h-32 w-full relative transition-all duration-500 ${activeBanner.bg}`}
           style={activeBanner.imageUrl ? { backgroundImage: `url(${activeBanner.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {/* Edit Profile Button over banner */}
          <button onClick={() => setIsEditing(true)} className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 flex items-center gap-1.5 text-white backdrop-blur-md transition-colors text-[10px] font-bold uppercase tracking-wider">
            <Edit2 size={12} /> Edit Profile
          </button>
        </div>

        {/* Avatar & Content Wrapper */}
        <div className="relative px-5 pb-6">
          
          {/* Avatar (Floating over banner) */}
          <div className="absolute -top-[52px] left-5 p-1.5 rounded-full" style={{ backgroundColor: isMecha ? '#0f172a' : '#ffffff' }}>
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${activeFrame.class}`}>
              {/* Outer GIF layer if available */}
              {activeFrame.imageUrl && (
                <div 
                  className="absolute inset-0 z-30 rounded-full pointer-events-none scale-125 mix-blend-screen opacity-90"
                  style={{ 
                    backgroundImage: `url(${activeFrame.imageUrl})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 50%)',
                    maskImage: 'radial-gradient(circle, transparent 40%, black 50%)'
                  }}
                />
              )}
              {/* Actual Avatar */}
              <div className="w-full h-full rounded-full overflow-hidden bg-white relative z-10 border-2 border-white">
                <img 
                  src={activeAvatar.imageUrl} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Badges right-aligned in the same row as the top of the body */}
          <div className="flex justify-end pt-3 pb-2 gap-1.5 h-[52px] items-start">
            <div className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-100 text-pink-600'}`}>Verified</div>
            <div className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${isMecha ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}`}>Premium</div>
          </div>

          {/* User Info */}
          <div className="mt-2">
            <h1 className={`text-xl font-black tracking-tight ${accentColor}`}>{name}</h1>
            <div className="flex items-center gap-2 mt-0.5">
               <p className={`text-xs font-bold font-mono ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>@{username}</p>
               <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${isMecha ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>{financialPersona}</span>
            </div>
          </div>

          <hr className={`my-4 ${isMecha ? 'border-slate-800' : 'border-slate-100'}`} />

          {/* About Me Inset Box */}
          <div>
            <h2 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>About Me</h2>
            <div className={`p-3.5 rounded-[12px] text-xs leading-relaxed font-medium whitespace-pre-wrap ${isMecha ? 'bg-slate-950 text-slate-300 border border-slate-800' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
              {bio}
            </div>
          </div>

          {/* Quick Details (Univ & Location) */}
          <div className="flex items-center gap-3 mt-4 text-[11px] font-bold">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isMecha ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
              <GraduationCap size={14} className={isMecha ? 'text-teal-400' : 'text-pink-500'} />
              <span>{university}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isMecha ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
              <MapPin size={14} className={isMecha ? 'text-blue-400' : 'text-purple-500'} />
              <span>{location}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <h2 className={`text-[10px] font-black uppercase tracking-widest mt-5 mb-2 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Stats & Info</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 rounded-[12px] flex flex-col justify-center border backdrop-blur-md shadow-sm ${isMecha ? 'bg-slate-950/50 border-slate-800' : 'bg-white/60 border-white/60'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={14} className="text-yellow-500" />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Rank</span>
              </div>
              <span className={`text-lg font-black font-mono ${isMecha ? 'text-white' : 'text-slate-800'}`}>Lvl {level}</span>
            </div>
            
            <div onClick={() => onNavigate("store")} className={`p-3 rounded-[12px] flex flex-col justify-center border cursor-pointer hover:scale-105 transition-transform backdrop-blur-md shadow-sm ${isMecha ? 'bg-slate-950/50 border-slate-800 hover:shadow-blue-500/10' : 'bg-white/60 border-white/60 hover:shadow-pink-500/10'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} className={isMecha ? 'text-blue-400' : 'text-pink-500'} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Points</span>
              </div>
              <span className={`text-lg font-black font-mono ${isMecha ? 'text-white' : 'text-slate-800'}`}>{points}</span>
            </div>
          </div>

          {/* Monthly Budget (More Useful Widget) */}
          <div onClick={() => setIsEditingWallet(true)} className={`mt-5 p-4 rounded-[16px] border cursor-pointer hover:scale-[1.02] transition-transform backdrop-blur-md shadow-sm ${isMecha ? 'bg-slate-950/50 border-slate-800 hover:shadow-blue-500/10' : 'bg-white/60 border-white/60 hover:shadow-pink-500/10'}`}>
             <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                   <div className={`p-1.5 rounded-lg ${isMecha ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                      <ReceiptText size={14} />
                   </div>
                   <h3 className={`text-[11px] font-black uppercase tracking-widest ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>Budget Bulan Ini</h3>
                </div>
                <div className="flex items-center gap-2">
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isMecha ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'}`}>Over budget!</span>
                   <Edit2 size={12} className={isMecha ? 'text-slate-500' : 'text-slate-400'} />
                </div>
             </div>
             
             <div className="flex justify-between items-end mb-2">
                <div>
                   <p className={`text-[10px] font-bold ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Terpakai</p>
                   <p className={`text-lg font-black font-mono leading-none mt-0.5 ${isMecha ? 'text-white' : 'text-slate-800'}`}>Rp 3.200k</p>
                </div>
                <div className="text-right">
                   <p className={`text-[10px] font-bold ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Batas</p>
                   <p className={`text-sm font-black font-mono leading-none mt-0.5 ${isMecha ? 'text-slate-400' : 'text-slate-600'}`}>Rp 3.000k</p>
                </div>
             </div>

             <div className={`w-full h-2 rounded-full overflow-hidden ${isMecha ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div className={`h-full rounded-full w-full ${isMecha ? 'bg-gradient-to-r from-rose-500 to-red-500' : 'bg-gradient-to-r from-rose-400 to-red-500'}`}></div>
             </div>
             <p className={`text-[10px] font-medium mt-3 italic ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>
                "Wah, pengeluaranmu bulan ini jebol 200rb nih! Kurang-kurangin jajan ya bestie."
             </p>
          </div>

          {/* Savings Goal Widget */}
          <div onClick={() => setIsEditingGoal(true)} className={`mt-3 p-3.5 rounded-[16px] border cursor-pointer hover:scale-[1.02] transition-transform backdrop-blur-md shadow-sm ${isMecha ? 'bg-slate-950/50 border-slate-800 hover:shadow-blue-500/10' : 'bg-white/60 border-white/60 hover:shadow-pink-500/10'}`}>
             <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-1.5 overflow-hidden">
                   <Target size={14} className={accentColor} />
                   <span className={`text-xs font-bold truncate ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>{goalName}</span>
                   <Edit2 size={10} className={`ml-1 ${isMecha ? 'text-slate-600' : 'text-slate-400'}`} />
                </div>
                <span className={`text-[10px] font-mono font-bold shrink-0 ml-2 ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>
                   {Math.min(100, Math.round((Number(goalSaved) / (Number(goalTarget) || 1)) * 100))}%
                </span>
             </div>
             <div className={`w-full h-2 rounded-full overflow-hidden relative ${isMecha ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div 
                   className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${isMecha ? 'bg-slate-600' : 'bg-slate-400'}`} 
                   style={{ width: `${Math.min(100, Math.round((Number(goalSaved) / (Number(goalTarget) || 1)) * 100))}%` }}
                >
                   <div className={`w-full h-full ${accentColor.replace('text-', 'bg-')}`}></div>
                </div>
             </div>
             <p className={`text-[9px] font-bold mt-2 text-right ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>
                Rp {Number(goalSaved).toLocaleString('id-ID')} / Rp {Number(goalTarget).toLocaleString('id-ID')}
             </p>
          </div>

          {/* Roles Widget */}
          <h2 className={`text-[10px] font-black uppercase tracking-widest mt-5 mb-2 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Roles</h2>
          <div className="flex flex-wrap gap-2">
             <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${isMecha ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
                <div className="w-2 h-2 rounded-full bg-red-500"></div> Gacha Victim
             </div>
             <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${isMecha ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
                <div className="w-2 h-2 rounded-full bg-teal-400"></div> Budget Ninja
             </div>
             <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${isMecha ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
                <div className="w-2 h-2 rounded-full bg-pink-500"></div> Matcha Lover
             </div>
             <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border cursor-pointer hover:scale-105 ${isMecha ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                <Tag size={10} /> +2
             </div>
          </div>

          {/* Integration Links */}
          <h2 className={`text-[10px] font-black uppercase tracking-widest mt-5 mb-2 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Connections</h2>
          <div className="flex flex-col gap-2">
            <div className={`p-3 rounded-[12px] flex items-center justify-between border cursor-pointer transition-colors backdrop-blur-md shadow-sm ${isMecha ? 'bg-slate-950/50 border-slate-800 hover:bg-slate-900/80' : 'bg-white/60 border-white/60 hover:bg-white/90'}`} onMouseEnter={() => { handleHover("Mau nyambungin ke Instagram ya? 🔗", "thinking"); }} onMouseLeave={resetMascot}>
              <div className="flex items-center gap-3">
                <Link2 size={16} className={isMecha ? 'text-slate-400' : 'text-slate-500'} />
                <div className={`font-bold text-xs ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>Linked Accounts</div>
              </div>
              <ChevronLeft size={14} className="text-slate-400 rotate-180" />
            </div>
            
            <div className={`p-3 rounded-[12px] flex items-center justify-between border cursor-pointer transition-colors backdrop-blur-md shadow-sm ${isMecha ? 'bg-slate-950/50 border-slate-800 hover:bg-slate-900/80' : 'bg-white/60 border-white/60 hover:bg-white/90'}`} onMouseEnter={() => { handleHover("Mau ngatur privasi akun? 🔒", "thinking"); }} onMouseLeave={resetMascot}>
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className={isMecha ? 'text-slate-400' : 'text-slate-500'} />
                <div className={`font-bold text-xs ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>Privacy & Security</div>
              </div>
              <ChevronLeft size={14} className="text-slate-400 rotate-180" />
            </div>
          </div>

        </div>
      </div>

      {/* OUTSIDE THE CARD: Extra Widgets */}
      <div className="w-full max-w-sm mx-auto mt-6 flex flex-col gap-4 shrink-0">
        
        {/* Achievements Showcase (Compact & Clickable) */}
        <div className="w-full">
           <div className="flex items-center justify-between mb-2 px-1 cursor-pointer" onClick={() => setIsViewingAchievements(true)}>
              <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-white' : 'text-slate-800'}`}>Achievements</h2>
              <div className="flex items-center gap-1">
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isMecha ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>3 / 50</span>
                 <ChevronRight size={14} className={isMecha ? 'text-slate-500' : 'text-slate-400'} />
              </div>
           </div>
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-1">
              {ALL_ACHIEVEMENTS.filter(a => a.unlocked).map(ach => (
                 <div key={ach.id} onClick={() => setIsViewingAchievements(true)} className={`shrink-0 w-12 h-12 rounded-[16px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-sm border ${isMecha ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}>
                    <div className={`p-2 rounded-xl ${ach.bg} ${isMecha ? 'bg-opacity-20' : ''}`}>
                       <ach.icon size={16} className={ach.color} />
                    </div>
                 </div>
              ))}
              <div onClick={() => setIsViewingAchievements(true)} className={`shrink-0 w-12 h-12 rounded-[16px] flex items-center justify-center border-2 border-dashed cursor-pointer hover:scale-105 transition-transform ${isMecha ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}>
                 <Lock size={14} className={isMecha ? 'text-slate-600' : 'text-slate-300'} />
              </div>
           </div>
        </div>

        {/* System Settings & Tools */}
        <div className="w-full">
           <div className="flex items-center justify-between mb-3 px-1">
              <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-white' : 'text-slate-800'}`}>System & Tools</h2>
           </div>
           <div className={`rounded-[24px] overflow-hidden border shadow-sm backdrop-blur-md ${isMecha ? 'bg-slate-900/50 border-slate-800/50' : 'bg-white/60 border-white/60'}`}>
              
              <div className={`p-4 border-b flex items-center justify-between transition-colors cursor-pointer ${isMecha ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-100 hover:bg-slate-50'}`} onMouseEnter={() => { handleHover("Biar kamu nggak ketinggalan info diskon! 🔔", "thinking"); }} onMouseLeave={resetMascot}>
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMecha ? 'bg-slate-800 text-blue-400' : 'bg-blue-50 text-blue-500'}`}>
                       <Bell size={20} />
                    </div>
                    <div>
                       <div className={`font-black text-sm ${isMecha ? 'text-slate-200' : 'text-slate-700'}`}>Notifications</div>
                       <div className={`text-[10px] font-bold ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Manage alerts & reminders</div>
                    </div>
                 </div>
                 <ChevronLeft size={18} className="text-slate-400 rotate-180" />
              </div>

              <div className={`p-4 border-b flex items-center justify-between transition-colors cursor-pointer ${isMecha ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-100 hover:bg-slate-50'}`} onMouseEnter={() => { handleHover("Cetak laporan keuanganmu jadi Excel keren! 📊", "excited"); }} onMouseLeave={resetMascot}>
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMecha ? 'bg-slate-800 text-emerald-400' : 'bg-emerald-50 text-emerald-500'}`}>
                       <Download size={20} />
                    </div>
                    <div>
                       <div className={`font-black text-sm ${isMecha ? 'text-slate-200' : 'text-slate-700'}`}>Export to Excel</div>
                       <div className={`text-[10px] font-bold ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Download professional ledger</div>
                    </div>
                 </div>
                 <ChevronLeft size={18} className="text-slate-400 rotate-180" />
              </div>

              <div onClick={() => setIsEditingWallet(true)} className={`p-4 border-b flex items-center justify-between transition-colors cursor-pointer ${isMecha ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-100 hover:bg-slate-50'}`} onMouseEnter={() => { handleHover("Atur nama dompet sama skinnya ya! 💳", "thinking"); }} onMouseLeave={resetMascot}>
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMecha ? 'bg-slate-800 text-purple-400' : 'bg-purple-50 text-purple-500'}`}>
                       <ReceiptText size={20} />
                    </div>
                    <div>
                       <div className={`font-black text-sm ${isMecha ? 'text-slate-200' : 'text-slate-700'}`}>Wallet Settings</div>
                       <div className={`text-[10px] font-bold ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Manage budget & skins</div>
                    </div>
                 </div>
                 <ChevronLeft size={18} className="text-slate-400 rotate-180" />
              </div>

              <div className={`p-4 flex items-center justify-between transition-colors cursor-pointer ${isMecha ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`} onMouseEnter={() => { handleHover("Bosan dengan tampilannya? Ayo atur aplikasinya! ⚙️", "happy"); }} onMouseLeave={resetMascot}>
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMecha ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                       <Settings size={20} />
                    </div>
                    <div>
                       <div className={`font-black text-sm ${isMecha ? 'text-slate-200' : 'text-slate-700'}`}>App Settings</div>
                       <div className={`text-[10px] font-bold ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Language, theme, and more</div>
                    </div>
                 </div>
                 <ChevronLeft size={18} className="text-slate-400 rotate-180" />
              </div>

           </div>
        </div>
        
      </div>

    </motion.div>
  );

  const renderAchievementsMode = () => (
    <motion.div key="achievements-view" variants={containerVariants} initial="hidden" animate="show" exit="exit" className={`absolute inset-0 z-50 overflow-y-auto no-scrollbar flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900/40 text-white backdrop-blur-md' : 'bg-white/40 text-slate-800 backdrop-blur-md'}`}>
      
      {/* Header */}
      <div className={`pt-12 pb-4 px-6 flex items-center justify-between z-20 sticky top-0 backdrop-blur-md ${isMecha ? 'bg-slate-900/80 border-b border-slate-700' : 'bg-[#fdfbfb]/80 border-b border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsViewingAchievements(false)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMecha ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}>
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-xl font-black tracking-tight">Achievements</h1>
        </div>
      </div>

      <div className="px-6 pt-6 pb-12 flex flex-col gap-4">
        {ALL_ACHIEVEMENTS.map(ach => (
           <div key={ach.id} className={`p-4 rounded-[20px] flex gap-4 items-center border backdrop-blur-md shadow-sm transition-transform hover:scale-[1.02] ${ach.unlocked ? (isMecha ? 'bg-slate-800/60 border-slate-700/50 hover:shadow-blue-500/10' : 'bg-white/80 border-white/60 hover:shadow-pink-500/10') : (isMecha ? 'bg-slate-900/40 border-slate-800/50 opacity-60' : 'bg-white/40 border-white/40 opacity-60')}`}>
              <div className={`w-14 h-14 shrink-0 rounded-[16px] flex items-center justify-center ${ach.bg} ${isMecha && ach.unlocked ? 'bg-opacity-20' : ''}`}>
                 <ach.icon size={24} className={ach.unlocked ? ach.color : (isMecha ? 'text-slate-600' : 'text-slate-400')} />
              </div>
              <div className="flex-1">
                 <h3 className={`font-black text-sm mb-0.5 ${isMecha ? 'text-slate-200' : 'text-slate-700'}`}>
                    {ach.unlocked ? ach.title : '???'}
                 </h3>
                 <p className={`text-xs font-medium leading-snug ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>
                    {ach.unlocked ? ach.desc : 'Selesaikan misi rahasia untuk membuka pencapaian ini.'}
                 </p>
              </div>
              {!ach.unlocked && (
                 <Lock size={16} className={isMecha ? 'text-slate-600' : 'text-slate-300'} />
              )}
           </div>
        ))}
      </div>

    </motion.div>
  );

  const renderEditMode = () => (
    <motion.div key="edit-profile" variants={containerVariants} initial="hidden" animate="show" exit="exit" className={`absolute inset-0 z-50 overflow-y-auto no-scrollbar flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900/40 text-white backdrop-blur-md' : 'bg-white/40 text-slate-800 backdrop-blur-md'}`}>
      
      {/* Edit Mode Header */}
      <div className={`pt-12 pb-4 px-6 flex items-center justify-between z-20 sticky top-0 backdrop-blur-md ${isMecha ? 'bg-slate-900/80 border-b border-slate-700' : 'bg-[#fdfbfb]/80 border-b border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsEditing(false)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMecha ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}>
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-xl font-black tracking-tight">Edit Profile</h1>
        </div>
      </div>

      <div className="px-6 pt-6 pb-12 flex-1">
        
        {/* Profile Info Customization */}
        <div className="mb-10 flex flex-col gap-5">
          <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>Personal Info</h2>
          
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-300' : 'text-slate-600'}`}>Display Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`w-full p-3 rounded-[12px] font-bold text-sm outline-none border transition-colors backdrop-blur-sm ${isMecha ? 'bg-slate-900/50 border-slate-700 text-white focus:border-blue-500 shadow-inner' : 'bg-white/80 border-white/60 text-slate-800 focus:border-pink-400 shadow-sm'}`} />
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-300' : 'text-slate-600'}`}>Username</label>
            <div className={`flex items-center w-full p-3 rounded-[12px] font-bold text-sm border transition-colors backdrop-blur-sm ${isMecha ? 'bg-slate-900/50 border-slate-700 focus-within:border-blue-500 shadow-inner' : 'bg-white/80 border-white/60 focus-within:border-pink-400 shadow-sm'}`}>
               <span className={isMecha ? 'text-slate-600' : 'text-slate-400'}>@</span>
               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-transparent outline-none ml-1 text-inherit" />
            </div>
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-300' : 'text-slate-600'}`}>Bio / About Me</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className={`w-full p-3 rounded-[12px] font-medium text-xs outline-none border transition-colors resize-none backdrop-blur-sm ${isMecha ? 'bg-slate-900/50 border-slate-700 text-white focus:border-blue-500 shadow-inner' : 'bg-white/80 border-white/60 text-slate-800 focus:border-pink-400 shadow-sm'}`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div>
               <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-300' : 'text-slate-600'}`}>University</label>
               <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} className={`w-full p-3 rounded-[12px] font-bold text-xs outline-none border transition-colors backdrop-blur-sm ${isMecha ? 'bg-slate-900/50 border-slate-700 text-white focus:border-blue-500 shadow-inner' : 'bg-white/80 border-white/60 text-slate-800 focus:border-pink-400 shadow-sm'}`} />
             </div>
             <div>
               <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-300' : 'text-slate-600'}`}>Location</label>
               <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={`w-full p-3 rounded-[12px] font-bold text-xs outline-none border transition-colors backdrop-blur-sm ${isMecha ? 'bg-slate-900/50 border-slate-700 text-white focus:border-blue-500 shadow-inner' : 'bg-white/80 border-white/60 text-slate-800 focus:border-pink-400 shadow-sm'}`} />
             </div>
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 mt-2 ${isMecha ? 'text-slate-300' : 'text-slate-600'}`}>Financial Spirit Persona</label>
            <select value={financialPersona} onChange={(e) => setFinancialPersona(e.target.value)} className={`w-full p-3 rounded-[12px] font-bold text-xs outline-none border transition-colors backdrop-blur-sm appearance-none ${isMecha ? 'bg-slate-900/50 border-slate-700 text-white focus:border-blue-500 shadow-inner' : 'bg-white/80 border-white/60 text-slate-800 focus:border-pink-400 shadow-sm'}`}>
               {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 mt-2 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Signature Accent Color</label>
            <div className="flex gap-3">
               {ACCENT_COLORS.map(c => (
                  <button key={c.id} onClick={() => setAccentColor(c.color)} className={`w-8 h-8 rounded-full ${c.bg} shadow-sm border-2 transition-transform ${accentColor === c.color ? 'border-white scale-110 shadow-md' : 'border-transparent hover:scale-105'}`} />
               ))}
            </div>
          </div>
        </div>

        {/* Avatar Customization */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>Select Avatar</h2>
            <button onClick={() => onNavigate("store")} className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-100 text-purple-600'}`}>
               <User size={10} /> Get More
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {AVATAR_OPTIONS.map(opt => {
              const isOwned = inventory.avatars.includes(opt.id);
              const isActive = activeAvatar.id === opt.id;
              return (
                <button 
                  key={opt.id}
                  onClick={() => handleSelectAvatar(opt)}
                  className={`p-2 rounded-[16px] border-2 transition-all flex flex-col items-center gap-2 text-center ${isActive ? (isMecha ? 'border-blue-500 bg-blue-900/20' : 'border-purple-500 bg-purple-50 shadow-sm') : (isMecha ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white')}`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden relative bg-slate-200">
                     <img src={opt.imageUrl} className="w-full h-full object-cover" alt="" />
                     {!isOwned && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Lock size={12} className="text-white" /></div>}
                  </div>
                  <span className={`text-[9px] font-bold leading-tight ${isActive ? (isMecha ? 'text-blue-400' : 'text-purple-600') : (isMecha ? 'text-slate-300' : 'text-slate-600')}`}>{opt.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Banner Customization */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>Select Banner Theme</h2>
            <button onClick={() => onNavigate("store")} className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-100 text-purple-600'}`}>
               <Palette size={10} /> Get More
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {BANNER_OPTIONS.map(opt => {
              const isOwned = inventory.banners.includes(opt.id);
              const isActive = activeBanner.id === opt.id;
              return (
                <button 
                  key={opt.id}
                  onClick={() => handleSelectBanner(opt)}
                  className={`p-3 rounded-[16px] border-2 transition-all flex flex-col gap-2 text-left ${isActive ? (isMecha ? 'border-blue-500 bg-blue-900/20' : 'border-purple-500 bg-purple-50 shadow-sm') : (isMecha ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white')}`}
                >
                  <div 
                     className={`w-full h-12 rounded-lg ${opt.bg}`}
                     style={opt.imageUrl ? { backgroundImage: `url(${opt.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  ></div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {!isOwned && <Lock size={12} className={isMecha ? 'text-slate-500' : 'text-slate-400'} />}
                    <span className={`text-xs font-bold ${isActive ? (isMecha ? 'text-blue-400' : 'text-purple-600') : (isMecha ? 'text-slate-300' : 'text-slate-600')}`}>{opt.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Frame Customization */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>Select Avatar Frame</h2>
            <button onClick={() => onNavigate("store")} className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-100 text-purple-600'}`}>
               <ImageIcon size={10} /> Get More
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {FRAME_OPTIONS.map(opt => {
              const isOwned = inventory.frames.includes(opt.id);
              const isActive = activeFrame.id === opt.id;
              return (
                <button 
                  key={opt.id}
                  onClick={() => handleSelectFrame(opt)}
                  className={`p-3 rounded-[16px] border-2 transition-all flex items-center gap-3 text-left ${isActive ? (isMecha ? 'border-teal-500 bg-teal-900/20' : 'border-pink-500 bg-pink-50 shadow-sm') : (isMecha ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white')}`}
                >
                  <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center relative ${opt.class}`}>
                    {opt.imageUrl && (
                       <div 
                         className="absolute inset-0 z-30 rounded-full pointer-events-none scale-125 mix-blend-screen opacity-90"
                         style={{ 
                           backgroundImage: `url(${opt.imageUrl})`, 
                           backgroundSize: 'cover', 
                           backgroundPosition: 'center',
                           WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 50%)',
                           maskImage: 'radial-gradient(circle, transparent 40%, black 50%)'
                         }}
                       />
                    )}
                    <div className="w-full h-full rounded-full bg-slate-200 border-2 border-white relative z-10 overflow-hidden">
                       <img src={activeAvatar.imageUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 overflow-hidden">
                    {!isOwned && <Lock size={12} className={`shrink-0 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`} />}
                    <span className={`text-xs font-bold truncate ${isActive ? (isMecha ? 'text-teal-400' : 'text-pink-600') : (isMecha ? 'text-slate-300' : 'text-slate-600')}`}>{opt.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderGoalMode = () => (
    <motion.div key="edit-goal" variants={containerVariants} initial="hidden" animate="show" exit="exit" className={`absolute inset-0 z-50 overflow-y-auto no-scrollbar flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900/40 text-white backdrop-blur-md' : 'bg-white/40 text-slate-800 backdrop-blur-md'}`}>
      <div className={`pt-12 pb-4 px-6 flex items-center justify-between z-20 sticky top-0 backdrop-blur-md ${isMecha ? 'bg-slate-900/80 border-b border-slate-700' : 'bg-[#fdfbfb]/80 border-b border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsEditingGoal(false)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMecha ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}>
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-xl font-black tracking-tight">Savings Goal</h1>
        </div>
      </div>

      <div className="px-6 pt-6 pb-12 flex-1">
        <div className="mb-10 flex flex-col gap-5">
          <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>Savings Goal Target</h2>
          
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>What are you saving for?</label>
            <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)} className={`w-full p-3 rounded-[12px] font-bold text-sm outline-none border transition-colors ${isMecha ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500'}`} placeholder="e.g. PS5, Konser, Liburan" />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div>
               <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Target (Rp)</label>
               <input type="number" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} className={`w-full p-3 rounded-[12px] font-bold text-xs outline-none border transition-colors ${isMecha ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500'}`} />
             </div>
             <div>
               <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Saved So Far (Rp)</label>
               <input type="number" value={goalSaved} onChange={(e) => setGoalSaved(e.target.value)} className={`w-full p-3 rounded-[12px] font-bold text-xs outline-none border transition-colors ${isMecha ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500'}`} />
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderWalletMode = () => (
    <motion.div key="edit-wallet" variants={containerVariants} initial="hidden" animate="show" exit="exit" className={`absolute inset-0 z-50 overflow-y-auto no-scrollbar flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900/40 text-white backdrop-blur-md' : 'bg-white/40 text-slate-800 backdrop-blur-md'}`}>
      <div className={`pt-12 pb-4 px-6 flex items-center justify-between z-20 sticky top-0 backdrop-blur-md ${isMecha ? 'bg-slate-900/80 border-b border-slate-700' : 'bg-[#fdfbfb]/80 border-b border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsEditingWallet(false)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMecha ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}>
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <h1 className="text-xl font-black tracking-tight">Wallet Settings</h1>
        </div>
      </div>

      <div className="px-6 pt-6 pb-12 flex-1">
        <div className="mb-10 flex flex-col gap-5">
          <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>Wallet Setup</h2>
          
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Wallet Name</label>
            <input type="text" value={walletName} onChange={(e) => setWalletName(e.target.value)} className={`w-full p-3 rounded-[12px] font-bold text-sm outline-none border transition-colors ${isMecha ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500'}`} placeholder="e.g. MAGIC POUCH" />
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Monthly Budget (Rp)</label>
            <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className={`w-full p-3 rounded-[12px] font-bold text-xs outline-none border transition-colors ${isMecha ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500'}`} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <label className={`block text-[10px] font-bold uppercase tracking-wider ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Wallet Skin</label>
              <button onClick={() => onNavigate("store")} className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-100 text-purple-600'}`}>
                 <Palette size={10} /> Get More
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {WALLET_SKIN_OPTIONS.map(opt => {
                const isOwned = inventory.walletSkins.includes(opt.id);
                const isActive = activeWalletSkin.id === opt.id;
                return (
                  <button 
                    key={opt.id}
                    onClick={() => handleSelectWalletSkin(opt)}
                    className={`p-3 rounded-[16px] border-2 transition-all backdrop-blur-sm flex flex-col gap-2 text-left ${isActive ? (isMecha ? 'border-blue-500 bg-blue-900/30' : 'border-purple-500 bg-white/50 shadow-sm') : (isMecha ? 'border-slate-700/50 bg-slate-800/40' : 'border-white/60 bg-white/40')}`}
                  >
                    <div className={`w-full h-12 rounded-lg ${opt.bg} border`} />
                    <div className="flex items-center gap-1.5 mt-1">
                      {!isOwned && <Lock size={12} className={isMecha ? 'text-slate-500' : 'text-slate-400'} />}
                      <span className={`text-xs font-bold ${isActive ? (isMecha ? 'text-blue-400' : 'text-purple-600') : (isMecha ? 'text-slate-300' : 'text-slate-600')}`}>{opt.name}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900 text-slate-200' : 'bg-[#fdfbfb] text-slate-800'}`}>
      
      {/* The Global Background */}
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-top transition-all duration-1000 ${isMecha ? 'mix-blend-luminosity opacity-20' : 'opacity-40'}`}
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <AnimatePresence mode="wait">
        {isViewingAchievements ? renderAchievementsMode() : 
         isEditingGoal ? renderGoalMode() :
         isEditingWallet ? renderWalletMode() :
         isEditing ? renderEditMode() : 
         renderCardBody()}
      </AnimatePresence>

      {/* Modern Floating Bottom Navigation (Only visible when NOT editing/viewing modals) */}
      <AnimatePresence>
        {!isEditing && !isViewingAchievements && !isEditingGoal && !isEditingWallet && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] h-[72px] backdrop-blur-2xl border rounded-[32px] px-2 flex justify-between items-center z-40 pointer-events-auto ${isMecha ? 'bg-slate-800/95 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/95 border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]'}`}>
            
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

          </motion.div>
        )}
      </AnimatePresence>

      <Mascot mood={mood} message={msg} theme={theme} placement="right" />
    </div>
  );
};
