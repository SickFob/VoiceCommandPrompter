import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface VoiceModuleStatusCardProps { isListening: boolean }

const VoiceModuleStatusCard: React.FC<VoiceModuleStatusCardProps> = ({ isListening }) => {
  return (
    <View style={[styles.container, { backgroundColor: isListening ? '#32de84' : 'black' }]}>
      <Text style={styles.alignCenter}>{isListening ? 'Listening' : 'Waiting for command'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    marginBottom: 25,
    justifyContent: 'center'

  },
  alignCenter: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default VoiceModuleStatusCard;
