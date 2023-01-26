import { useMemo } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SafeAreaView, Text } from "react-native";
import styles from "./styles";
import { useTheme } from "../../contexts/ThemeContext";
import { themes } from "../../styles/colors";

const Container = Animated.createAnimatedComponent(SafeAreaView);
const Title = Animated.createAnimatedComponent(Text);

export default function Home() {
  const { currentTheme, setCurrentTheme } = useTheme();
  const colorTheme = useMemo(() => themes[currentTheme], [themes, currentTheme]);

  const light_3 = useSharedValue(colorTheme.light_3);
  const light_2 = useSharedValue(colorTheme.light_2);
  const light_1 = useSharedValue(colorTheme.light_1);
  const normal = useSharedValue(colorTheme.normal);
  const dark_1 = useSharedValue(colorTheme.dark_1);
  const dark_2 = useSharedValue(colorTheme.dark_2);
  const dark_3 = useSharedValue(colorTheme.dark_3);

  const containerStyle = useAnimatedStyle(() => {
    return { backgroundColor: withTiming(dark_3.value) }
  });

  const titleStyle = useAnimatedStyle(() => {
    return { color: withTiming(light_1.value) }
  });

  return (
    <Container style={[styles.container, containerStyle]}>
      <Title style={[styles.title, titleStyle]}>
        Ativado
      </Title>
    </Container>
  );
};