import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import StatusCard from './components/StatusCard';
import CommandList from './components/CommandList';
import RecordingButton from './components/RecordingButton';
import { convertLetterToNumber } from './helpers';

import { Command, DataOutput } from './types';
import VoiceModuleStatusCard from './components/VoiceModuleStatusCard';

// Language Configuration
const languageConfig = {
  'en-US': {
    langCode: 'en-US',
    commands: {
      code: ['code'],
      count: ['count'],
      reset: ['reset'],
      back: ['back']
    },
    parsingRules: {
      ignoreNonNumeric: true
    }
  },
  'es-ES': {
    langCode: 'es-ES',
    commands: {
      code: ['código'],
      count: ['contar'],
      reset: ['reiniciar'],
      back: ['atrás']
    },
    parsingRules: {
      ignoreNonNumeric: true
    }
  },
  'it-IT': {
    langCode: 'it-IT',
    commands: {
      code: ['codice'],
      count: ['conta'],
      reset: ['reset'],
      back: ['indietro']
    },
    parsingRules: {
      ignoreNonNumeric: true
    }
  }
};

const SpeechToCommandScreen: React.FC = () => {
  const languageCode = 'en-US';

  const [isListening, setIsListening] = useState(false); // needed to change current state of voice module
  const [isRecording, setIsRecording] = useState(false); // needed to change recording button state
  const [dataOutputs, setDataOutputs] = useState<DataOutput[]>([]); // store commands and parameters
  const [currentStatus, setCurrentStatus] = useState<DataOutput | undefined>(undefined); // store current status
  const [currentSpeech, setCurrentSpeech] = useState(''); // store speech

  useEffect(() => {
    // Initialize voice recognition
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsRecording(true);
  };

  const onSpeechEnd = () => {
    setIsRecording(false);
    setIsListening(false);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      setCurrentSpeech(e.value[0]);
      if (checkIfValidCommand(e.value[0]).length > 0) {
        setIsListening(true);
      }
    }
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      setCurrentSpeech(e.value[0]);
      processSpeechResults(e.value[0]);
    }
  };

  const processSpeechResults = (speechResults: string) => {
    const words: string[] = speechResults.toLowerCase().split(' ');
    const command: string = words[0];
    const values: string[] = words.slice(1);
    const keywordList = checkIfValidCommand(words[0]);
    for (const keyword of keywordList) {
      if (command === keyword) {
        if (command === Command.Reset) {
          setDataOutputs([]);
          setCurrentStatus({ command: Command.Reset, value: '' });
          return;
        } else if (command === Command.Back) {
          setDataOutputs((dataOutputs) => dataOutputs.slice(0, -1));
          setCurrentStatus({ command: Command.Back, value: '' });
          return;
        } else {
          const value = parseCommandValues(values);
          if (value.length > 0) {
            const data: DataOutput = { command: command === Command.Code ? Command.Code : Command.Count, value: parseCommandValues(values) };
            setDataOutputs((dataOutputs) => [...dataOutputs, data]);
            setCurrentStatus(data);
          }
          return;
        }
      }
    }
  };

  const checkIfValidCommand = (command: string) => {
    const { commands } = languageConfig[languageCode];
    for (const key in commands) {
      const keywordList = (commands as { [key: string]: string[] })[key];
      if (keywordList.includes(command)) {
        return keywordList;
      }
    }
    return [];
  }

  const parseCommandValues = (arr: string[]) => {
    let validValues: string[] = [];
    for (const item of arr) {
      const parsedNumber = parseInt(item);
      if (!isNaN(parsedNumber) && (parsedNumber > 0 && parsedNumber < 10)) {
        validValues.push(item);
      } else {
        // convert numbers if they are recorded as string (i.e. 'one', 'two', etc...) 
        const convertedNumber: number | null = convertLetterToNumber(item, languageConfig[languageCode].langCode);
        if (convertedNumber) {
          validValues.push(convertedNumber.toString());
        }
      }
    }
    return validValues.join('');
  };

  const toggleListening = async () => {
    try {
      if (isRecording) {
        await Voice.stop();
        setIsRecording(false);
        setIsListening(false);
      } else {
        await Voice.start(languageConfig[languageCode].langCode);
        setIsRecording(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clear = () => {
    setCurrentStatus(undefined);
    setIsListening(false);
    setCurrentSpeech('');
    setDataOutputs([]);
  };

  return (
    <View style={{ height: '100%' }}>
      <View style={{ padding: 10 }}>
        <VoiceModuleStatusCard isListening={isListening} />
        <StatusCard currentStatus={currentStatus} currentSpeech={currentSpeech} />
        <CommandList dataOutputs={dataOutputs} />
        <RecordingButton isRecording={isRecording} toggleListening={toggleListening} />
        <Button title="Clear" onPress={clear} />
      </View>
    </View>
  );
};

export default SpeechToCommandScreen;