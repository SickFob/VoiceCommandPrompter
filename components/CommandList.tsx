import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { DataOutput } from '../types';

interface CommandListProps { dataOutputs: DataOutput[] }

const CommandList: React.FC<CommandListProps> = ({ dataOutputs }) => {
  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView>
        {dataOutputs.map((item, key) => (
          <View key={key} style={styles.commandContainer}>
            <Text>Command: {item.command}</Text>
            <Text>Value: {item.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    width: '100%',
    height: 250,
    marginBottom: 10
  },
  commandContainer: {
    backgroundColor: '#D0D0D0',
    marginBottom: 10,
    padding: 10
  }
});

export default CommandList;
