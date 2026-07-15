import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SplashView } from "../features/auth/SplashView";
import { CameraView } from "../features/camera/CameraView";
import { DashboardView } from "../features/dashboard/DashboardView";
import { LoginView } from "../features/auth/LoginView";
import { InsightsView } from "../features/insights/InsightsView";
import { HistoryView } from "../features/history/HistoryView";
import { ProfileView } from "../features/profile/ProfileView";
import { RewardsStoreView } from "../features/rewards/RewardsStoreView";
import { SubView } from "../features/dashboard/SubView";
import { ThemeState, Inventory, UserProfile } from "../../core/entities";
import { useAppStore } from "../../core/store/useAppStore";

type ViewState = "splash" | "login" | "camera" | "dashboard" | "insights" | "income" | "splitBill" | "expense" | "rewards" | "store" | "history" | "savings" | "editProfile";

const viewVariants = {
  initial: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 1.05, filter: "blur(4px)", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("splash");
  
  const { 
    theme, setTheme, 
    points, setPoints, 
    level, setLevel, 
    inventory, setInventory, 
    userProfile, setUserProfile 
  } = useAppStore();

  useEffect(() => {
    if (currentView === "splash") {
      const timer = setTimeout(() => {
        setCurrentView("login");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

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