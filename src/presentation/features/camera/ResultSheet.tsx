import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, ReceiptText, Trash2, PlusCircle, PenSquare, Sparkles, Crosshair, UserPlus } from "lucide-react";
import { Mascot, MascotMood } from "../../shared/Mascot/Mascot";
import { ThemeState } from '../../../core/entities';

interface ResultSheetProps {
  onClose: () => void;
  onSave: () => void;
  theme: ThemeState;
  onNavigate: (view: string) => void;
  parsedData?: {
    merchant: string;
    category: string;
    items: Array<{
      id: string;
      name: string;
      qty: number;
      price: number;
    }>;
  };
}

interface ScannedItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export const ResultSheet: React.FC<ResultSheetProps> = ({ onClose, onSave, theme, onNavigate, parsedData }) => {
  const isMecha = theme === 'mecha';
  const [merchant, setMerchant] = useState(parsedData?.merchant || (isMecha ? "Sector 7 Depot 🚀" : "Maid Cafe 🌸"));
  const [category, setCategory] = useState(parsedData?.category || (isMecha ? "Ammunition & Fuel" : "Sweets & Food"));
  const [date, setDate] = useState("Today, 14:30");
  
  const initialItemsGirl = [
    { id: "1", name: "Strawberry Parfait", qty: 2, price: 56000 },
    { id: "2", name: "Omurice", qty: 1, price: 45000 },
    { id: "3", name: "Magical Tea", qty: 1, price: 25000 },
  ];

  const initialItemsRobot = [
    { id: "1", name: "Plasma Cartridge (L)", qty: 2, price: 56000 },
    { id: "2", name: "Coolant Fluid", qty: 1, price: 45000 },
    { id: "3", name: "Micro-servo", qty: 1, price: 25000 },
  ];

  const [items, setItems] = useState<ScannedItem[]>(parsedData?.items || (isMecha ? initialItemsRobot : initialItemsGirl));

  const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

  const formatIDR = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    setItems([...items, { 
      id: Math.random().toString(), 
      name: isMecha ? "UNIDENTIFIED ASSET" : "Unknown Item", 
      qty: 1, 
      price: 0 
    }]);
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`absolute bottom-0 left-0 w-full h-[92%] bg-white/95 backdrop-blur-3xl border-t rounded-t-[32px] z-[60] flex flex-col pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.15)] ${isMecha ? 'border-blue-200' : 'border-pink-100'}`}
    >
      {/* Handle / Drag indicator */}
      <div className="w-full flex justify-center pt-4 pb-2" onClick={onClose}>
        <div className="w-12 h-1.5 bg-slate-200 rounded-full cursor-pointer hover:bg-slate-300 transition"></div>
      </div>

      <div className="flex-1 px-6 pb-6 pt-2 flex flex-col gap-5 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-2">
          <div className={`p-2 rounded-[16px] mb-3 shadow-lg ${isMecha ? 'bg-gradient-to-tr from-blue-500 to-red-500 shadow-blue-200/50' : 'bg-gradient-to-tr from-pink-400 to-purple-400 shadow-pink-200/50'}`}>
            <Check size={24} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="text-lg font-black tracking-tight text-slate-800">
            {isMecha ? 'DATA EXTRACTION COMPLETE' : 'Magic Scan Success!'}
          </h2>
        </div>

        {/* Global Receipt Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-[20px] p-3 border transition-all ${isMecha ? 'bg-blue-50/50 border-blue-100 focus-within:border-blue-300 focus-within:bg-blue-50' : 'bg-pink-50/50 border-pink-100 focus-within:border-pink-300 focus-within:bg-pink-50'}`}>
            <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-blue-500' : 'text-pink-400'}`}>
              Merchant
            </label>
            <input 
              type="text" 
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className={`w-full bg-transparent text-sm text-slate-800 outline-none font-bold ${isMecha && 'font-mono'}`}
            />
          </div>
          <div className={`rounded-[20px] p-3 border transition-all ${isMecha ? 'bg-slate-50 border-slate-200 focus-within:border-slate-300' : 'bg-purple-50/50 border-purple-100 focus-within:border-purple-300 focus-within:bg-purple-50'}`}>
            <label className={`text-[10px] uppercase tracking-wider font-black mb-1 block ${isMecha ? 'text-slate-500' : 'text-purple-400'}`}>
              Date
            </label>
            <input 
              type="text" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full bg-transparent text-sm text-slate-800 outline-none font-bold ${isMecha && 'font-mono'}`}
            />
          </div>
        </div>

        {/* Scanned Items List */}
        <div className="bg-white border border-slate-100 rounded-[24px] p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-slate-500 border-b border-slate-100 pb-3">
            {isMecha ? <Crosshair size={16} className="text-blue-500" /> : <ReceiptText size={16} className="text-pink-400" />}
            <span className="text-[11px] uppercase tracking-wider font-black">
              {isMecha ? `DETECTED ASSETS (${items.length})` : `Scanned Items (${items.length})`}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between group bg-slate-50/50 p-2.5 rounded-[16px]">
                <div className="flex items-center gap-3 flex-1 overflow-hidden pr-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 border ${isMecha ? 'bg-blue-100 text-blue-600 border-blue-200 font-mono' : 'bg-pink-100 text-pink-500 border-pink-200'}`}>
                    {item.qty}x
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <input 
                      type="text" 
                      value={item.name} 
                      readOnly 
                      className={`bg-transparent text-sm font-bold text-slate-700 outline-none w-full truncate ${isMecha && 'font-mono'}`}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-sm font-black text-slate-800 ${isMecha && 'font-mono'}`}>{formatIDR(item.price)}</div>
                  <button 
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tag Selection */}
        <div className="bg-slate-50 rounded-[20px] p-4 border border-slate-100 relative">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-black">
              Auto-categorized as
            </label>
            <PenSquare size={14} className="text-slate-400" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Sweets & Food', 'Shopping', 'Transport', 'Groceries', 'Entertainment'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${category === cat ? (isMecha ? 'bg-blue-500 text-white border-blue-600' : 'bg-pink-400 text-white border-pink-500') : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: Add Item & Split Bill */}
        <div className="flex gap-2">
          <button onClick={handleAddItem} className={`w-1/2 py-3 rounded-[16px] border-[2px] border-dashed flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider transition-all ${isMecha ? 'border-blue-200 text-blue-500 hover:bg-blue-50' : 'border-pink-200 text-pink-400 hover:bg-pink-50'}`}>
            <PlusCircle size={16} /> {isMecha ? 'MANUAL ENTRY' : 'Add Item'}
          </button>
          <button onClick={() => onNavigate("splitBill")} className={`w-1/2 py-3 rounded-[16px] border-[2px] flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider transition-all ${isMecha ? 'border-orange-200 text-orange-500 hover:bg-orange-50 bg-orange-50/50' : 'border-orange-200 text-orange-500 hover:bg-orange-50 bg-orange-50/50'}`}>
            <UserPlus size={16} /> Split Bill
          </button>
        </div>

        {/* Category & Total Area */}
        <div className="flex flex-col gap-3 mt-auto pt-2">
          {/* Grand Total */}
          <div className={`rounded-[24px] p-5 border shadow-inner flex justify-between items-center relative overflow-hidden ${isMecha ? 'bg-gradient-to-r from-blue-100 to-slate-200 border-blue-200' : 'bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200'}`}>
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
              {isMecha ? <Crosshair size={100} /> : <Sparkles size={100} />}
            </div>
            <div className="relative z-10">
              <div className={`text-[11px] uppercase tracking-wider font-black mb-1 ${isMecha ? 'text-blue-600' : 'text-pink-500'}`}>
                {isMecha ? 'TOTAL EXPENDITURE' : 'Total Magic Coins'}
              </div>
              <div className="text-sm text-slate-500 font-bold">
                {isMecha ? `${items.length} ASSETS` : `${items.length} items`}
              </div>
            </div>
            <div className="text-3xl font-black text-slate-800 tracking-tight relative z-10 font-mono">{formatIDR(totalAmount)}</div>
          </div>

          {/* Save Button */}
          <button 
            onClick={onSave}
            className={`w-full text-white font-black rounded-[24px] py-4.5 flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-lg mt-2 border border-white/20 ${isMecha ? 'bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 shadow-[0_10px_25px_rgba(59,130,246,0.4)]' : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 shadow-[0_10px_25px_rgba(244,114,182,0.4)]'}`}
          >
            {isMecha ? 'COMMIT TO LOG 🚀' : 'Save & Track 🌸'}
          </button>
        </div>

      </div>
    </motion.div>
  );
};