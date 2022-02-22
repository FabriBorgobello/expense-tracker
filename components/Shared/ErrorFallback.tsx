import * as React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  error: Error;
  resetError: Function;
}

const ErrorFallback = ({ error, resetError }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something happened!</Text>
      <Text style={styles.subtitle}>{error.toString()}</Text>
      <TouchableOpacity style={styles.button} onPress={() => resetError()}>
        <Text style={styles.buttonText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorFallback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 16,
  },
  button: {
    width: '50%',
    backgroundColor: '#1d3557',
    borderRadius: 8,
    alignItems: 'center',
    padding: 8,
  },
  buttonText: { color: 'white' },
});
