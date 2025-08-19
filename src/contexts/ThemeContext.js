import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Define available themes
export const THEMES = {
  DEFAULT: 'default',
  PURPLE: 'purple',
  GREEN: 'green',
  ORANGE: 'orange',
  BLUE: 'blue',
  PINK: 'pink',
  DARK: 'dark'
};

// Theme configurations
export const THEME_CONFIGS = {
  [THEMES.DEFAULT]: {
    name: 'Default Blue',
    primary: 'blue-600',
    primaryLight: 'blue-50',
    primaryDark: 'blue-700',
    accent: 'blue-500',
    gradient: 'from-blue-600 to-purple-700',
    sidebar: 'bg-white border-gray-200',
    header: 'bg-white border-gray-200',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-gray-200'
  },
  [THEMES.PURPLE]: {
    name: 'Royal Purple',
    primary: 'purple-600',
    primaryLight: 'purple-50',
    primaryDark: 'purple-700',
    accent: 'purple-500',
    gradient: 'from-purple-600 to-pink-600',
    sidebar: 'bg-white border-purple-200',
    header: 'bg-white border-purple-200',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-purple-200'
  },
  [THEMES.GREEN]: {
    name: 'Nature Green',
    primary: 'green-600',
    primaryLight: 'green-50',
    primaryDark: 'green-700',
    accent: 'green-500',
    gradient: 'from-green-600 to-teal-600',
    sidebar: 'bg-white border-green-200',
    header: 'bg-white border-green-200',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-green-200'
  },
  [THEMES.ORANGE]: {
    name: 'Sunset Orange',
    primary: 'orange-600',
    primaryLight: 'orange-50',
    primaryDark: 'orange-700',
    accent: 'orange-500',
    gradient: 'from-orange-600 to-red-600',
    sidebar: 'bg-white border-orange-200',
    header: 'bg-white border-orange-200',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-orange-200'
  },
  [THEMES.BLUE]: {
    name: 'Ocean Blue',
    primary: 'blue-500',
    primaryLight: 'blue-50',
    primaryDark: 'blue-600',
    accent: 'blue-400',
    gradient: 'from-blue-500 to-cyan-600',
    sidebar: 'bg-white border-blue-200',
    header: 'bg-white border-blue-200',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-blue-200'
  },
  [THEMES.PINK]: {
    name: 'Rose Pink',
    primary: 'pink-600',
    primaryLight: 'pink-50',
    primaryDark: 'pink-700',
    accent: 'pink-500',
    gradient: 'from-pink-600 to-rose-600',
    sidebar: 'bg-white border-pink-200',
    header: 'bg-white border-pink-200',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-pink-200'
  },
  [THEMES.DARK]: {
    name: 'Dark Mode',
    primary: 'gray-700',
    primaryLight: 'gray-800',
    primaryDark: 'gray-900',
    accent: 'gray-600',
    gradient: 'from-gray-800 to-gray-900',
    sidebar: 'bg-gray-900 border-gray-700',
    header: 'bg-gray-900 border-gray-700',
    card: 'bg-gray-800',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    border: 'border-gray-700'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Get theme from localStorage or default
    return localStorage.getItem('theme') || THEMES.DEFAULT;
  });

  const themeConfig = THEME_CONFIGS[currentTheme];

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    
    // Apply theme to document root for CSS variables
    const root = document.documentElement;
    const config = THEME_CONFIGS[theme];
    
    // Set CSS custom properties for the theme
    root.style.setProperty('--theme-primary', config.primary);
    root.style.setProperty('--theme-primary-light', config.primaryLight);
    root.style.setProperty('--theme-primary-dark', config.primaryDark);
    root.style.setProperty('--theme-accent', config.accent);
  };

  // Apply theme on mount
  useEffect(() => {
    changeTheme(currentTheme);
  }, [currentTheme]);

  const value = {
    currentTheme,
    themeConfig,
    changeTheme,
    availableThemes: THEMES,
    themeConfigs: THEME_CONFIGS
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
