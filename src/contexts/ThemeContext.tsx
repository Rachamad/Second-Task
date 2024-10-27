// src/contexts/ThemeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  setThemeColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');
  const [themeColor, setThemeColor] = useState<string>('#ffffff'); // Default color

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeColor }}>
      <div style={{ backgroundColor: theme === 'dark' ? '#333' : themeColor, color: theme === 'dark' ? '#fff' : '#000', minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
