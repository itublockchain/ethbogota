import { useState } from 'react';
import { getThemePreference, setLocalStorage } from 'utils';

type UseThemeReturnType = {
  toggleTheme: () => void;
  theme: 'dark' | 'light';
};

export const useTheme = (): UseThemeReturnType => {
  const [darkTheme, setDarkTheme] = useState(getThemePreference());

  const toggleTheme = () => {
    setLocalStorage('theme', darkTheme ? 'light' : 'dark');
    setDarkTheme(!darkTheme);
  };

  return { toggleTheme, theme: darkTheme ? 'dark' : 'light' };
};
