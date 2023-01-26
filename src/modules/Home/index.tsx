import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Pressable, SafeAreaView, Text } from "react-native";
import styles from "./styles";
import { useTheme } from "../../contexts/ThemeContext";
import ButtonLantern from "../../components/ButtonLantern";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { themes } from "../../styles/colors";

const Container = Animated.createAnimatedComponent(SafeAreaView);
const Title = Animated.createAnimatedComponent(Text);
const Lantern: any = Animated.createAnimatedComponent(Entypo);
const Moon: any = Animated.createAnimatedComponent(FontAwesome5);

export default function Home() {
  const { 
    currentTheme, 
    light_1,
    normal,
    dark_1,
    dark_2,
    dark_3,
    toggleTheme
  } = useTheme();

  const containerStyle = useAnimatedStyle(() => {
    return { backgroundColor: dark_3.value }
  });

  const titleStyle = useAnimatedStyle(() => {
    return { color: light_1.value }
  });

  const icon = {
    "yellow": {
      component: () => <Lantern name="light-bulb" size={100} color={`${themes.yellow.light_1}dd`}/>,
      text: "Ativado",
    },
    "purple": {
      component: () => <Moon name="moon" size={100} color={`${themes.purple.light_1}dd`}/>,
      text: "Desativado",
    },
  }

  return (
    <Container style={[styles.container, containerStyle]}>
      <Pressable onPress={toggleTheme}>
        <ButtonLantern
          dark_1={dark_1}
          dark_2={dark_2}
          normal={normal}
        >
          {icon[currentTheme].component()}
        </ButtonLantern>
      </Pressable>
      <Title style={[styles.title, titleStyle]}>
      {icon[currentTheme].text}
      </Title>
    </Container>
  );
};