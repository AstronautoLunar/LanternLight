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
import { Camera } from "expo-camera";
import { Alert } from "react-native";

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
  const [currentTheme, setCurrentTheme] = useState<NameThemes>("purple");
  const [isActiveLantern, setIsActiveLantern] = useState(false);
  const [isAcceptPermission, setIsAcceptPermission] = useState(false);
  const colorTheme = useMemo(() => themes[currentTheme], [themes, currentTheme]);
  
  //@ts-ignore
  const [_permission, requestPermission] = Camera.useCameraPermissions();

  const light_1 = useSharedValue(colorTheme.light_1);
  const normal = useSharedValue(colorTheme.normal);
  const dark_1 = useSharedValue(colorTheme.dark_1);
  const dark_2 = useSharedValue(colorTheme.dark_2);
  const dark_3 = useSharedValue(colorTheme.dark_3);

  const requestPermissionCameraAsync = useCallback(async () => {
    try {
      const result = await requestPermission();
  
      setIsAcceptPermission(result.granted);
      if (!result.granted) {
        Alert.alert("Deve aceitar a permissão da câmera para utilizar a lanterna");
      } 
    } catch (error) {
      Alert.alert("Não foi possível enviar pedido de permissão para uso da câmera");
    }
  }, [setIsAcceptPermission])

  const toggleTheme = useCallback(async () => {
    if (!isAcceptPermission) {
      requestPermissionCameraAsync();

      return;
    }

    if (currentTheme === "yellow") {
      setCurrentTheme("purple");

      setIsActiveLantern(false);

    } else {
      setCurrentTheme("yellow");

      setIsActiveLantern(true);
    }
  }, [
    currentTheme,
    setCurrentTheme,
    light_1,
    normal,
    dark_1,
    dark_2,
    dark_3,
    setIsActiveLantern,
    requestPermission,
    isAcceptPermission,
    requestPermissionCameraAsync
  ]);

  const CONFIGURATION_ANIMATION = { duration: 300 };

  useEffect(() => {
    light_1.value = withTiming(colorTheme.light_1, CONFIGURATION_ANIMATION);
    normal.value = withTiming(colorTheme.normal, CONFIGURATION_ANIMATION);
    dark_1.value = withTiming(colorTheme.dark_1, CONFIGURATION_ANIMATION);
    dark_2.value = withTiming(colorTheme.dark_2, CONFIGURATION_ANIMATION);
    dark_3.value = withTiming(colorTheme.dark_3, CONFIGURATION_ANIMATION);
  }, [currentTheme]);

  useEffect(() => {
    requestPermissionCameraAsync();
  }, []);

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
      <Camera
        style={{
          width: 1,
          height: 1,
          position: "absolute",
          zIndex: -2,
          opacity: 0,
        }}
        flashMode={isActiveLantern ? 2 : 1}
      />
    </ThemeContext.Provider>
  )
};

export function useTheme() {
  return useContext(ThemeContext);
}