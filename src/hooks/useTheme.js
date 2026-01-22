// Custom Hook for Theme Management
import { useState, useEffect } from 'react';

export const useTheme = () => {
  // Get theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('orchid-theme');
    return savedTheme || 'light';
  });

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  // Update localStorage and body class when theme changes
  useEffect(() => {
    localStorage.setItem('orchid-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
