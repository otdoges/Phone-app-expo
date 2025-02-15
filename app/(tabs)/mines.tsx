import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const DEFAULT_MINES = 3;

export default function MinesScreen() {
  const [virtualBalance, setVirtualBalance] = useState(10000);
  const [betAmount, setBetAmount] = useState(100);
  const [totalLost, setTotalLost] = useState(0);
  const [board, setBoard] = useState<Array<number>>(Array(TOTAL_CELLS).fill(0));
  const [revealed, setRevealed] = useState<Array<boolean>>(Array(TOTAL_CELLS).fill(false));
  const [gameActive, setGameActive] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [minePositions, setMinePositions] = useState<Array<number>>([]);

  const startGame = () => {
    if (virtualBalance < betAmount) return;

    setVirtualBalance(prev => prev - betAmount);
    setTotalLost(prev => prev + betAmount);
    
    // Generate mine positions
    const mines = new Set<number>();
    while (mines.size < DEFAULT_MINES) {
      mines.add(Math.floor(Math.random() * TOTAL_CELLS));
    }
    setMinePositions(Array.from(mines));
    
    // Reset board
    setBoard(Array(TOTAL_CELLS).fill(0));
    setRevealed(Array(TOTAL_CELLS).fill(false));
    setGameActive(true);
    setMultiplier(1);
  };

  const revealCell = (index: number) => {
    if (!gameActive || revealed[index]) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (minePositions.includes(index)) {
      // Hit a mine
      endGame(false);
    } else {
      // Safe cell
      const newMultiplier = multiplier * 1.2;
      setMultiplier(newMultiplier);
      
      // Check if all safe cells are revealed
      const safeRevealed = newRevealed.filter((r, i) => r && !minePositions.includes(i)).length;
      const totalSafeCells = TOTAL_CELLS - DEFAULT_MINES;
      
      if (safeRevealed === totalSafeCells) {
        endGame(true);
      }
    }
  };

  const cashOut = () => {
    if (!gameActive) return;
    const winAmount = betAmount * multiplier;
    setVirtualBalance(prev => prev + winAmount);
    endGame(true);
  };

  const endGame = (won: boolean) => {
    setGameActive(false);
    // Reveal all mines
    const finalRevealed = Array(TOTAL_CELLS).fill(true);
    setRevealed(finalRevealed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.balanceText}>Virtual Balance: ${virtualBalance}</Text>
        <Text style={styles.lossText}>Total Lost: ${totalLost}</Text>
      </View>

      <View style={styles.gameInfo}>
        <Text style={styles.multiplierText}>Multiplier: {multiplier.toFixed(2)}x</Text>
        {gameActive && (
          <Pressable style={styles.cashoutButton} onPress={cashOut}>
            <Text style={styles.cashoutText}>
              Cash Out (${(betAmount * multiplier).toFixed(2)})
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.board}>
        {board.map((_, index) => (
          <Pressable
            key={index}
            style={[styles.cell, revealed[index] && styles.cellRevealed]}
            onPress={() => revealCell(index)}>
            {revealed[index] && (
              <Ionicons
                name={minePositions.includes(index) ? 'bomb' : 'diamond'}
                size={24}
                color={minePositions.includes(index) ? '#ff4444' : '#00ff00'}
              />
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.betButton}
          onPress={() => setBetAmount(prev => Math.max(prev - 100, 100))}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.betText}>Bet: ${betAmount}</Text>
        <Pressable
          style={styles.betButton}
          onPress={() => setBetAmount(prev => Math.min(prev + 100, virtualBalance))}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      {!gameActive && (
        <Pressable style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </Pressable>
      )}
    </View>
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
  gameInfo: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  multiplierText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  board: {
    width: Math.min(Dimensions.get('window').width - 40, 400),
    height: Math.min(Dimensions.get('window').width - 40, 400),
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
  },
  cell: {
    width: `${100 / GRID_SIZE}%`,
    height: `${100 / GRID_SIZE}%`,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellRevealed: {
    backgroundColor: '#333',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  betText: {
    color: '#fff',
    fontSize: 18,
  },
  startButton: {
    backgroundColor: '#00ff00',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cashoutButton: {
    backgroundColor: '#00ff00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cashoutText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});