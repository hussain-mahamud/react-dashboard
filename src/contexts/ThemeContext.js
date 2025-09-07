import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Available theme types
export const availableThemes = {
  DEFAULT: 'default',
  PURPLE: 'purple',
  GREEN: 'green',
  ORANGE: 'orange',
  BLUE: 'blue',
  PINK: 'pink',
  DARK: 'dark'
};

// Theme configurations
export const themeConfigs = {
  [availableThemes.DEFAULT]: {
    name: 'Default Blue',
    primaryColor: '#2563eb',
    accentColor: '#3b82f6',
    backgroundColor: '#ffffff',
    surfaceColor: '#f8fafc',
    headerColor: '#ffffff',
    sidebarColor: '#ffffff',
    bgColor: '#ffffff',
    hoverColor: '#f3f4f6',
    textColor: '#1f2937',
    textSecondary: '#6b7280'
  },
  [availableThemes.PURPLE]: {
    name: 'Royal Purple',
    primaryColor: '#7c3aed',
    accentColor: '#8b5cf6',
    backgroundColor: '#ffffff',
    surfaceColor: '#faf5ff',
    headerColor: '#ffffff',
    sidebarColor: '#ffffff',
    bgColor: '#ffffff',
    hoverColor: '#f3f4f6',
    textColor: '#1f2937',
    textSecondary: '#6b7280'
  },
  [availableThemes.GREEN]: {
    name: 'Nature Green',
    primaryColor: '#059669',
    accentColor: '#10b981',
    backgroundColor: '#ffffff',
    surfaceColor: '#f0fdf4',
    headerColor: '#ffffff',
    sidebarColor: '#ffffff',
    bgColor: '#ffffff',
    hoverColor: '#f3f4f6',
    textColor: '#1f2937',
    textSecondary: '#6b7280'
  },
  [availableThemes.ORANGE]: {
    name: 'Sunset Orange',
    primaryColor: '#ea580c',
    accentColor: '#f97316',
    backgroundColor: '#ffffff',
    surfaceColor: '#fff7ed',
    headerColor: '#ffffff',
    sidebarColor: '#ffffff',
    bgColor: '#ffffff',
    hoverColor: '#f3f4f6',
    textColor: '#1f2937',
    textSecondary: '#6b7280'
  },
  [availableThemes.BLUE]: {
    name: 'Ocean Blue',
    primaryColor: '#0284c7',
    accentColor: '#0ea5e9',
    backgroundColor: '#ffffff',
    surfaceColor: '#f0f9ff',
    headerColor: '#ffffff',
    sidebarColor: '#ffffff',
    bgColor: '#ffffff',
    hoverColor: '#f3f4f6',
    textColor: '#1f2937',
    textSecondary: '#6b7280'
  },
  [availableThemes.PINK]: {
    name: 'Rose Pink',
    primaryColor: '#db2777',
    accentColor: '#ec4899',
    backgroundColor: '#ffffff',
    surfaceColor: '#fdf2f8',
    headerColor: '#ffffff',
    sidebarColor: '#ffffff',
    bgColor: '#ffffff',
    hoverColor: '#f3f4f6',
    textColor: '#1f2937',
    textSecondary: '#6b7280'
  },
  [availableThemes.DARK]: {
    name: 'Dark Mode',
    primaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    backgroundColor: '#111827',
    surfaceColor: '#1f2937',
    headerColor: '#1f2937',
    sidebarColor: '#1f2937',
    bgColor: '#111827',
    hoverColor: '#374151',
    textColor: '#f9fafb',
    textSecondary: '#d1d5db'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('dashboard-theme');
    return savedTheme && Object.values(availableThemes).includes(savedTheme) 
      ? savedTheme 
      : availableThemes.DEFAULT;
  });

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('dashboard-theme', themeName);
  };

  const themeConfig = themeConfigs[currentTheme];

  // Apply CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const config = themeConfigs[currentTheme];
    
    if (config) {
      root.style.setProperty('--theme-primary', config.primaryColor);
      root.style.setProperty('--theme-accent', config.accentColor);
      root.style.setProperty('--theme-background', config.backgroundColor);
      root.style.setProperty('--theme-surface', config.surfaceColor);
      root.style.setProperty('--theme-header', config.headerColor);
      root.style.setProperty('--theme-sidebar', config.sidebarColor);
      root.style.setProperty('--theme-bg', config.bgColor);
      root.style.setProperty('--theme-hover', config.hoverColor);
      root.style.setProperty('--theme-text', config.textColor);
      root.style.setProperty('--theme-text-secondary', config.textSecondary);
      
      // Set data-theme attribute for theme-specific CSS
      root.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme]);

  const value = {
    currentTheme,
    changeTheme,
    availableThemes,
    themeConfigs,
    themeConfig
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};