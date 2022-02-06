import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HomeHeader = () => {
  return (
    <View style={styles.greetingContainer}>
      <Text style={styles.greeting}>Welcome,</Text>
      <Text style={styles.name}>Fabricio!</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  greetingContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 26,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
