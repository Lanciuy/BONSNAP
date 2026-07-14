import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SplashView } from "./components/SplashView";
import { CameraView } from "./components/CameraView";
import { DashboardView } from "./components/DashboardView";
import { LoginView } from "./components/LoginView";
import { InsightsView } from "./components/InsightsView";
import { HistoryView } from "./components/HistoryView";
import { ProfileView } from "./components/ProfileView";
import { RewardsStoreView } from "./components/RewardsStoreView";

import { SubView } from "./components/SubView";

type ViewState = "splash" | "login" | "camera" | "dashboard" | "insights" | "income" | "splitBill" | "expense" | "rewards" | "store" | "history" | "savings" | "editProfile";
export type ThemeState = "original" | "genz" | "mecha";

export interface Inventory {
  avatars: string[];
  banners: string[];
  frames: string[];
  themes: string[];
}

export interface UserProfile {
  name: string;
  username: string;
  bio: string;
  university: string;
  location: string;
  financialPersona: string;
  accentColor: string;
  goalName: string;
  goalTarget: string;
  goalSaved: string;
  activeBannerId: string;
  activeFrameId: string;
  activeAvatarId: string;
}

const viewVariants = {
  initial: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 1.05, filter: "blur(4px)", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("splash");
  const [points, setPoints] = useState(1200);
  const [level, setLevel] = useState(12);
  const [inventory, setInventory] = useState<Inventory>({
    avatars: ['default'],
    banners: ['default'],
    frames: ['none', 'gold'],
    themes: ['genz']
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Sarah Jenkins",
    username: "sarahj.str",
    bio: "Coffee addict ☕ | UI/UX Designer by day, professional overthinker by night. Trying to stop my Shopee checkout habit (failed miserably).",
    university: "Universitas Indonesia",
    location: "Jakarta Selatan",
    financialPersona: "Gacha Victim 🎰 (Zero Luck)",
    accentColor: "text-teal-400",
    goalName: "Tiket Konser Blackpink",
    goalTarget: "2000000",
    goalSaved: "1500000",
    activeBannerId: "default",
    activeFrameId: "gold",
    activeAvatarId: "default"
  });

  useEffect(() => {
    if (currentView === "splash") {
      const timer = setTimeout(() => {
        setCurrentView("login");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);
  const [theme, setTheme] = useState<ThemeState>("genz");

  const isMecha = theme === "mecha";

  return (
    <div className={`w-full min-h-screen flex items-center justify-center font-sans transition-colors duration-500 ${isMecha ? 'bg-slate-900' : 'bg-[#ffe4e1]'}`}>
      {/* Mobile App Container Constraint */}
      <div className={`w-full h-[100dvh] sm:w-[400px] sm:h-[850px] sm:rounded-[40px] relative overflow-hidden bg-[#fdfbfb] sm:border-[8px] sm:border-white ring-1 flex flex-col shadow-2xl ${isMecha ? 'shadow-[0_20px_60px_rgba(59,130,246,0.3)] ring-blue-100' : 'shadow-[0_20px_60px_rgba(244,114,182,0.3)] ring-pink-100'}`}>
        <AnimatePresence mode="wait">
          {currentView === "splash" && (
            <motion.div key="splash" variants={viewVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 z-50">
              <SplashView theme={theme} />
            </motion.div>
          )}
          {currentView === "login" && (
            <motion.div key="login" variants={viewVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 z-10">
              <LoginView onLogin={() => setCurrentView("dashboard")} theme={theme} />
            </motion.div>
          )}
          {currentView === "camera" && (
            <motion.div key="camera" variants={viewVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 z-10">
              <CameraView onGoToDashboard={() => setCurrentView("dashboard")} onGoToInsights={() => setCurrentView("insights")} theme={theme} />
            </motion.div>
          )}
          {currentView === "dashboard" && (
            <motion.div key="dashboard" variants={viewVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 z-10">
              <DashboardView 
                onGoToCamera={() => setCurrentView("camera")} 
                onGoToInsights={() => setCurrentView("insights")} 
                theme={theme} 
                setTheme={setTheme} 
                onNavigate={(v) => setCurrentView(v as ViewState)} 
                points={points}
                level={level}
                inventory={inventory}
                userProfile={userProfile}
              />
            </motion.div>
          )}
          {currentView === "insights" && (
            <motion.div key="insights" variants={viewVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 z-10">
              <InsightsView 
                onGoToCamera={() => setCurrentView("camera")} 
                onGoToDashboard={() => setCurrentView("dashboard")} 
                theme={theme} 
                onNavigate={(v) => setCurrentView(v as ViewState)}
              />
            </motion.div>
          )}
          {currentView === "history" && (
            <motion.div key="history" variants={viewVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 z-10">
              <HistoryView 
                onGoToCamera={() => setCurrentView("camera")} 
                onGoToDashboard={() => setCurrentView("dashboard")} 
                theme={theme} 
                onNavigate={(v) => setCurrentView(v as ViewState)}
              />
            </motion.div>
          )}
          {currentView === "editProfile" && (
            <motion.div key="editProfile" variants={viewVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 z-10">
              <ProfileView 
                onGoToCamera={() => setCurrentView("camera")} 
                onGoToDashboard={() => setCurrentView("dashboard")} 
                theme={theme} 
                onNavigate={(v) => setCurrentView(v as ViewState)}
                points={points}
                level={level}
                inventory={inventory}
                setInventory={setInventory}
                setTheme={setTheme}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            </motion.div>
          )}
          {(currentView === "rewards" || currentView === "store") && (
            <motion.div key={currentView} variants={viewVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 z-10">
              <RewardsStoreView 
                onBack={() => setCurrentView("dashboard")}
                theme={theme}
                points={points}
                setPoints={setPoints}
                inventory={inventory}
                setInventory={setInventory}
                initialTab={currentView === "store" ? "store" : "quests"}
              />
            </motion.div>
          )}
          {['income', 'splitBill', 'expense', 'savings'].includes(currentView) && (
            <motion.div key={currentView} variants={viewVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 z-20">
              <SubView type={currentView as any} onBack={() => setCurrentView("dashboard")} theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}