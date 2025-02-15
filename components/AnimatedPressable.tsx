import { Pressable, PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  withSequence,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  scale?: number;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

export function AnimatedButton({ 
  scale = 0.95, 
  style, 
  springConfig = {
    damping: 10,
    stiffness: 100,
    mass: 0.5,
  },
  ...props 
}: Props) {
  const pressed = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(pressed.value, springConfig) },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const handlePressIn = () => {
    pressed.value = scale;
    rotation.value = withSequence(
      withSpring(-2, springConfig),
      withSpring(2, springConfig),
      withSpring(0, springConfig)
    );
  };

  const handlePressOut = () => {
    pressed.value = withSpring(1, springConfig);
  };

  return (
    <AnimatedPressable
      style={[animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    />
  );
}

export function AnimatedCard({ 
  children, 
  style, 
  onPress,
  ...props 
}: Props & { children: React.ReactNode }) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      damping: 15,
      stiffness: 150,
    });
    translateY.value = withSpring(2, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  };

  return (
    <AnimatedPressable
      style={[animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}