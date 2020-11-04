import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GraphicsSensors from './components/GraphicsSensors';
import {Button} from "react-native-web";

export default function App() {

  return (
    <View style={styles.container}>
      <Text>MEDIDAS DE HUMADAD EN EL SUELO</Text>
        <GraphicsSensors />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFFDB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
