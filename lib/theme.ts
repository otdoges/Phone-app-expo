import { useStore } from './store';

export const useTheme = () => {
  const darkMode = useStore((state) => state.darkMode);

  return {
    colors: {
      background: darkMode ? '#1a1a1a' : '#f5f5f5',
      card: darkMode ? '#2a2a2a' : '#ffffff',
      text: darkMode ? '#ffffff' : '#000000',
      primary: '#00ff00',
      error: '#ff4444',
      border: darkMode ? '#333333' : '#e0e0e0',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
  };
};