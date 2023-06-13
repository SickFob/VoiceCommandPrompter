import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataOutput } from '../types';

interface StatusCardProps {
  currentStatus?: DataOutput;
  currentSpeech: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ currentStatus, currentSpeech }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <View style={styles.currentStatusContainer}>
        <Text style={styles.label}>Current status</Text>
        <View style={styles.currentStatusText}>
          <Text>Status: {currentStatus?.command}</Text>
          <Text>Parameters: {currentStatus?.value}</Text>
        </View>
      </View>
      <View style={styles.currentSpeechContainer}>
        <Text style={[styles.label, styles.mb5]}>Current speech</Text>
        <Text style={styles.currentSpeechText}>{currentSpeech}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentStatusContainer: {
    backgroundColor: '#32de84',
    width: '100%',
    height: 100,
    marginBottom: 10
  },
  currentStatusText: {
    height: '100%',
    justifyContent: 'center',
    padding: 10
  },
  currentSpeechContainer: {
    backgroundColor: '#7CB9E8',
    width: '100%',
    height: 100
  },
  currentSpeechText: {
    textAlign: 'center',
    paddingTop: 20
  },
  label: {
    textAlign: 'center', fontWeight: 'bold'
  },
  mb5: {
    marginBottom: 5,
  }
});

export default StatusCard;
