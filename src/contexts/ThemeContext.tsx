import { 
  createContext, 
  useCallback, 
  useContext, 
  useEffect, 
  useMemo, 
  useState 
} from "react";
import { 
  SharedValue, 
  useSharedValue, 
  withTiming 
} from "react-native-reanimated";
import { themes } from "../styles/colors";
import FlashList from "react-native-flashlight";
import { NativeModules } from "react-native";

type NameThemes = keyof typeof themes;

type ThemeContextProps = {
  currentTheme: NameThemes;
  setCurrentTheme: React.Dispatch<React.SetStateAction<NameThemes>>;
  light_1: SharedValue<string>;
  normal: SharedValue<string>;
  dark_1: SharedValue<string>;
  dark_2: SharedValue<string>;
  dark_3: SharedValue<string>;
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContextProps);

type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<NameThemes>("yellow");
  const colorTheme = useMemo(() => themes[currentTheme], [themes, currentTheme]);

  const light_3 = useSharedValue(colorTheme.light_3);
  const light_2 = useSharedValue(colorTheme.light_2);
  const light_1 = useSharedValue(colorTheme.light_1);
  const normal = useSharedValue(colorTheme.normal);
  const dark_1 = useSharedValue(colorTheme.dark_1);
  const dark_2 = useSharedValue(colorTheme.dark_2);
  const dark_3 = useSharedValue(colorTheme.dark_3);

  const toggleTheme = useCallback(async () => {
    if (currentTheme === "yellow") {
      setCurrentTheme("purple");

      // await FlashList.openFlashLight();
      // NativeModules.FlashLight.switchState();
      console.log(NativeModules);
    } else {
      setCurrentTheme("yellow");

      // await FlashList.closeFlashLight();
    }
  }, [
    currentTheme,
    setCurrentTheme,
    light_1,
    normal,
    dark_1,
    dark_2,
    dark_3
  ]);

  useEffect(() => {
    light_1.value = withTiming(colorTheme.light_1, { duration: 500 });
    normal.value = withTiming(colorTheme.normal, { duration: 500 });
    dark_1.value = withTiming(colorTheme.dark_1, { duration: 500 });
    dark_2.value = withTiming(colorTheme.dark_2, { duration: 500 });
    dark_3.value = withTiming(colorTheme.dark_3, { duration: 500 });
  }, [currentTheme]);

  return (
    <ThemeContext.Provider 
      value={{
        currentTheme,
        setCurrentTheme,
        light_1,
        normal,
        dark_1,
        dark_2,
        dark_3,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
};

export function useTheme() {
  return useContext(ThemeContext);
}