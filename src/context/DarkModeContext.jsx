import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { createContext } from 'react';

const DarkModeContext = createContext();
const systemColor = window.matchMedia('(prefers-color-scheme: dark)').matches;

function DarkModeProvider({ children }) {
  const [darkMode, setIsDarkMode] = useLocalStorageState(
    systemColor,
    'darkMode'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

const useDarkMode = () => {
  const value = useContext(DarkModeContext);
  if (value === undefined)
    throw new Error('Cannot use context outside provider!');
  return value;
};

export { DarkModeProvider, useDarkMode };
