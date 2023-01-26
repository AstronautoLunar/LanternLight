import { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import styles from "./styles";

type ButtonLanternProps = {
  dark_2: SharedValue<string>;
  dark_1: SharedValue<string>;
  normal: SharedValue<string>;
  children?: JSX.Element | JSX.Element[];
};

export default function ButtonLantern({ 
  dark_2, 
  dark_1, 
  normal,
  children
}: ButtonLanternProps) {
  const stylesAnimationCircleShadow = useAnimatedStyle(() => {
    return {
      backgroundColor: dark_2.value,
    }
  });

  const stylesAnimationCircleArea = useAnimatedStyle(() => {
    return {
      backgroundColor: dark_1.value,
    }
  });
  
  const stylesAnimationCircleSubArea = useAnimatedStyle(() => {
    return {
      backgroundColor: dark_1.value,
      borderColor: normal.value,
      borderWidth: 5
    }
  });

  return (
    <Animated.View style={[styles.circleShadow, stylesAnimationCircleShadow]}>
      <Animated.View style={[styles.circleArea, stylesAnimationCircleArea]}>
        <Animated.View style={[styles.circleSubArea, stylesAnimationCircleSubArea]}>
          {children}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  )
}