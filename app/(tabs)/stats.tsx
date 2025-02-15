import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Why Gambling is Designed to Make You Lose</Text>
        
        <View style={styles.card}>
          <Ionicons name="calculator" size={24} color="#ff4444" />
          <Text style={styles.cardTitle}>House Edge</Text>
          <Text style={styles.cardText}>
            Every gambling game has a built-in mathematical advantage for the house. This means that over time, you are guaranteed to lose money.
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="trending-down" size={24} color="#ff4444" />
          <Text style={styles.cardTitle}>Law of Large Numbers</Text>
          <Text style={styles.cardText}>
            The more you play, the closer your results will get to the mathematical expectation - which is always negative due to the house edge.
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="brain" size={24} color="#ff4444" />
          <Text style={styles.cardTitle}>Psychological Tricks</Text>
          <Text style={styles.cardText}>
            Casinos use various psychological tactics to keep you playing:
            • Near misses
            • Random rewards
            • Loss disguised as wins
            • Social proof
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Getting Help</Text>
        
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>National Problem Gambling Helpline</Text>
          <Text style={styles.helpText}>1-800-522-4700</Text>
          <Text style={styles.helpDescription}>
            Available 24/7, 365 days a year. Confidential, free support for anyone struggling with gambling.
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="checkmark-circle" size={24} color="#00ff00" />
          <Text style={styles.cardTitle}>Steps to Stop Gambling</Text>
          <Text style={styles.cardText}>
            1. Acknowledge the problem
            2. Seek professional help
            3. Self-exclude from gambling sites
            4. Find alternative activities
            5. Join support groups
            6. Be honest with loved ones
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Real Statistics</Text>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>96%</Text>
          <Text style={styles.statDescription}>
            of problem gamblers started before age 14
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>$500</Text>
          <Text style={styles.statDescription}>
            Average loss per month for problem gamblers
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1 in 5</Text>
          <Text style={styles.statDescription}>
            Problem gamblers attempt suicide
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardText: {
    color: '#ddd',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  helpCard: {
    backgroundColor: '#006600',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  helpTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  helpText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  helpDescription: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  statNumber: {
    color: '#ff4444',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statDescription: {
    color: '#ddd',
    fontSize: 16,
    textAlign: 'center',
  },
});