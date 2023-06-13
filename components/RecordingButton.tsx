import React from 'react';
import { Button, View } from 'react-native';

interface RecordingButtonProps {
  isRecording: boolean;
  toggleListening: () => void;
}

const RecordingButton: React.FC<RecordingButtonProps> = ({ isRecording, toggleListening }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Button title={isRecording ? 'Stop recording' : 'Start recording'} onPress={toggleListening} />
    </View>
  );
};

export default RecordingButton;
