export type ThemeState = "original" | "genz" | "mecha";

export interface Inventory {
  avatars: string[];
  banners: string[];
  frames: string[];
  themes: string[];
  walletSkins: string[];
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
  walletName: string;
  budget: number;
  activeWalletSkinId: string;
}
