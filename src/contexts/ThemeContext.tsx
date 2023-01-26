import { createContext, useContext, useState } from "react";
import { themes } from "../styles/colors";

type NameThemes = keyof typeof themes;

type ThemeContextProps = {
  currentTheme: NameThemes;
  setCurrentTheme: React.Dispatch<React.SetStateAction<NameThemes>>;
}

const ThemeContext = createContext({} as ThemeContextProps);

type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<NameThemes>("yellow");

  return (
    <ThemeContext.Provider 
      value={{
        currentTheme,
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
};

export function useTheme() {
  return useContext(ThemeContext);
}