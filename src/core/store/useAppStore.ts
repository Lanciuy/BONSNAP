import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState, Inventory, UserProfile } from '../entities/types';
import { Swords, ShoppingBag, Car, Coffee } from 'lucide-react';

export interface Transaction {
  id: string;
  merchant: string;
  category: string;
  time: string;
  amount: number;
  iconName: string;
  color: string;
  bg: string;
  hoverMsg: string;
  hoverMood: string;
}

interface AppState {
  theme: ThemeState;
  points: number;
  level: number;
  inventory: Inventory;
  userProfile: UserProfile;
  transactions: Transaction[];
  
  setTheme: (theme: ThemeState) => void;
  setPoints: (points: number) => void;
  setLevel: (level: number) => void;
  setInventory: (inventory: Inventory) => void;
  setUserProfile: (profile: UserProfile) => void;
  addTransaction: (tx: Transaction) => void;
}

const defaultUserProfile: UserProfile = {
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
  activeAvatarId: "default",
  walletName: "MAGIC POUCH",
  budget: 5000000,
  activeWalletSkinId: "default"
};

const defaultInventory: Inventory = {
  avatars: ['default'],
  banners: ['default'],
  frames: ['none', 'gold'],
  themes: ['genz'],
  walletSkins: ['default']
};

const defaultTransactions: Transaction[] = [
  { id: "1", merchant: "Maid Cafe", category: "Food & Beverage", time: "Today, 14:30", amount: 45000, iconName: "Coffee", color: "text-pink-500", bg: "bg-pink-100", hoverMsg: "Buset jajan manis mulu, gak takut diabetes? 🍰", hoverMood: "cute" },
  { id: "2", merchant: "Convenience Store", category: "Groceries", time: "Yesterday, 18:15", amount: 125000, iconName: "ShoppingBag", color: "text-purple-500", bg: "bg-purple-100", hoverMsg: "Nyetok camilan buat marathon drakor ya? 🍫", hoverMood: "thinking" },
  { id: "3", merchant: "Train Ticket", category: "Transport", time: "Yesterday, 09:00", amount: 35000, iconName: "Car", color: "text-blue-500", bg: "bg-blue-100", hoverMsg: "Jalan-jalan terus, FOMO ya bestie? 🚋", hoverMood: "happy" },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'genz',
      points: 1200,
      level: 12,
      inventory: defaultInventory,
      userProfile: defaultUserProfile,
      transactions: defaultTransactions,
      
      setTheme: (theme) => set({ theme }),
      setPoints: (points) => set({ points }),
      setLevel: (level) => set({ level }),
      setInventory: (inventory) => set({ inventory }),
      setUserProfile: (userProfile) => set({ userProfile }),
      addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] }))
    }),
    {
      name: 'bonsnap-storage', // key in localStorage
    }
  )
);
