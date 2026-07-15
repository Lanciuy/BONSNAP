import React, { useState, useMemo } from "react";
import { Camera, History, PieChart, Home, AlertCircle, Target, TrendingDown, Sparkles, HeartPulse, Zap, ReceiptText, User, ShoppingBag, Gamepad2, Coffee, TrainFront, Crown, ChevronRight } from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Mascot, MascotMood } from "../../shared/Mascot/Mascot";
import { ThemeState } from '../../../core/entities';
import { motion, AnimatePresence } from "motion/react";
import { exportToExcel } from "../../../utils/exportExcel";
import { useAppStore } from "../../../core/store/useAppStore";

interface InsightsViewProps {
  onGoToCamera: () => void;
  onGoToDashboard: () => void;
  theme: ThemeState;
  onNavigate: (view: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const InsightsView: React.FC<InsightsViewProps> = ({ onGoToCamera, onGoToDashboard, theme, onNavigate }) => {
  const [mood, setMood] = useState<MascotMood>("thinking");
  const [msg, setMsg] = useState("Sini gue bedah pengeluaran lo, semoga nggak jantungan ya! 🔍");

  const formatIDR = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

  const { userProfile, transactions } = useAppStore();

  const totalBudget = userProfile.budget;
  const totalSpent = useMemo(() => transactions.reduce((acc, curr) => acc + curr.amount, 0), [transactions]);
  const remaining = totalBudget - totalSpent;
  const percentUsed = (totalSpent / totalBudget) * 100;
  
  const dailyAverage = Math.round(totalSpent / 15);
  const projectedTotal = dailyAverage * 30;
  const isOverBudgetProjected = projectedTotal > totalBudget;

  const categoryData = useMemo(() => {
    const map: Record<string, { value: number, color: string }> = {
      'Sweets & Food': { value: 0, color: '#f472b6' },
      'Shopping': { value: 0, color: '#a855f7' },
      'Transport': { value: 0, color: '#3b82f6' },
      'Others': { value: 0, color: '#eab308' },
    };

    transactions.forEach(t => {
      if (map[t.category]) {
        map[t.category].value += t.amount;
      } else {
        map['Others'].value += t.amount;
      }
    });
    return Object.entries(map).map(([name, data]) => ({ name, ...data })).filter(c => c.value > 0);
  }, [transactions]);

  const topExpenses = useMemo(() => {
    return [...transactions].sort((a, b) => b.amount - a.amount).slice(0, 3);
  }, [transactions]);

  const weeklyData = [
    { name: 'W1', spent: 850000 },
    { name: 'W2', spent: 1250000 },
    { name: 'W3', spent: 900000 },
    { name: 'W4', spent: 743000 },
  ];

  return (
    <div className="relative w-full h-full text-slate-800 bg-[#fdfbfb] overflow-hidden flex flex-col">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-top opacity-30"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-[280px]">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 flex justify-between items-start">
          <div>
            <h2 className={`text-2xl font-black tracking-tight mb-1 flex items-center gap-2 ${theme === 'mecha' ? 'text-white' : 'text-slate-800'}`}>
              Analysis <Sparkles size={24} className={theme === 'mecha' ? 'text-blue-400' : 'text-pink-400'} />
            </h2>
            <p className={`text-sm font-bold tracking-wide font-mono ${theme === 'mecha' ? 'text-slate-400' : 'text-slate-500'}`}>CYCLE: OCT-2026</p>
          </div>
          <button 
            onClick={async () => {
              setMood("excited");
              setMsg("Lagi mencetak laporan Excel nih, tunggu bentar ya boss! 🖨️");
              await exportToExcel(transactions, totalBudget);
              setTimeout(() => {
                setMood("happy");
                setMsg("Laporan beres! Buka Excel-nya ya, rumusnya otomatis jalan lho! ✨");
              }, 2000);
            }}
            className={`px-3 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl border-2 transition-all active:scale-95 flex items-center gap-1.5 ${theme === 'mecha' ? 'border-blue-500 bg-slate-800 text-blue-400 hover:bg-slate-700' : 'border-pink-200 bg-pink-50 text-pink-600 hover:bg-pink-100 shadow-sm shadow-pink-100'}`}
          >
            Download Laporan
          </button>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6 px-6">
          
          {/* Budget Tracker Card */}
          <motion.div variants={itemVariants} onMouseEnter={() => { setMood("alert"); setMsg("Awas boncos bestie! Rem dikit jajannya ⚠️"); }} onMouseLeave={() => { setMood("thinking"); setMsg("Batas aman pengeluaran lo 166rb/hari ya!"); }}>
            <div className="bg-white/90 backdrop-blur-2xl border rounded-[32px] p-6 shadow-xl relative overflow-hidden border-pink-200 shadow-purple-100/50">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentUsed}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-500" 
                />
              </div>
              
              <div className="flex justify-between items-end mb-4 mt-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-black mb-1 text-purple-500">
                    Remaining Budget
                  </div>
                  <div className="text-3xl font-black text-slate-800 tracking-tight font-mono">{formatIDR(remaining)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Total Limit
                  </div>
                  <div className="text-sm font-black text-slate-600 font-mono">{formatIDR(totalBudget)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold bg-purple-50/50 rounded-[16px] p-3 border border-purple-100 text-slate-600">
                <Target size={16} className="text-purple-500" />
                <span>
                  Jujurly lo udah kepakai {percentUsed.toFixed(1)}% dari budget! ✨
                </span>
              </div>
            </div>
          </motion.div>

          {/* Health Score & Tips */}
          <motion.div variants={itemVariants}>
            <div 
              className="bg-gradient-to-r from-emerald-400 to-teal-400 rounded-[28px] p-5 shadow-lg shadow-emerald-200/50 text-white relative overflow-hidden flex items-center gap-4"
              onMouseEnter={() => { setMood("excited"); setMsg("Financial score lo 85/100! Slay banget managing duitnya! 💅"); }}
            >
              <div className="absolute right-[-20px] top-[-20px] opacity-20"><HeartPulse size={120} /></div>
              <div className="relative z-10 w-16 h-16 rounded-[20px] bg-white text-emerald-500 flex flex-col items-center justify-center font-black shadow-inner border-[3px] border-emerald-100 shrink-0">
                <span className="text-2xl leading-none">85</span>
                <span className="text-[8px] uppercase tracking-wider">Score</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-black text-lg flex items-center gap-1">
                  Health Slay-Meter <Zap size={16} className="fill-yellow-400 text-yellow-400" />
                </h3>
                <p className="text-xs font-bold text-emerald-50 mt-1 line-clamp-2">
                  "Udah jago nabung nih! Dikit lagi limit, kurangi checkout Shopee ya bestie!"
                </p>
              </div>
            </div>
          </motion.div>

          {/* New: Top 3 Biggest Expenses */}
          <motion.div variants={itemVariants}>
             <div className="bg-white/90 backdrop-blur-2xl border border-pink-200 shadow-xl shadow-pink-100/50 rounded-[32px] p-5" onMouseEnter={() => { setMood("alert"); setMsg("Waduh, ini nih 3 transaksi yang bikin dompet lo menjerit! 😱"); }}>
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-black tracking-wider uppercase text-slate-800 flex items-center gap-2">
                  <Crown size={18} className="text-yellow-500 fill-yellow-500" /> Top Spends
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {topExpenses.map((expense, i) => {
                  return (
                    <div key={expense.id} className="flex items-center justify-between p-3 rounded-[20px] border border-slate-100 bg-white/50 hover:bg-white transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-[12px] ${expense.bg}`}>
                          {expense.iconName === 'Swords' && <Sparkles size={16} className={expense.color} />}
                          {expense.iconName === 'ShoppingBag' && <ShoppingBag size={16} className={expense.color} />}
                          {expense.iconName === 'Car' && <TrainFront size={16} className={expense.color} />}
                          {expense.iconName === 'Coffee' && <Coffee size={16} className={expense.color} />}
                          {!['Swords', 'ShoppingBag', 'Car', 'Coffee'].includes(expense.iconName) && <Gamepad2 size={16} className={expense.color} />}
                        </div>
                        <div>
                          <p className="text-[13px] font-black">{expense.merchant}</p>
                          <p className="text-[10px] font-bold text-slate-400">{expense.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] font-black font-mono text-rose-500">
                          -{formatIDR(expense.amount)}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">{expense.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
             </div>
          </motion.div>

          {/* Expense Breakdown Pie Chart */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/90 backdrop-blur-2xl border rounded-[32px] p-6 shadow-xl flex flex-col items-center border-purple-200 shadow-purple-100/50">
              <h3 className="text-sm uppercase tracking-wider font-black mb-4 text-slate-800 w-full text-left">
                Breakdown
              </h3>
              <div className="h-48 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none" cornerRadius={10}>
                      {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatIDR(value)} contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '16px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', color: '#334155' }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black">Total</span>
                  <span className="text-lg font-black tracking-tight text-slate-800 font-mono">{formatIDR(totalSpent)}</span>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-4 mt-6">
                {categoryData.map((cat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-[6px]" style={{ backgroundColor: cat.color }} />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-black text-slate-700">{cat.name}</span>
                      <span className="text-[11px] text-slate-400 font-bold font-mono">{Math.round((cat.value/totalSpent)*100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* New: Weekly Trends Bar Chart */}
          <motion.div variants={itemVariants}>
             <div className="bg-white/90 backdrop-blur-2xl border border-blue-200 shadow-xl shadow-blue-100/50 rounded-[32px] p-5">
              <h3 className="text-sm font-black tracking-wider uppercase text-slate-800 mb-6 px-1">Weekly Trends</h3>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} tickFormatter={(val) => `Rp ${val/1000}k`} />
                    <Tooltip formatter={(value: number) => formatIDR(value)} cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                    <Bar dataKey="spent" fill="#60a5fa" radius={[6, 6, 6, 6]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
             </div>
          </motion.div>

          {/* Advanced Calculations */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[28px] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-pink-500">
                <TrendingDown size={16} strokeWidth={2.5} />
                <span className="text-[10px] uppercase tracking-wider font-black">Daily Avg</span>
              </div>
              <div className="text-xl font-black tracking-tight text-slate-800 font-mono">{formatIDR(dailyAverage)}</div>
              <div className="text-[10px] text-slate-400 mt-1 font-bold">/ day so far</div>
            </div>

            <div className={`border rounded-[28px] p-5 shadow-sm ${isOverBudgetProjected ? 'bg-red-50 border-red-200' : 'bg-white/90 backdrop-blur-2xl border-slate-200'}`}>
              <div className={`flex items-center gap-2 mb-2 ${isOverBudgetProjected ? 'text-red-500' : 'text-purple-500'}`}>
                {isOverBudgetProjected ? <AlertCircle size={16} strokeWidth={2.5} /> : <Sparkles size={16} strokeWidth={2.5} />}
                <span className="text-[10px] uppercase tracking-wider font-black">Projected</span>
              </div>
              <div className={`text-xl font-black tracking-tight font-mono ${isOverBudgetProjected ? 'text-red-600' : 'text-slate-800'}`}>
                {formatIDR(projectedTotal)}
              </div>
              <div className={`text-[10px] mt-1 font-bold ${isOverBudgetProjected ? 'text-red-400' : 'text-slate-400'}`}>
                EOM Estimate
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Modern Floating Bottom Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] h-[72px] bg-white/95 backdrop-blur-2xl border rounded-[32px] px-2 flex justify-between items-center shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-40 pointer-events-auto border-slate-100">
        
        <button onClick={onGoToDashboard} onMouseEnter={() => { setMood("happy"); setMsg("Balik ke home nih? Gas! ✨"); }} onMouseLeave={() => { setMood("thinking"); setMsg("Sini gue bedah pengeluaran lo, semoga nggak jantungan ya! 🔍"); }} className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 hover:text-pink-500 transition-colors`}>
          <div className="p-1.5 rounded-xl transition-colors mb-0.5 group-hover:bg-pink-50"><Home size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">Home</span>
        </button>

        <button onClick={() => onNavigate('history')} className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 transition-colors hover:text-pink-500`}>
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 group-hover:bg-pink-50`}><ReceiptText size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-bold tracking-wide">History</span>
        </button>

        <div className="w-[20%] flex justify-center relative">
          <div className="absolute -top-10">
            <button onClick={onGoToCamera} onMouseEnter={() => { setMood("alert"); setMsg("Ada struk baru? Sini gue scan-in pakai AI! 📸"); }} onMouseLeave={() => { setMood("thinking"); setMsg("Sini gue bedah pengeluaran lo, semoga nggak jantungan ya! 🔍"); }} className={`group flex flex-col items-center justify-center w-[68px] h-[68px] rounded-full hover:scale-105 active:scale-95 transition-all border-4 border-white bg-gradient-to-tr from-pink-400 to-purple-400 shadow-[0_10px_20px_rgba(244,114,182,0.4)]`}>
              <Camera size={28} strokeWidth={2.5} className="text-white group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <button className={`flex flex-col items-center justify-center w-[20%] group text-purple-500`}>
          <div className={`p-1.5 rounded-xl shadow-inner mb-0.5 bg-purple-100`}><PieChart size={22} strokeWidth={2.5} /></div>
          <span className="text-[9px] font-black tracking-wide">Insights</span>
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