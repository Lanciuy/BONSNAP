import React, { useState, useEffect } from "react";
import { Camera, X, Wand2, Sparkles, Heart, Crosshair, Cpu, Flashlight, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResultSheet } from "./ResultSheet";
import { Mascot, MascotMood } from "../../shared/Mascot/Mascot";
import { ThemeState } from '../../../core/entities';
import { analyzeReceipt, ScannedReceiptData } from '../../../infrastructure/services/geminiService';

interface CameraViewProps {
  onGoToDashboard: () => void;
  onGoToInsights: () => void;
  theme: ThemeState;
  onNavigate: (view: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onGoToDashboard, theme, onNavigate }) => {
  const [sheetState, setSheetState] = useState<"viewfinder" | "processing" | "result">("viewfinder");
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [parsedData, setParsedData] = useState<ScannedReceiptData | undefined>(undefined);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const isMecha = theme === "mecha";
  const [mood, setMood] = useState<MascotMood>("excited");
  
  const initialMsg = isMecha 
    ? "TARGET ACQUIRED. AWAITING MANUAL OVERRIDE." 
    : "Pasin struknya di kamera ya, AI gue yang bakal mikir! 📸";
  const [msg, setMsg] = useState(initialMsg);
  
  const [loadingText, setLoadingText] = useState(isMecha ? "INITIALIZING SCANNERS..." : "Mantra AI diaktifkan...");
  const [loadingIcon, setLoadingIcon] = useState(
    isMecha ? <Crosshair size={48} className="text-blue-500" /> : <Wand2 size={48} className="text-pink-500" />
  );

  useEffect(() => {
    if (sheetState === "viewfinder") {
      setLoadingText(isMecha ? "INITIALIZING SCANNERS..." : "Mantra AI diaktifkan...");
      setLoadingIcon(isMecha ? <Crosshair size={48} className="text-blue-500" /> : <Wand2 size={48} className="text-pink-500" />);
    }
  }, [theme, sheetState, isMecha]);

  const handleCapture = (file?: File) => {
    setSheetState("processing");
    setMood("surprised");
    setMsg(isMecha ? "PROCESSING DATA ENGRAMS. STAND BY." : "Wait ya, AI gue lagi muter otak nih! ✨");
    setLoadingText(isMecha ? "EXTRACTING DATA ENGRAMS..." : "Lagi baca struk lo nih...");
    setLoadingIcon(isMecha ? <Cpu size={48} className="text-red-500" /> : <Sparkles size={48} className="text-purple-500" />);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          setLoadingText(isMecha ? "CALCULATING VECTORS..." : "Sikat, dikit lagi kelar!");
          setLoadingIcon(isMecha ? <Crosshair size={48} className="text-blue-500" /> : <Heart size={48} className="text-pink-500" />);
          
          const data = await analyzeReceipt(base64String, file.type);
          setParsedData(data);
          
          setSheetState("result");
          setMood("cute");
          setMsg(isMecha ? "EXTRACTION COMPLETE." : "Tadaa! Kelar di-parse nih. AI gue emang se-slay itu! 🥺");
        } catch (error) {
          console.error(error);
          setSheetState("viewfinder");
          setMood("angry");
          setMsg("Error AI: " + (error as Error).message);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Mock sequence if taking empty picture
      setTimeout(() => {
        setSheetState("result");
        setMood("cute");
        setMsg(isMecha ? "EXTRACTION COMPLETE (MOCK)." : "Tadaa! Ketemu 3 barang nih (MOCK).");
      }, 3000);
    }
  };

  return (
    <div className="relative w-full h-full bg-white text-slate-800 overflow-hidden flex flex-col">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1000&auto=format&fit=crop")' }}
      >
        <div className={`absolute inset-0 transition-colors duration-300 ${sheetState === "processing" ? "bg-white/60 backdrop-blur-md" : "bg-black/40 backdrop-blur-[2px]"}`} />
      </div>

      {/* Top Bar */}
      <div className="relative z-50 flex justify-between items-center p-6 pt-12 bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={onGoToDashboard} className="w-10 h-10 bg-white/30 backdrop-blur-xl rounded-full border border-white/40 flex items-center justify-center hover:bg-white/50 transition shadow-sm">
          <X size={20} className="text-white" strokeWidth={3} />
        </button>
        <div className={`flex items-center gap-2 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-[16px] shadow-md border ${isMecha ? 'border-blue-300' : 'border-pink-200'}`}>
          {isMecha ? <Crosshair size={16} className="text-blue-500" /> : <Sparkles size={16} className="text-pink-500" />}
          <span className={`text-[11px] font-black tracking-wider uppercase ${isMecha ? 'text-blue-600' : 'text-pink-500'}`}>
            {isMecha ? 'TARGET ACQUISITION' : 'Magical Scan'}
          </span>
        </div>
        <div className="w-10 h-10"></div> {/* Spacer */}
      </div>

      {/* Viewfinder State */}
      <AnimatePresence>
        {sheetState === "viewfinder" && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center pt-48 pb-[180px] z-10"
          >
            <div className="w-full max-w-[280px] aspect-[3/4] relative">
              <div className={`absolute top-0 left-0 w-10 h-10 border-t-[4px] border-l-[4px] rounded-tl-[32px] ${isMecha ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.5)]'}`}></div>
              <div className={`absolute top-0 right-0 w-10 h-10 border-t-[4px] border-r-[4px] rounded-tr-[32px] ${isMecha ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.5)]'}`}></div>
              <div className={`absolute bottom-0 left-0 w-10 h-10 border-b-[4px] border-l-[4px] rounded-bl-[32px] ${isMecha ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.5)]'}`}></div>
              <div className={`absolute bottom-0 right-0 w-10 h-10 border-b-[4px] border-r-[4px] rounded-br-[32px] ${isMecha ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.5)]'}`}></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center bg-white/30 backdrop-blur-md shadow-sm">
                  <Camera size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-white text-sm font-bold tracking-wide drop-shadow-md text-center max-w-[80%]">
                  {isMecha ? 'CENTER TARGET IN HUD' : 'Pasin struk di kotak ya!'}
                </span>
              </div>
            </div>

            <div className="flex-1" />

            {/* Bottom Camera Controls Row */}
            <div className="flex justify-between items-center w-full max-w-[340px] px-8">
              <button 
                onClick={() => setIsFlashOn(!isFlashOn)}
                className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shrink-0 ${isFlashOn ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]' : 'bg-black/40 border-white/20 text-white hover:bg-white/20'}`}
                onMouseEnter={() => { setMood("thinking"); setMsg("Gelap ya? Pake flash aja sini! 🔦"); }}
              >
                <Flashlight size={20} />
              </button>

              {/* Shutter Button */}
              <div className="relative z-20 flex flex-col items-center">
                <button 
                  onClick={() => handleCapture()}
                  onMouseEnter={() => { setMood("happy"); setMsg(isMecha ? "SCANNER PREPPED." : "Ready? 1, 2, 3... Cekrek! 🧀"); }}
                  onMouseLeave={() => { setMood("excited"); setMsg(initialMsg); }}
                  className="group relative w-[100px] h-[100px] flex items-center justify-center"
                >
                  {/* Outer animated pulsing ring */}
                  <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isMecha ? 'bg-blue-400' : 'bg-pink-400'}`}></div>
                  
                  {/* Middle glass ring */}
                  <div className={`absolute inset-2 bg-white/10 backdrop-blur-md rounded-full border-[2px] group-hover:scale-105 transition-transform duration-300 ${isMecha ? 'border-blue-300/50' : 'border-pink-300/50'}`}></div>
                  
                  {/* Inner solid button */}
                  <div className={`relative z-10 w-[68px] h-[68px] rounded-full group-active:scale-95 transition-all duration-300 flex items-center justify-center shadow-2xl ${isMecha ? 'bg-gradient-to-tr from-blue-500 via-cyan-400 to-teal-400 shadow-[0_0_40px_rgba(59,130,246,0.8)]' : 'bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 shadow-[0_0_40px_rgba(236,72,153,0.8)]'}`}>
                    <Camera className="text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" size={32} strokeWidth={2} />
                  </div>
                </button>
              </div>

              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all text-white shrink-0"
                onMouseEnter={() => { setMood("cute"); setMsg("Upload dari galeri juga bisa lho! 🖼️"); }}
              >
                <ImageIcon size={20} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleCapture(e.target.files[0]);
                  }
                }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Animation State */}
      <AnimatePresence>
        {sheetState === "processing" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8"
          >
            {/* Flash Effect on capture */}
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 z-0 pointer-events-none ${isMecha ? 'bg-blue-100' : 'bg-pink-100'}`}
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className={`w-32 h-32 bg-white/80 rounded-full flex items-center justify-center border-4 shadow-xl backdrop-blur-md ${isMecha ? 'border-blue-300 shadow-blue-200/50' : 'border-pink-200 shadow-pink-200/50'}`}
              >
                <motion.div
                  key={loadingText}
                  initial={{ rotate: -15, scale: 0.8 }}
                  animate={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                >
                  {loadingIcon}
                </motion.div>
              </motion.div>

              <div className={`bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full border shadow-md ${isMecha ? 'border-blue-200' : 'border-pink-100'}`}>
                <motion.span 
                  key={loadingText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`font-black tracking-wide text-sm ${isMecha ? 'text-blue-600 font-mono' : 'text-pink-500'}`}
                >
                  {loadingText}
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Bottom Sheet */}
      <AnimatePresence>
        {sheetState === "result" && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 z-30 backdrop-blur-md"
            />
            <ResultSheet 
              onClose={() => {
                setSheetState("viewfinder");
                setMood("excited");
                setMsg("Scan lagi dong, biar rajin nyatet! 📸");
              }} 
              onSave={onGoToDashboard}
              theme={theme}
              onNavigate={onNavigate}
              parsedData={parsedData}
            />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetState !== "result" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none z-40">
            <Mascot theme={theme} mood={mood} message={msg} customBottom="bottom-8" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};