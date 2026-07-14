import React, { useState } from "react";
import { Camera, PieChart, Home, ReceiptText, User, ChevronLeft, MapPin, GraduationCap, Link2, Sparkles, Trophy, Scan, ShieldCheck, LogOut, Lock, Palette, Edit2, Settings, Image as ImageIcon, Gamepad2, Target, Heart, Tag, Medal, Crown, Download, Bell } from "lucide-react";
import { Mascot, MascotMood } from "./Mascot";
import { ThemeState, Inventory } from '../App';
import { motion, AnimatePresence } from "motion/react";

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
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, scale: 0.95 }
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
  { id: 'stardust', name: 'Stardust Effect', class: 'border-4 border-transparent', imageUrl: '/gifs/Stardust.gif' },
  { id: 'digital-sunrise', name: 'Digital Sunrise', class: 'border-4 border-transparent', imageUrl: '/gifs/Digital_Sunrise.gif' },
  { id: 'dream-dive', name: 'Dream Dive Stars', class: 'border-4 border-transparent', imageUrl: '/gifs/Dream_Dive_Stars.gif' },
  { id: 'starlight', name: 'Starlight Revolver', class: 'border-4 border-transparent', imageUrl: '/gifs/Starlight_Revolver.gif' },
  { id: 'steampunk', name: 'Steampunk Ears', class: 'border-4 border-transparent', imageUrl: '/gifs/Steampunk_Cat_Ears.gif' }
];

export const ProfileView: React.FC<ProfileViewProps> = ({ onGoToCamera, onGoToDashboard, theme, onNavigate, points, level, inventory }) => {
  const [mood, setMood] = useState<MascotMood>("happy");
  const [msg, setMsg] = useState("Profil lo udah cakep banget bestie! 💅");
  
  // Customization State
  const [activeBanner, setActiveBanner] = useState(BANNER_OPTIONS[0]);
  const [activeFrame, setActiveFrame] = useState(FRAME_OPTIONS[1]);
  
  // Tab State for Discord Style Edit
  const [isEditing, setIsEditing] = useState(false);

  const isMecha = theme === "mecha";

  const handleSelectBanner = (opt: typeof BANNER_OPTIONS[0]) => {
    if (inventory.banners.includes(opt.id)) {
      setActiveBanner(opt);
      setMood("cute"); setMsg(`Wah, banner ${opt.name} kelihatan keren banget! ✨`);
    } else {
      setMood("alert"); setMsg(`Ups, banner ${opt.name} belum kebuka. Beli dulu di Rewards Hub! 🛍️`);
      onNavigate('store');
    }
  };

  const handleSelectFrame = (opt: typeof FRAME_OPTIONS[0]) => {
    if (inventory.frames.includes(opt.id)) {
      setActiveFrame(opt);
      setMood("excited"); setMsg(`Frame ${opt.name} bikin foto profil lo makin bersinar! 👑`);
    } else {
      setMood("alert"); setMsg(`Ups, frame ${opt.name} masih dikunci. Beli dulu pakai poin! 🛍️`);
      onNavigate('store');
    }
  };

  const renderCardBody = () => (
    <motion.div key="profile-card" variants={containerVariants} initial="hidden" animate="show" exit="exit" className="relative z-10 flex-1 w-full overflow-y-auto no-scrollbar pt-6 pb-[120px] px-4 flex flex-col">
      
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
      <div className={`w-full max-w-sm mx-auto rounded-[24px] shadow-2xl overflow-hidden relative shrink-0 ${isMecha ? 'bg-slate-900 border border-slate-700 shadow-blue-900/20' : 'bg-white border border-slate-200 shadow-slate-200/50'}`}>
        
        {/* Banner */}
        <div className={`h-32 w-full relative transition-all duration-500 ${activeBanner.bg}`}>
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
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400" 
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
            <h1 className={`text-xl font-black tracking-tight ${isMecha ? 'text-white' : 'text-slate-800'}`}>Sarah Jenkins</h1>
            <p className={`text-xs font-bold font-mono ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>@sarahj.str</p>
          </div>

          <hr className={`my-4 ${isMecha ? 'border-slate-800' : 'border-slate-100'}`} />

          {/* About Me Inset Box */}
          <div>
            <h2 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>About Me</h2>
            <div className={`p-3.5 rounded-[12px] text-xs leading-relaxed font-medium ${isMecha ? 'bg-slate-950 text-slate-300 border border-slate-800' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
              Coffee addict ☕ | UI/UX Designer by day, professional overthinker by night. Trying to stop my Shopee checkout habit (failed miserably).
            </div>
          </div>

          {/* Quick Details (Univ & Location) */}
          <div className="flex items-center gap-3 mt-4 text-[11px] font-bold">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isMecha ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
              <GraduationCap size={14} className={isMecha ? 'text-teal-400' : 'text-pink-500'} />
              <span>Universitas Indonesia</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isMecha ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
              <MapPin size={14} className={isMecha ? 'text-blue-400' : 'text-purple-500'} />
              <span>Jakarta Selatan</span>
            </div>
          </div>

          {/* Stats Grid */}
          <h2 className={`text-[10px] font-black uppercase tracking-widest mt-5 mb-2 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Stats & Info</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 rounded-[12px] flex flex-col justify-center border ${isMecha ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={14} className="text-yellow-500" />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Rank</span>
              </div>
              <span className={`text-lg font-black font-mono ${isMecha ? 'text-white' : 'text-slate-800'}`}>Lvl {level}</span>
            </div>
            
            <div onClick={() => onNavigate("store")} className={`p-3 rounded-[12px] flex flex-col justify-center border cursor-pointer hover:scale-105 transition-transform ${isMecha ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} className={isMecha ? 'text-blue-400' : 'text-pink-500'} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Points</span>
              </div>
              <span className={`text-lg font-black font-mono ${isMecha ? 'text-white' : 'text-slate-800'}`}>{points}</span>
            </div>
          </div>

          {/* Activity / Rich Presence (Discord Style) */}
          <div className={`mt-5 p-3.5 rounded-[16px] border flex gap-3 items-center ${isMecha ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/80 border-slate-100'}`}>
             <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-green-100 text-green-500'}`}>
                <Gamepad2 size={24} />
             </div>
             <div className="flex-1">
                <h3 className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${isMecha ? 'text-blue-400' : 'text-green-600'}`}>Playing</h3>
                <p className={`text-sm font-bold leading-tight ${isMecha ? 'text-slate-200' : 'text-slate-800'}`}>BONSNAP Financial Tracker</p>
                <p className={`text-[11px] font-medium ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>Scanning daily receipts... 🧾</p>
                <p className={`text-[11px] font-mono mt-0.5 ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Elapsed: 04:20:15</p>
             </div>
          </div>

          {/* Savings Goal Widget */}
          <div className={`mt-3 p-3.5 rounded-[16px] border ${isMecha ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
             <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-1.5">
                   <Target size={14} className={isMecha ? 'text-purple-400' : 'text-orange-500'} />
                   <span className={`text-xs font-bold ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>Tiket Konser Blackpink</span>
                </div>
                <span className={`text-[10px] font-mono font-bold ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>75%</span>
             </div>
             <div className={`w-full h-2 rounded-full overflow-hidden ${isMecha ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div className={`h-full rounded-full w-[75%] ${isMecha ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-orange-400 to-pink-500'}`}></div>
             </div>
             <p className={`text-[9px] font-bold mt-2 text-right ${isMecha ? 'text-slate-500' : 'text-slate-400'}`}>Rp 1.500.000 / Rp 2.000.000</p>
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
            <div className={`p-3 rounded-[12px] flex items-center justify-between border cursor-pointer transition-colors ${isMecha ? 'bg-slate-950 border-slate-800 hover:bg-slate-900' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`} onMouseEnter={() => { setMood("thinking"); setMsg("Mau nyambungin ke Instagram ya? 🔗"); }}>
              <div className="flex items-center gap-3">
                <Link2 size={16} className={isMecha ? 'text-slate-400' : 'text-slate-500'} />
                <div className={`font-bold text-xs ${isMecha ? 'text-slate-300' : 'text-slate-700'}`}>Linked Accounts</div>
              </div>
              <ChevronLeft size={14} className="text-slate-400 rotate-180" />
            </div>
            
            <div className={`p-3 rounded-[12px] flex items-center justify-between border cursor-pointer transition-colors ${isMecha ? 'bg-slate-950 border-slate-800 hover:bg-slate-900' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`} onMouseEnter={() => { setMood("thinking"); setMsg("Mau ngatur privasi akun? 🔒"); }}>
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
        
        {/* Achievements Showcase */}
        <div className="w-full">
           <div className="flex items-center justify-between mb-3 px-1">
              <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-white' : 'text-slate-800'}`}>Achievements</h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isMecha ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>12 / 50</span>
           </div>
           <div className={`p-4 rounded-[24px] grid grid-cols-4 gap-3 border shadow-sm ${isMecha ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 bg-gradient-to-br shadow-inner ${isMecha ? 'from-amber-900/40 to-amber-600/10' : 'from-amber-100 to-yellow-50'}`}>
                 <Crown size={24} className="text-amber-500 drop-shadow-sm" />
                 <span className={`text-[8px] font-black uppercase ${isMecha ? 'text-amber-500' : 'text-amber-600'}`}>VIP</span>
              </div>
              <div className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 bg-gradient-to-br shadow-inner ${isMecha ? 'from-blue-900/40 to-blue-600/10' : 'from-blue-100 to-cyan-50'}`}>
                 <Scan size={24} className="text-blue-500 drop-shadow-sm" />
                 <span className={`text-[8px] font-black uppercase ${isMecha ? 'text-blue-500' : 'text-blue-600'}`}>100+</span>
              </div>
              <div className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 bg-gradient-to-br shadow-inner ${isMecha ? 'from-pink-900/40 to-pink-600/10' : 'from-pink-100 to-rose-50'}`}>
                 <Medal size={24} className="text-pink-500 drop-shadow-sm" />
                 <span className={`text-[8px] font-black uppercase ${isMecha ? 'text-pink-500' : 'text-pink-600'}`}>Saver</span>
              </div>
              <div className={`aspect-square rounded-2xl flex items-center justify-center border-2 border-dashed ${isMecha ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}>
                 <Lock size={16} className={isMecha ? 'text-slate-600' : 'text-slate-300'} />
              </div>
           </div>
        </div>

        {/* System Settings & Tools */}
        <div className="w-full">
           <div className="flex items-center justify-between mb-3 px-1">
              <h2 className={`text-sm font-black uppercase tracking-wider ${isMecha ? 'text-white' : 'text-slate-800'}`}>System & Tools</h2>
           </div>
           <div className={`rounded-[24px] overflow-hidden border shadow-sm ${isMecha ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              
              <div className={`p-4 border-b flex items-center justify-between transition-colors cursor-pointer ${isMecha ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-100 hover:bg-slate-50'}`} onMouseEnter={() => { setMood("thinking"); setMsg("Biar kamu nggak ketinggalan info diskon! 🔔"); }}>
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

              <div className={`p-4 border-b flex items-center justify-between transition-colors cursor-pointer ${isMecha ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-100 hover:bg-slate-50'}`} onMouseEnter={() => { setMood("excited"); setMsg("Cetak laporan keuanganmu jadi Excel keren! 📊"); }}>
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

              <div className={`p-4 flex items-center justify-between transition-colors cursor-pointer ${isMecha ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`} onMouseEnter={() => { setMood("happy"); setMsg("Bosan dengan tampilannya? Ayo atur aplikasinya! ⚙️"); }}>
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

  const renderEditMode = () => (
    <motion.div key="edit-profile" variants={containerVariants} initial="hidden" animate="show" exit="exit" className={`absolute inset-0 z-50 overflow-y-auto no-scrollbar flex flex-col ${isMecha ? 'bg-slate-900 text-white' : 'bg-[#fdfbfb] text-slate-800'}`}>
      
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
                  <div className={`w-full h-12 rounded-lg ${opt.bg}`}></div>
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
                       <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400" className="w-full h-full object-cover" alt="" />
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

  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col ${isMecha ? 'bg-slate-900 text-white' : 'bg-[#fdfbfb] text-slate-800'}`}>
      
      {/* The Global Blurred Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-top opacity-30"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <AnimatePresence mode="wait">
        {isEditing ? renderEditMode() : renderCardBody()}
      </AnimatePresence>

      {/* Modern Floating Bottom Navigation (Only visible when NOT editing) */}
      <AnimatePresence>
        {!isEditing && (
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
