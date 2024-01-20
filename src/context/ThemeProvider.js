import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "dark";
const lightTheme = "light";

export default function ThemeProvider({ children }) {
  const ToggleTheme = () => {
    const existingTheme = getTheme();
    const newTheme = existingTheme===defaultTheme?lightTheme:defaultTheme;
    updateTheme(newTheme,existingTheme);
  };

  useEffect(() => {
    const existingTheme = getTheme();
    if(!existingTheme){
      updateTheme(defaultTheme)
    }else{
      updateTheme(existingTheme)
    }
  },[]);

  const getTheme = () => localStorage.getItem("theme");

  const updateTheme = (newTheme,existingTheme)=>{
    document.documentElement.classList.remove(existingTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme",newTheme);
  }
  return (
    <ThemeContext.Provider value={{ ToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
