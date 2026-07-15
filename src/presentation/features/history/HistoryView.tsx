import React, { useState, useMemo } from "react";
import { Camera, PieChart, Home, ReceiptText, User, ChevronLeft, Search, Filter, ShoppingBag, Gamepad2, Coffee, TrainFront, MoreHorizontal } from "lucide-react";
import { Mascot, MascotMood } from "../../shared/Mascot/Mascot";
import { ThemeState } from '../../../core/entities';
import { motion } from "motion/react";
import { useAppStore } from "../../../core/store/useAppStore";

interface HistoryViewProps {
  onGoToCamera: () => void;
  onGoToDashboard: () => void;
  theme: ThemeState;
  onNavigate: (view: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const HistoryView: React.FC<HistoryViewProps> = ({ onGoToCamera, onGoToDashboard, theme, onNavigate }) => {
  const isMecha = theme === 'mecha';
  const [mood, setMood] = useState<MascotMood>("thinking");
  const [msg, setMsg] = useState("Scroll ke bawah pelan-pelan ya, jangan kaget liat daftar dosanya! 📜");
  const [searchQuery, setSearchQuery] = useState("");

  const formatIDR = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

  const { transactions } = useAppStore();

  const allTransactions = useMemo(() => {
    return transactions.map(tx => ({
      ...tx,
      name: tx.merchant,
      date: tx.time,
      group: tx.time.split(',')[0] || "Recent"
    }));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return allTransactions;
    return allTransactions.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allTransactions, searchQuery]);

  // Group by "group" key
  const groupedTransactions = useMemo(() => {
    return filteredTransactions.reduce((acc, curr) => {
      if (!acc[curr.group]) acc[curr.group] = [];
      acc[curr.group].push(curr);
      return acc;
    }, {} as Record<string, typeof allTransactions>);
  }, [filteredTransactions]);

  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col transition-colors duration-500 ${isMecha ? 'bg-slate-900 text-slate-200' : 'bg-[#fdfbfb] text-slate-800'}`}>
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-top transition-all duration-1000 ${isMecha ? 'mix-blend-luminosity opacity-20' : 'opacity-40'}`}
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-[280px]">
        {/* Header */}
        {/* Header */}
        <div className={`px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-all duration-500 backdrop-blur-xl border-b ${isMecha ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/80 border-pink-100/50'}`}>
          <div className="flex items-center gap-3">
            <button onClick={onGoToDashboard} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md border transition-all hover:scale-105 active:scale-95 ${isMecha ? 'bg-slate-800/80 border-slate-700/50 text-slate-300 hover:bg-slate-700' : 'bg-white/80 border-white/60 text-slate-600 hover:bg-white hover:text-pink-500'}`}>
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <h2 className={`text-xl font-black tracking-tight ${isMecha ? 'text-white' : 'text-slate-800'}`}>
              History
            </h2>
          </div>
          <button className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md border transition-all hover:scale-105 active:scale-95 ${isMecha ? 'bg-slate-800/80 border-slate-700/50 text-slate-400 hover:bg-slate-700' : 'bg-white/80 border-white/60 text-slate-400 hover:bg-white hover:text-pink-500'}`}>
            <MoreHorizontal size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 mt-6 mb-6">
          <div className={`flex items-center gap-2 backdrop-blur-md border shadow-sm rounded-full px-4 py-3 transition-all ${isMecha ? 'bg-slate-800/50 border-slate-700/50 focus-within:border-blue-500/50 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/60 border-white/60 focus-within:border-pink-300 focus-within:shadow-[0_0_15px_rgba(244,114,182,0.2)]'}`}>
            <Search size={18} className={isMecha ? 'text-slate-400' : 'text-slate-400'} />
            <input 
              type="text" 
              placeholder="Cari transaksi (e.g., Matcha, Sephora)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 bg-transparent border-none outline-none text-sm font-bold placeholder-opacity-50 ${isMecha ? 'text-white placeholder-slate-500' : 'text-slate-700 placeholder-slate-400'}`}
              onFocus={() => { setMood("cute"); setMsg("Lagi nyari dosa apa nih bestie? 🧐"); }}
              onBlur={() => { setMood("thinking"); setMsg("Scroll ke bawah pelan-pelan ya, jangan kaget liat daftar dosanya! 📜"); }}
            />
            <button className={`p-1.5 rounded-full transition-colors ${isMecha ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600' : 'bg-pink-50/50 text-pink-400 hover:text-pink-500'}`}><Filter size={16} /></button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="px-6">
          {Object.keys(groupedTransactions).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-4xl mb-4">🫥</div>
              <h3 className="font-black text-slate-800 text-lg mb-2">Gak Ketemu Nih</h3>
              <p className="text-sm font-bold text-slate-400">Coba cari pakai kata kunci yang lain ya!</p>
            </div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
              {Object.entries(groupedTransactions).map(([groupName, transactions]) => (
                <div key={groupName}>
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3 ml-2">{groupName}</h3>
                  <div className="flex flex-col gap-3">
                    {transactions.map((t) => {
                      return (
                        <motion.div variants={itemVariants} key={t.id} className={`flex items-center justify-between p-4 rounded-[24px] border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] shadow-sm ${isMecha ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 hover:shadow-blue-500/10' : 'bg-white/60 border-white/60 hover:bg-white/90 hover:shadow-pink-500/10'}`} onMouseEnter={() => { setMood(t.amount > 500000 ? "alert" : "happy"); setMsg(t.amount > 500000 ? `Wow ${t.name} mahal juga ya! 💸` : `Asyik jajan ${t.name}! ✨`); }}>
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-[16px] shadow-sm ${t.bg}`}>
                              {t.iconName === 'Swords' && <Sparkles size={18} className={t.color} />}
                              {t.iconName === 'ShoppingBag' && <ShoppingBag size={18} className={t.color} />}
                              {t.iconName === 'Car' && <TrainFront size={18} className={t.color} />}
                              {t.iconName === 'Coffee' && <Coffee size={18} className={t.color} />}
                              {!['Swords', 'ShoppingBag', 'Car', 'Coffee'].includes(t.iconName) && <Gamepad2 size={18} className={t.color} />}
                            </div>
                            <div>
                              <p className={`text-[14px] font-black tracking-tight ${isMecha ? 'text-slate-200' : 'text-slate-800'}`}>{t.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.category}</p>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end">
                            <p className={`text-[15px] font-black font-mono tracking-tighter ${isMecha ? 'text-red-400' : 'text-slate-800'}`}>
                              -{formatIDR(t.amount)}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400">{t.date}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modern Floating Bottom Navigation */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] h-[72px] backdrop-blur-2xl border rounded-[32px] px-2 flex justify-between items-center z-40 pointer-events-auto ${isMecha ? 'bg-slate-800/95 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/95 border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]'}`}>
        
        <button onClick={onGoToDashboard} className={`flex flex-col items-center justify-center w-[20%] group transition-colors ${isMecha ? 'text-slate-400 hover:text-blue-400' : 'text-slate-400 hover:text-pink-500'}`}>
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-blue-500/20' : 'group-hover:bg-pink-50'}`}><Home size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">Home</span>
        </button>

        <button className={`flex flex-col items-center justify-center w-[20%] group ${isMecha ? 'text-blue-400' : 'text-pink-500'}`}>
          <div className={`p-1.5 rounded-xl shadow-inner mb-0.5 ${isMecha ? 'bg-blue-500/20' : 'bg-pink-100'}`}><ReceiptText size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-black tracking-wide">History</span>
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

        <button onClick={() => onNavigate('editProfile')} className={`flex flex-col items-center justify-center w-[20%] group transition-colors ${isMecha ? 'text-slate-400 hover:text-teal-400' : 'text-slate-400 hover:text-pink-500'}`}>
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 ${isMecha ? 'group-hover:bg-teal-500/20' : 'group-hover:bg-pink-50'}`}><User size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">Profile</span>
        </button>

      </div>

      <Mascot mood={mood} message={msg} />
    </div>
  );
};
