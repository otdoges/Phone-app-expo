import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useStore } from '../../lib/store';
import { useTheme } from '../../lib/theme';
import { AnimatedButton } from '../../components/AnimatedPressable';
import { Ionicons } from '@expo/vector-icons';

interface Game {
  id: string;
  team1: string;
  team2: string;
  odds1: number;
  odds2: number;
  sport: 'football' | 'basketball' | 'baseball';
}

const SAMPLE_GAMES: Game[] = [
  {
    id: '1',
    team1: 'Eagles',
    team2: 'Chiefs',
    odds1: 1.95,
    odds2: 1.85,
    sport: 'football',
  },
  {
    id: '2',
    team1: 'Lakers',
    team2: 'Celtics',
    odds1: 2.10,
    odds2: 1.75,
    sport: 'basketball',
  },
  {
    id: '3',
    team1: 'Yankees',
    team2: 'Red Sox',
    odds1: 1.90,
    odds2: 1.90,
    sport: 'baseball',
  },
];

export default function SportsScreen() {
  const theme = useTheme();
  const [betAmount, setBetAmount] = useState(100);
  const [selectedBets, setSelectedBets] = useState<Record<string, 1 | 2>>({});
  const { virtualBalance, setVirtualBalance, setTotalLost } = useStore();

  const totalOdds = Object.entries(selectedBets).reduce((acc, [gameId, team]) => {
    const game = SAMPLE_GAMES.find(g => g.id === gameId);
    return acc * (team === 1 ? game.odds1 : game.odds2);
  }, 1);

  const potentialWin = betAmount * totalOdds;

  const toggleBet = (gameId: string, team: 1 | 2) => {
    setSelectedBets(prev => {
      const newBets = { ...prev };
      if (prev[gameId] === team) {
        delete newBets[gameId];
      } else {
        newBets[gameId] = team;
      }
      return newBets;
    });
  };

  const placeBet = () => {
    if (virtualBalance < betAmount) return;
    
    setVirtualBalance(virtualBalance - betAmount);
    setTotalLost(prev => prev + betAmount);

    // Simulate bet result (always lose to demonstrate gambling dangers)
    setTimeout(() => {
      alert('Unfortunately, your bet did not win. This is a common outcome in real gambling, which is why we recommend not gambling with real money.');
      setSelectedBets({});
    }, 1000);
  };

  const getSportIcon = (sport: Game['sport']) => {
    switch (sport) {
      case 'football':
        return 'football';
      case 'basketball':
        return 'basketball';
      case 'baseball':
        return 'baseball';
      default:
        return 'sports';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.gamesList}>
        {SAMPLE_GAMES.map(game => (
          <View 
            key={game.id} 
            style={[styles.gameCard, { backgroundColor: theme.colors.card }]}
          >
            <View style={styles.sportIconContainer}>
              <Ionicons 
                name={getSportIcon(game.sport)} 
                size={24} 
                color={theme.colors.primary} 
              />
            </View>
            
            <View style={styles.teamsContainer}>
              <AnimatedButton
                style={[
                  styles.teamButton,
                  selectedBets[game.id] === 1 && { backgroundColor: theme.colors.primary }
                ]}
                onPress={() => toggleBet(game.id, 1)}
              >
                <Text style={[
                  styles.teamText,
                  selectedBets[game.id] === 1 && { color: theme.colors.card }
                ]}>
                  {game.team1} ({game.odds1.toFixed(2)}x)
                </Text>
              </AnimatedButton>

              <Text style={[styles.vsText, { color: theme.colors.text }]}>VS</Text>

              <AnimatedButton
                style={[
                  styles.teamButton,
                  selectedBets[game.id] === 2 && { backgroundColor: theme.colors.primary }
                ]}
                onPress={() => toggleBet(game.id, 2)}
              >
                <Text style={[
                  styles.teamText,
                  selectedBets[game.id] === 2 && { color: theme.colors.card }
                ]}>
                  {game.team2} ({game.odds2.toFixed(2)}x)
                </Text>
              </AnimatedButton>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.betControls, { backgroundColor: theme.colors.card }]}>
        <View style={styles.betAmountContainer}>
          <AnimatedButton
            style={styles.betButton}
            onPress={() => setBetAmount(prev => Math.max(prev - 100, 100))}
          >
            <Text style={styles.buttonText}>-</Text>
          </AnimatedButton>
          
          <Text style={[styles.betText, { color: theme.colors.text }]}>
            Bet: ${betAmount}
          </Text>
          
          <AnimatedButton
            style={styles.betButton}
            onPress={() => setBetAmount(prev => Math.min(prev + 100, virtualBalance))}
          >
            <Text style={styles.buttonText}>+</Text>
          </AnimatedButton>
        </View>

        <View style={styles.betInfo}>
          <Text style={[styles.totalOddsText, { color: theme.colors.text }]}>
            Total Odds: {totalOdds.toFixed(2)}x
          </Text>
          <Text style={styles.potentialWinText}>
            Potential Win: ${potentialWin.toFixed(2)}
          </Text>
        </View>

        <AnimatedButton
          style={[
            styles.placeBetButton,
            (!Object.keys(selectedBets).length || virtualBalance < betAmount) && 
            styles.placeBetButtonDisabled
          ]}
          onPress={placeBet}
          disabled={!Object.keys(selectedBets).length || virtualBalance < betAmount}
        >
          <Text style={styles.placeBetText}>
            Place Bet
          </Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gamesList: {
    flex: 1,
    padding: 20,
  },
  gameCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sportIconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  teamText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  vsText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  betControls: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  betAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  betButton: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  betText: {
    fontSize: 18,
  },
  betInfo: {
    marginVertical: 10,
  },
  totalOddsText: {
    fontSize: 16,
    textAlign: 'center',
  },
  potentialWinText: {
    color: '#00ff00',
    fontSize: 16,
    textAlign: 'center',
  },
  placeBetButton: {
    backgroundColor: '#00ff00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  placeBetButtonDisabled: {
    backgroundColor: '#666',
  },
  placeBetText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});