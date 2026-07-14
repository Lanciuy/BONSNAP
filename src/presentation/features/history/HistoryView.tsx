import React, { useState, useMemo } from "react";
import { Camera, PieChart, Home, ReceiptText, User, ChevronLeft, Search, Filter, ShoppingBag, Gamepad2, Coffee, TrainFront, MoreHorizontal } from "lucide-react";
import { Mascot, MascotMood } from "../../shared/Mascot/Mascot";
import { ThemeState } from '../../../core/entities';
import { motion } from "motion/react";

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
  const [mood, setMood] = useState<MascotMood>("thinking");
  const [msg, setMsg] = useState("Scroll ke bawah pelan-pelan ya, jangan kaget liat daftar dosanya! 📜");
  const [searchQuery, setSearchQuery] = useState("");

  const formatIDR = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

  const allTransactions = useMemo(() => [
    { id: 1, name: "Matcha Latte", category: "Sweets & Food", amount: 45000, date: "Today, 14:30", group: "Today", icon: Coffee, color: "text-pink-500", bg: "bg-pink-100" },
    { id: 2, name: "KRL Commuter", category: "Transport", amount: 15000, date: "Today, 08:15", group: "Today", icon: TrainFront, color: "text-blue-500", bg: "bg-blue-100" },
    { id: 3, name: "Sephora Haul", category: "Shopping", amount: 1250000, date: "Yesterday, 19:45", group: "Yesterday", icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-100" },
    { id: 4, name: "Ojol GoRide", category: "Transport", amount: 45000, date: "Yesterday, 18:30", group: "Yesterday", icon: TrainFront, color: "text-blue-500", bg: "bg-blue-100" },
    { id: 5, name: "Genshin Welkin", category: "Others", amount: 79000, date: "10 Oct 2026", group: "Last Week", icon: Gamepad2, color: "text-yellow-500", bg: "bg-yellow-100" },
    { id: 6, name: "Sushi Tei", category: "Sweets & Food", amount: 320000, date: "09 Oct 2026", group: "Last Week", icon: Coffee, color: "text-pink-500", bg: "bg-pink-100" },
    { id: 7, name: "Zara Outer", category: "Shopping", amount: 699000, date: "05 Oct 2026", group: "Last Week", icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-100" },
    { id: 8, name: "Cinema XXI", category: "Others", amount: 125000, date: "01 Oct 2026", group: "Earlier This Month", icon: Gamepad2, color: "text-yellow-500", bg: "bg-yellow-100" },
    { id: 9, name: "Sweet Desserts", category: "Sweets & Food", amount: 175000, date: "28 Sep 2026", group: "Earlier This Month", icon: Coffee, color: "text-pink-500", bg: "bg-pink-100" },
    { id: 10, name: "Skincare Refill", category: "Shopping", amount: 450000, date: "26 Sep 2026", group: "Earlier This Month", icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-100" }
  ], []);

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
    <div className="relative w-full h-full text-slate-800 bg-[#fdfbfb] overflow-hidden flex flex-col">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-top opacity-30"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-[280px]">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-[#fdfbfb]/80 backdrop-blur-xl z-30 border-b border-pink-100 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={onGoToDashboard} className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md border bg-white border-pink-100 text-pink-500 hover:bg-pink-50">
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <h2 className="text-xl font-black tracking-tight text-slate-800">
              History
            </h2>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm backdrop-blur-md border bg-white border-pink-100 text-slate-400 hover:bg-pink-50 hover:text-pink-500">
            <MoreHorizontal size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 mt-6 mb-6">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-pink-200 shadow-sm rounded-full px-4 py-3 focus-within:border-pink-400 focus-within:shadow-md transition-all">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari transaksi (e.g., Matcha, Sephora)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-700 placeholder-slate-300"
              onFocus={() => { setMood("cute"); setMsg("Lagi nyari dosa apa nih bestie? 🧐"); }}
              onBlur={() => { setMood("thinking"); setMsg("Scroll ke bawah pelan-pelan ya, jangan kaget liat daftar dosanya! 📜"); }}
            />
            <button className="text-pink-400 hover:text-pink-500 bg-pink-50 p-1.5 rounded-full"><Filter size={16} /></button>
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
                      const Icon = t.icon;
                      return (
                        <motion.div variants={itemVariants} key={t.id} className="flex items-center justify-between p-4 rounded-[24px] border border-slate-100 bg-white/80 backdrop-blur-xl hover:bg-white transition-colors shadow-sm" onMouseEnter={() => { setMood(t.amount > 500000 ? "alert" : "happy"); setMsg(t.amount > 500000 ? `Wow ${t.name} mahal juga ya! 💸` : `Asyik jajan ${t.name}! ✨`); }}>
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shadow-inner ${t.bg} ${t.color}`}>
                              <Icon size={22} strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="text-[15px] font-black text-slate-800 mb-0.5">{t.name}</div>
                              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.category}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[15px] font-black font-mono text-slate-800 mb-0.5">{formatIDR(t.amount)}</div>
                            <div className="text-[10px] font-bold text-slate-400">{t.date}</div>
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] h-[72px] bg-white/95 backdrop-blur-2xl border rounded-[32px] px-2 flex justify-between items-center shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-40 pointer-events-auto border-slate-100">
        
        <button onClick={onGoToDashboard} className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 hover:text-pink-500 transition-colors`}>
          <div className="p-1.5 rounded-xl transition-colors mb-0.5 group-hover:bg-pink-50"><Home size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">Home</span>
        </button>

        <button className={`flex flex-col items-center justify-center w-[20%] group text-pink-500`}>
          <div className={`p-1.5 rounded-xl shadow-inner mb-0.5 bg-pink-100`}><ReceiptText size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-black tracking-wide">History</span>
        </button>

        <div className="w-[20%] flex justify-center relative">
          <div className="absolute -top-10">
            <button onClick={onGoToCamera} className={`group flex flex-col items-center justify-center w-[68px] h-[68px] rounded-full hover:scale-105 active:scale-95 transition-all border-4 border-white bg-gradient-to-tr from-pink-400 to-purple-400 shadow-[0_10px_20px_rgba(244,114,182,0.4)]`}>
              <Camera size={28} strokeWidth={2.5} className="text-white group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <button onClick={() => onNavigate('insights')} className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 transition-colors hover:text-purple-500`}>
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 group-hover:bg-purple-50`}><PieChart size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">Insights</span>
        </button>

        <button onClick={() => onNavigate('editProfile')} className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 transition-colors hover:text-pink-500`}>
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 group-hover:bg-pink-50`}><User size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">Profile</span>
        </button>

      </div>

      <Mascot mood={mood} message={msg} />
    </div>
  );
};
