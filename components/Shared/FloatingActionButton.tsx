import React from 'react';

import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

interface Props {
  handlePress: () => void;
  icon: string;
}

const FloatingActionButton = ({ handlePress, icon }: Props) => {
  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.text}>{icon}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1d3557',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  text: {
    fontSize: 32,
    color: '#fff',
  },
});
