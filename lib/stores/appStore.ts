import { create } from 'zustand';

// Define the app state interface
interface AppState {
  // App-wide settings
  isOnline: boolean;
  isDarkMode: boolean;
  activeModules: string[];
  
  // App actions
  setOnlineStatus: (status: boolean) => void;
  setDarkMode: (isDark: boolean) => void;
  toggleModule: (moduleId: string) => void;
}

// Create the store
export const useAppStore = create<AppState>((set) => ({
  isOnline: true,
  isDarkMode: false,
  activeModules: ['inventory', 'sales', 'customers'], // Default active modules

  // Actions
  setOnlineStatus: (status: boolean) => set({ isOnline: status }),
  setDarkMode: (isDark: boolean) => set({ isDarkMode: isDark }),
  toggleModule: (moduleId: string) => 
    set((state) => {
      const isActive = state.activeModules.includes(moduleId);
      return {
        activeModules: isActive
          ? state.activeModules.filter((id) => id !== moduleId)
          : [...state.activeModules, moduleId]
      };
    }),
}));
