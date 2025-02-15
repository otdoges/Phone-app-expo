import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  runOnJS,
  FadeIn,
  SlideInDown,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedButton } from '../../components/AnimatedPressable';

const BOARD_WIDTH = Math.min(Dimensions.get('window').width - 40, 400);
const PIN_SIZE = 8;
const BALL_SIZE = 12;
const ROWS = 8;
const COLS = 9;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PlinkoScreen() {
  const [virtualBalance, setVirtualBalance] = useState(10000);
  const [betAmount, setBetAmount] = useState(100);
  const [isDropping, setIsDropping] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: -BALL_SIZE });
  const [multiplier, setMultiplier] = useState(0);
  const [totalLost, setTotalLost] = useState(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(ballPosition.x, { damping: 12, stiffness: 90 }) },
      { translateY: withSpring(ballPosition.y, { damping: 12, stiffness: 90 }) },
    ],
  }));

  const dropBall = () => {
    if (isDropping || virtualBalance < betAmount) return;

    setIsDropping(true);
    setVirtualBalance(prev => prev - betAmount);
    setTotalLost(prev => prev + betAmount);

    let currentX = BOARD_WIDTH / 2;
    let currentY = -BALL_SIZE;
    let path = [];

    // Simulate ball path with more realistic physics
    for (let i = 0; i < ROWS; i++) {
      const direction = Math.random() < 0.5 ? -1 : 1;
      const randomOffset = Math.random() * 5; // Add some randomness to the movement
      currentX += direction * (BOARD_WIDTH / COLS + randomOffset);
      currentY += (BOARD_WIDTH / ROWS);
      path.push({ x: currentX, y: currentY });
    }

    const finalMultiplier = calculateMultiplier(currentX);
    const winAmount = betAmount * finalMultiplier;

    // Animate through path with dynamic timing
    path.forEach((pos, index) => {
      setTimeout(() => {
        setBallPosition(pos);
        if (index === path.length - 1) {
          setMultiplier(finalMultiplier);
          setVirtualBalance(prev => prev + winAmount);
          setTimeout(() => {
            setIsDropping(false);
            setBallPosition({ x: 0, y: -BALL_SIZE });
            setMultiplier(0);
          }, 1500);
        }
      }, index * 200);
    });
  };

  const calculateMultiplier = (finalX: number) => {
    const position = Math.floor((finalX / BOARD_WIDTH) * COLS);
    const multipliers = [0.2, 0.3, 0.5, 1.5, 2, 1.5, 0.5, 0.3, 0.2];
    return multipliers[Math.min(Math.max(position, 0), multipliers.length - 1)];
  };

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(500)}
    >
      <Animated.View 
        style={styles.header}
        entering={SlideInDown.duration(500).delay(200)}
      >
        <Text style={styles.balanceText}>Virtual Balance: ${virtualBalance}</Text>
        <Text style={styles.lossText}>Total Lost: ${totalLost}</Text>
      </Animated.View>

      <Animated.View 
        style={styles.board}
        entering={SlideInDown.duration(500).delay(400)}
      >
        {Array.from({ length: ROWS }).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: row + 5 }).map((_, col) => (
              <Animated.View 
                key={col} 
                style={styles.pin}
                entering={FadeIn.duration(200).delay(row * 100 + col * 50)} 
              />
            ))}
          </View>
        ))}

        <Animated.View style={[styles.ball, animatedStyle]} />

        <View style={styles.multipliers}>
          {[0.2, 0.3, 0.5, 1.5, 2, 1.5, 0.5, 0.3, 0.2].map((m, i) => (
            <Animated.Text 
              key={i} 
              style={styles.multiplierText}
              entering={FadeIn.duration(200).delay(i * 100)}
            >
              {m}x
            </Animated.Text>
          ))}
        </View>
      </Animated.View>

      <View style={styles.controls}>
        <AnimatedButton
          style={styles.betButton}
          onPress={() => setBetAmount(prev => Math.max(prev - 100, 100))}
        >
          <Text style={styles.buttonText}>-</Text>
        </AnimatedButton>
        
        <Text style={styles.betText}>Bet: ${betAmount}</Text>
        
        <AnimatedButton
          style={styles.betButton}
          onPress={() => setBetAmount(prev => Math.min(prev + 100, virtualBalance))}
        >
          <Text style={styles.buttonText}>+</Text>
        </AnimatedButton>
      </View>

      <AnimatedButton
        style={[styles.dropButton, isDropping && styles.dropButtonDisabled]}
        onPress={dropBall}
        disabled={isDropping}
        scale={0.95}
        springConfig={{
          damping: 15,
          stiffness: 150,
        }}
      >
        <Text style={styles.dropButtonText}>
          {isDropping ? 'Dropping...' : 'Drop Ball'}
        </Text>
      </AnimatedButton>

      {multiplier > 0 && (
        <Animated.View 
          style={styles.result}
          entering={SlideInDown.duration(500)}
        >
          <Text style={styles.resultText}>
            {multiplier > 1 ? 'Won' : 'Lost'}: ${(betAmount * multiplier - betAmount).toFixed(2)}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  balanceText: {
    color: '#00ff00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  lossText: {
    color: '#ff4444',
    fontSize: 16,
  },
  board: {
    width: BOARD_WIDTH,
    height: BOARD_WIDTH * 1.2,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 15,
  },
  pin: {
    width: PIN_SIZE,
    height: PIN_SIZE,
    backgroundColor: '#666',
    borderRadius: PIN_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  ball: {
    position: 'absolute',
    width: BALL_SIZE,
    height: BALL_SIZE,
    backgroundColor: '#00ff00',
    borderRadius: BALL_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  multipliers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 10,
  },
  multiplierText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  betButton: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  betText: {
    color: '#fff',
    fontSize: 18,
  },
  dropButton: {
    backgroundColor: '#00ff00',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropButtonDisabled: {
    backgroundColor: '#666',
  },
  dropButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
  },
});