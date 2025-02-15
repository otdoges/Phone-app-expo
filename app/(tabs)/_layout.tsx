import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../lib/theme';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Animated.View 
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      entering={FadeIn.duration(500)}
    >
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
            ...(Platform.OS === 'web' ? { position: 'fixed', bottom: 0, left: 0, right: 0 } : {}),
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Plinko',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="triangle" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mines"
          options={{
            title: 'Mines',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="bomb" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sports"
          options={{
            title: 'Sports',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="football" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: 'Statistics',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="stats-chart" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </Animated.View>
  );
}