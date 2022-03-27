import React from 'react';

import { ActivityIndicator, ColorValue, StyleSheet, View } from 'react-native';

interface Props {
  color?: ColorValue | undefined;
  size?: number | 'small' | 'large' | undefined;
}

const Spinner = ({ color = '#1d3557', size = 'large' }: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
