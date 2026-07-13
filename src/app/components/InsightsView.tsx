import React, { useState } from "react";
import { Camera, History, PieChart, Home, AlertCircle, Target, TrendingDown, Sparkles, HeartPulse, Zap, ReceiptText, User } from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Mascot, MascotMood } from "./Mascot";
import { ThemeState } from '../App';

interface InsightsViewProps {
  onGoToCamera: () => void;
  onGoToDashboard: () => void;
  theme: ThemeState;
  onNavigate: (view: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ onGoToCamera, onGoToDashboard, theme, onNavigate }) => {
  const [mood, setMood] = useState<MascotMood>("thinking");
  const [msg, setMsg] = useState("Waduh, budget lo sisa dikit nih. Jangan FOMO jajan mulu ya! 📉");

  const totalBudget = 6000000;
  const totalSpent = 4250000;
  const remaining = totalBudget - totalSpent;
  const percentUsed = (totalSpent / totalBudget) * 100;
  
  const dailyAverage = Math.round(totalSpent / 15);
  const projectedTotal = dailyAverage * 30;
  const isOverBudgetProjected = projectedTotal > totalBudget;

  const formatIDR = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

  const categoryData = [
    { name: 'Sweets & Food', value: 2150000, color: '#f472b6' }, // Pink
    { name: 'Shopping', value: 1200000, color: '#a78bfa' }, // Purple
    { name: 'Transport', value: 600000, color: '#60a5fa' }, // Blue
    { name: 'Others', value: 300000, color: '#fbbf24' }, // Yellow
  ];

  return (
    <div className="relative w-full h-full text-slate-800 bg-[#fdfbfb] overflow-hidden flex flex-col">
      {/* Background graphic */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-top opacity-30"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1000&auto=format&fit=crop")' }}
      />

      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Header */}
        <div className="px-6 pt-12 pb-4">
          <h2 className="text-2xl font-black tracking-tight mb-1 text-slate-800 flex items-center gap-2">
            Analysis <Sparkles size={24} className="text-pink-400" />
          </h2>
          <p className="text-slate-500 text-sm font-bold tracking-wide font-mono">CYCLE: OCT-2026</p>
        </div>

        {/* Budget Tracker Card */}
        <div className="px-6 mb-6" onMouseEnter={() => { setMood("alert"); setMsg("Awas boncos bestie! Rem dikit jajannya ⚠️"); }} onMouseLeave={() => { setMood("thinking"); setMsg("Waduh, budget lo sisa dikit nih. Jangan FOMO jajan mulu ya! 📉"); }}>
          <div className="bg-white/80 backdrop-blur-xl border rounded-[32px] p-6 shadow-xl relative overflow-hidden border-pink-200 shadow-purple-100/50">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400" 
                style={{ width: `${percentUsed}%` }}
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

            <div className="flex items-center gap-2 text-xs font-bold bg-white/50 rounded-[16px] p-3 border border-white text-slate-600">
              <Target size={16} className="text-purple-500" />
              <span>
                Jujurly lo udah kepakai {percentUsed.toFixed(1)}% dari budget! ✨
              </span>
            </div>
          </div>
        </div>

        {/* Health Score & Tips */}
        <div className="px-6 mb-6">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-teal-400 rounded-[24px] p-5 shadow-lg shadow-emerald-200/50 text-white relative overflow-hidden"
            onMouseEnter={() => { setMood("excited"); setMsg("Financial score lo 85/100! Slay banget managing duitnya! 💅"); }}
            onMouseLeave={() => { setMood("thinking"); setMsg("Waduh, budget lo sisa dikit nih. Jangan FOMO jajan mulu ya! 📉"); }}
          >
            <div className="absolute right-[-20px] top-[-20px] opacity-20">
              <HeartPulse size={120} />
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 rounded-[20px] bg-white text-emerald-500 flex flex-col items-center justify-center font-black shadow-inner border-[3px] border-emerald-100">
                <span className="text-2xl leading-none">85</span>
                <span className="text-[8px] uppercase tracking-wider">Score</span>
              </div>
              <div>
                <h3 className="font-black text-lg flex items-center gap-1">
                  Health Slay-Meter <Zap size={16} className="fill-yellow-400 text-yellow-400" />
                </h3>
                <p className="text-xs font-bold text-emerald-50 mt-1 line-clamp-2">
                  "Udah jago nabung nih! Dikit lagi limit, kurangi checkout Shopee ya bestie!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="px-6 mb-6" onMouseEnter={() => { setMood("cute"); setMsg("Suka deh liat chart warna-warni, tapi kok isinya pengeluaran semua 😭🍰"); }} onMouseLeave={() => { setMood("thinking"); setMsg("Waduh, budget lo sisa dikit nih. Jangan FOMO jajan mulu ya! 📉"); }}>
          <h3 className="text-lg font-black tracking-tight mb-4 text-slate-800">
            Expense Breakdown
          </h3>
          <div className="bg-white/80 backdrop-blur-xl border rounded-[32px] p-6 shadow-xl flex flex-col items-center border-pink-200 shadow-pink-100/50">
            <div className="h-48 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatIDR(value)}
                    contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '16px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', color: '#334155' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              {/* Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black">
                  Total Spent
                </span>
                <span className="text-lg font-black tracking-tight text-slate-800 font-mono">{formatIDR(totalSpent)}</span>
              </div>
            </div>

            {/* Legend */}
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
        </div>

        {/* Advanced Calculations */}
        <div className="px-6 grid grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[24px] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-pink-500">
              <TrendingDown size={16} strokeWidth={2.5} />
              <span className="text-[10px] uppercase tracking-wider font-black">Daily Avg</span>
            </div>
            <div className="text-xl font-black tracking-tight text-slate-800 font-mono">{formatIDR(dailyAverage)}</div>
            <div className="text-[10px] text-slate-400 mt-1 font-bold">/ day so far</div>
          </div>

          <div className={`border rounded-[24px] p-5 shadow-sm ${isOverBudgetProjected ? 'bg-red-50 border-red-200' : 'bg-white/80 backdrop-blur-xl border-slate-200'}`}>
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
        </div>
      </div>

      {/* Modern Floating Bottom Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] h-[72px] bg-white/95 backdrop-blur-2xl border rounded-[32px] px-2 flex justify-between items-center shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-40 pointer-events-auto border-slate-100">
        
        {/* Home */}
        <button 
          onClick={onGoToDashboard} 
          onMouseEnter={() => { setMood("happy"); setMsg("Balik ke home nih? Gas! ✨"); }}
          onMouseLeave={() => { setMood("thinking"); setMsg("Waduh, budget lo sisa dikit nih. Jangan FOMO jajan mulu ya! 📉"); }}
          className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 hover:text-pink-500 transition-colors`}
        >
          <div className="p-1.5 rounded-xl transition-colors mb-0.5 group-hover:bg-pink-50">
            <Home size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-bold tracking-wide">Home</span>
        </button>

        {/* History */}
        <button 
          onClick={() => onNavigate('history')} 
          className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 transition-colors hover:text-pink-500`}
        >
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 group-hover:bg-pink-50`}>
            <ReceiptText size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-bold tracking-wide">History</span>
        </button>

        {/* Center Scan FAB */}
        <div className="w-[20%] flex justify-center relative">
          <div className="absolute -top-10">
            <button 
              onClick={onGoToCamera}
              onMouseEnter={() => { setMood("alert"); setMsg("Ada struk baru? Sini gue scan-in pakai AI! 📸"); }}
              onMouseLeave={() => { setMood("thinking"); setMsg("Waduh, budget lo sisa dikit nih. Jangan FOMO jajan mulu ya! 📉"); }}
              className={`group flex flex-col items-center justify-center w-[68px] h-[68px] rounded-full hover:scale-105 active:scale-95 transition-all border-4 border-white bg-gradient-to-tr from-pink-400 to-purple-400 shadow-[0_10px_20px_rgba(244,114,182,0.4)]`}
            >
              <Camera size={28} strokeWidth={2.5} className="text-white group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Insights */}
        <button className={`flex flex-col items-center justify-center w-[20%] group text-purple-500`}>
          <div className={`p-1.5 rounded-xl shadow-inner mb-0.5 bg-purple-100`}>
            <PieChart size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-black tracking-wide">Insights</span>
        </button>

        {/* Profile */}
        <button 
          onClick={() => onNavigate('editProfile')} 
          className={`flex flex-col items-center justify-center w-[20%] group text-slate-400 transition-colors hover:text-pink-500`}
        >
          <div className={`p-1.5 rounded-xl transition-colors mb-0.5 group-hover:bg-pink-50`}>
            <User size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-bold tracking-wide">Profile</span>
        </button>

      </div>

      <Mascot mood={mood} message={msg} />
    </div>
  );
};