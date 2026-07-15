import React, { useState } from "react";
import { ChevronLeft, Coins, CalendarCheck, ShieldCheck, Flame, Sparkles, Trophy, Lock, Unlock, Zap, Calendar, CalendarDays, Target } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeState, Inventory } from '../../../core/entities';
import { Mascot, MascotMood } from "../../shared/Mascot/Mascot";

interface RewardsStoreViewProps {
  onBack: () => void;
  theme: ThemeState;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  inventory: Inventory;
  setInventory: React.Dispatch<React.SetStateAction<Inventory>>;
  initialTab?: "quests" | "store";
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const RewardsStoreView: React.FC<RewardsStoreViewProps> = ({ onBack, theme, points, setPoints, inventory, setInventory, initialTab = "quests" }) => {
  const isMecha = theme === "mecha";
  const [mood, setMood] = useState<MascotMood>("excited");
  const [msg, setMsg] = useState(isMecha ? "REWARDS TERMINAL ONLINE." : "Wih banyak poin nih! Mau tuker apa bestie? 🛍️");
  const [activeTab, setActiveTab] = useState<"quests" | "store">(initialTab);
  const [questFilter, setQuestFilter] = useState<"daily" | "weekly" | "monthly">("daily");

  const [dailyClaimed, setDailyClaimed] = useState(false);

  const [quests, setQuests] = useState([
    { id: 1, type: "daily", title: "Hemat Jajan", desc: "Pengeluaran < Rp 50.000 hari ini", reward: 50, completed: true, claimed: false, difficulty: 1 },
    { id: 2, type: "daily", title: "Makan di Rumah", desc: "No transaksi Food & Beverage", reward: 100, completed: false, claimed: false, difficulty: 2 },
    { id: 3, type: "weekly", title: "Puasa Boba", desc: "No transaksi cafe/kopi dalam 1 minggu", reward: 300, completed: true, claimed: false, difficulty: 2 },
    { id: 4, type: "weekly", title: "Weekend Warrior", desc: "Pengeluaran weekend < Rp 100.000", reward: 500, completed: false, claimed: false, difficulty: 3 },
    { id: 5, type: "monthly", title: "Budget Master", desc: "Total pengeluaran < Rp 6.000.000", reward: 2000, completed: false, claimed: false, difficulty: 4 },
    { id: 6, type: "monthly", title: "Say No To Gacha", desc: "0 transaksi game online bulan ini", reward: 1500, completed: true, claimed: false, difficulty: 3 },
  ]);

  const STORE_ITEMS = [
    { id: 'neon', type: 'banner', name: 'Neon City Banner', cost: 500, icon: Zap },
    { id: 'holographic', type: 'banner', name: 'Holographic Banner', cost: 800, icon: Sparkles },
    { id: 'dark', type: 'banner', name: 'Dark Mode Banner', cost: 300, icon: ShieldCheck },
    { id: 'custom_banner1', type: 'banner', name: 'Custom Banner 1', cost: 1000, icon: Zap },
    { id: 'moonlit-sky-6', type: 'banner', name: 'Moonlit Sky', cost: 1500, icon: Sparkles },
    { id: 'sakura-bridge', type: 'banner', name: 'Sakura Bridge', cost: 1500, icon: Sparkles },

    { id: 'custom1', type: 'avatar', name: 'Custom Avatar 1', cost: 600, icon: Trophy },
    { id: 'custom2', type: 'avatar', name: 'Custom Avatar 2', cost: 600, icon: Flame },
    
    { id: 'gold', type: 'frame', name: 'Gold VIP Frame', cost: 1000, icon: Trophy },
    { id: 'neon', type: 'frame', name: 'Cyber Neon Frame', cost: 1500, icon: Flame },
    { id: 'flame', type: 'frame', name: 'Hot Streak Frame', cost: 1200, icon: Flame },
    { id: 'stardust', type: 'frame', name: 'Stardust Frame', cost: 2000, icon: Sparkles },
    { id: 'digital-sunrise', type: 'frame', name: 'Digital Sunrise', cost: 2500, icon: Sparkles },
    { id: 'dream-dive', type: 'frame', name: 'Dream Dive Stars', cost: 3000, icon: Sparkles },
    { id: 'starlight', type: 'frame', name: 'Starlight Revolver', cost: 3500, icon: Sparkles },
    { id: 'steampunk', type: 'frame', name: 'Steampunk Ears', cost: 4000, icon: Sparkles },

    { id: 'mecha', type: 'theme', name: 'Mecha Theme (Skin)', cost: 5000, icon: Zap },

    { id: 'wallet-obsidian', type: 'walletSkin', name: 'Obsidian Black', cost: 800, icon: ShieldCheck },
    { id: 'wallet-hologram', type: 'walletSkin', name: 'Hologram Premium', cost: 1500, icon: Sparkles },
    { id: 'wallet-gold', type: 'walletSkin', name: 'Royal Gold', cost: 2000, icon: Trophy },
  ];

  const handleClaimQuest = (id: number, reward: number) => {
    setPoints(prev => prev + reward);
    setQuests(quests.map(q => q.id === id ? { ...q, claimed: true } : q));
    setMood("excited");
    setMsg(`Yeay! Dapet ${reward} Poin. Nabung terus ya! ✨`);
  };

  const handleDailyLogin = () => {
    if (!dailyClaimed) {
      setPoints(prev => prev + 100);
      setDailyClaimed(true);
      setMood("love");
      setMsg("Makasih udah login hari ini! +100 Poin buat kamu 💖");
    }
  };

  const handleBuy = (item: typeof STORE_ITEMS[0]) => {
    if (points >= item.cost) {
      setPoints(prev => prev - item.cost);
      setInventory(prev => {
        const newInv = { ...prev };
        if (item.type === 'banner' && !newInv.banners.includes(item.id)) newInv.banners.push(item.id);
        if (item.type === 'frame' && !newInv.frames.includes(item.id)) newInv.frames.push(item.id);
        if (item.type === 'theme' && !newInv.themes.includes(item.id)) newInv.themes.push(item.id);
        if (item.type === 'avatar' && !newInv.avatars.includes(item.id)) newInv.avatars.push(item.id);
        if (item.type === 'walletSkin' && !newInv.walletSkins.includes(item.id)) newInv.walletSkins.push(item.id);
        return newInv;
      });
      setMood("excited");
      setMsg(`Wuihhh ${item.name} berhasil dibeli! Langsung cek profil ya 💅`);
    } else {
      setMood("alert");
      setMsg("Ups, poin kamu belum cukup bestie. Kumpulin dari quest dulu yuk! 🥲");
    }
  };

  const hasItem = (type: string, id: string) => {
    if (type === 'banner') return inventory.banners.includes(id);
    if (type === 'frame') return inventory.frames.includes(id);
    if (type === 'theme') return inventory.themes.includes(id);
    if (type === 'avatar') return inventory.avatars.includes(id);
    if (type === 'walletSkin') return inventory.walletSkins.includes(id);
    return false;
  };

  const renderStars = (diff: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`text-[10px] ${i < diff ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>
    ));
  };

  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900 text-slate-200' : 'bg-[#fdfbfb] text-slate-800'}`}>
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-top transition-all duration-1000 ${isMecha ? 'mix-blend-luminosity opacity-20' : 'opacity-40'}`}
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />
      
      {/* Header */}
      <div className={`pt-12 pb-4 px-6 flex items-center justify-between z-20 sticky top-0 shadow-sm transition-all duration-500 backdrop-blur-xl border-b ${isMecha ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/80 border-pink-100/50'}`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md border transition-all hover:scale-105 active:scale-95 ${isMecha ? 'bg-slate-800/80 border-slate-700/50 text-slate-300 hover:bg-slate-700' : 'bg-white/80 border-white/60 text-slate-600 hover:bg-white hover:text-pink-500'}`}>
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <h1 className={`text-xl font-black tracking-tight ${isMecha ? 'text-white' : 'text-slate-800'}`}>{isMecha ? 'REWARDS TERMINAL' : 'Rewards Hub 🎁'}</h1>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm font-mono ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-100 text-yellow-600'}`}>
          <Coins size={16} /> {points}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-[180px]">
        {/* Main Tabs */}
        <div className="flex gap-4 px-6 mt-4 mb-2 relative z-10">
          <button onClick={() => setActiveTab("quests")} className={`flex-1 py-3 font-black text-sm rounded-[20px] transition-all duration-300 backdrop-blur-md ${activeTab === "quests" ? (isMecha ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500' : 'bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)] border border-pink-400') : (isMecha ? 'bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:bg-slate-800/80' : 'bg-white/60 border border-white/60 text-slate-500 hover:bg-white/90 hover:text-pink-500')}`}>
            🎯 Quests
          </button>
          <button onClick={() => setActiveTab("store")} className={`flex-1 py-3 font-black text-sm rounded-[20px] transition-all duration-300 backdrop-blur-md ${activeTab === "store" ? (isMecha ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500' : 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-400') : (isMecha ? 'bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:bg-slate-800/80' : 'bg-white/60 border border-white/60 text-slate-500 hover:bg-white/90 hover:text-purple-500')}`}>
            🛍️ Store
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "quests" && (
            <motion.div key="quests" variants={containerVariants} initial="hidden" animate="show" exit="hidden" className="px-6 flex flex-col gap-4">
              
              {/* Daily Login Card */}
              <motion.div variants={itemVariants} className={`mt-2 rounded-[24px] p-5 relative overflow-hidden ${isMecha ? 'bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600' : 'bg-gradient-to-r from-yellow-300 to-orange-400 text-white shadow-lg shadow-orange-200'}`}>
                <div className="absolute top-0 right-0 p-4 opacity-20"><CalendarCheck size={64} /></div>
                <h3 className="font-black text-lg mb-1 relative z-10">Daily Login!</h3>
                <p className={`text-xs font-bold mb-4 relative z-10 ${isMecha ? 'text-slate-300' : 'text-orange-50'}`}>Claim your free points every day.</p>
                <button 
                  onClick={handleDailyLogin}
                  disabled={dailyClaimed}
                  className={`relative z-10 px-6 py-2 rounded-full font-black text-sm transition-all ${dailyClaimed ? (isMecha ? 'bg-slate-600 text-slate-400' : 'bg-white/40 text-white') : (isMecha ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-white text-orange-500 hover:scale-105')}`}
                >
                  {dailyClaimed ? 'Claimed ✓' : 'Claim +100 Pts'}
                </button>
              </motion.div>

              {/* Quest Filters */}
              <div className="flex gap-2 mt-2">
                {(['daily', 'weekly', 'monthly'] as const).map(type => (
                  <button 
                    key={type}
                    onClick={() => setQuestFilter(type)}
                    className={`flex-1 py-2 text-[11px] uppercase tracking-wider font-black rounded-full border transition-all ${questFilter === type ? (isMecha ? 'border-teal-400 bg-teal-400/20 text-teal-400' : 'border-pink-500 bg-pink-50 text-pink-500') : (isMecha ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-200 bg-white text-slate-400')}`}
                  >
                    {type === 'daily' && <Calendar size={12} className="inline mr-1 mb-0.5" />}
                    {type === 'weekly' && <CalendarDays size={12} className="inline mr-1 mb-0.5" />}
                    {type === 'monthly' && <Target size={12} className="inline mr-1 mb-0.5" />}
                    {type}
                  </button>
                ))}
              </div>

              {/* Quest List */}
              <div className="flex flex-col gap-3">
                {quests.filter(q => q.type === questFilter).map(quest => (
                  <motion.div key={quest.id} variants={itemVariants} className={`p-4 rounded-[20px] border flex items-center justify-between backdrop-blur-md transition-all duration-300 hover:scale-[1.02] shadow-sm ${isMecha ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 hover:shadow-blue-500/10' : 'bg-white/60 border-white/60 hover:bg-white/90 hover:shadow-pink-500/10'}`}>
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-black text-sm ${isMecha ? 'text-white' : 'text-slate-800'}`}>{quest.title}</h4>
                        <div className="flex">{renderStars(quest.difficulty)}</div>
                      </div>
                      <p className={`text-[11px] font-bold ${isMecha ? 'text-slate-400' : 'text-slate-500'}`}>{quest.desc}</p>
                      <div className={`mt-2 flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider ${isMecha ? 'text-blue-400' : 'text-pink-500'}`}>
                        <Coins size={12} /> {quest.reward} Pts
                      </div>
                    </div>
                    
                    <div className="shrink-0">
                      {quest.claimed ? (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMecha ? 'bg-slate-700 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                          <ShieldCheck size={20} />
                        </div>
                      ) : quest.completed ? (
                        <button 
                          onClick={() => handleClaimQuest(quest.id, quest.reward)}
                          className={`px-4 py-2 rounded-full font-black text-xs transition-transform active:scale-95 ${isMecha ? 'bg-teal-500 hover:bg-teal-400 text-slate-900' : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-md shadow-pink-200'}`}
                        >
                          Claim
                        </button>
                      ) : (
                        <div className={`px-4 py-2 rounded-full font-bold text-xs border ${isMecha ? 'border-slate-600 text-slate-500 bg-slate-800' : 'border-slate-200 text-slate-400 bg-slate-50'}`}>
                          0 / 1
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          )}

          {activeTab === "store" && (
            <motion.div key="store" variants={containerVariants} initial="hidden" animate="show" exit="hidden" className="px-6 flex flex-col gap-6 mt-4">
              
              {(['avatar', 'banner', 'frame', 'theme', 'walletSkin'] as const).map(category => (
                <div key={category}>
                  <h3 className={`text-xs font-black uppercase tracking-wider mb-3 ${isMecha ? 'text-blue-400' : 'text-slate-400'}`}>
                    {category === 'avatar' ? 'Custom Avatars' : category === 'banner' ? 'Profile Banners' : category === 'frame' ? 'Avatar Frames' : category === 'theme' ? 'App Skins' : 'Wallet Skins'}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {STORE_ITEMS.filter(item => item.type === category).map(item => {
                      const owned = hasItem(item.type, item.id);
                      const IconComponent = item.icon;
                      return (
                        <motion.div 
                          variants={itemVariants}
                          key={item.id} 
                          className={`p-4 rounded-[24px] border flex flex-col justify-between h-[140px] relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:scale-[1.02] shadow-sm ${isMecha ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 hover:shadow-blue-500/10' : 'bg-white/60 border-white/60 hover:bg-white/90 hover:shadow-purple-500/10'}`}
                        >
                          <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center mb-2 ${isMecha ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-100 text-purple-500'}`}>
                            <IconComponent size={20} />
                          </div>
                          
                          <h4 className={`text-xs font-black leading-tight ${isMecha ? 'text-slate-200' : 'text-slate-700'}`}>{item.name}</h4>
                          
                          <div className="mt-2">
                            {owned ? (
                              <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${isMecha ? 'text-teal-400' : 'text-emerald-500'}`}>
                                <Unlock size={12} /> Owned
                              </div>
                            ) : (
                              <button 
                                onClick={() => handleBuy(item)}
                                className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-full font-bold text-[11px] transition-transform active:scale-95 ${points >= item.cost ? (isMecha ? 'bg-blue-500 hover:bg-blue-400 text-white' : 'bg-slate-800 text-white hover:bg-slate-700') : (isMecha ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-100 text-slate-400 cursor-not-allowed')}`}
                              >
                                <Lock size={12} /> {item.cost}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <Mascot mood={mood} message={msg} theme={theme} placement="right" />
    </div>
  );
};
