import * as React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { ACCOUNT_IMAGES } from '@/assets/images';
import { Account } from '@/types';

const AccountHeader = ({ account }: { account: Account }) => {
  const { name, color, backgroundColor, img } = account;

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <Image style={styles.image} source={ACCOUNT_IMAGES[img]} />
      <Text style={{ ...styles.title, color: color }}>{name}</Text>
    </View>
  );
};

export default AccountHeader;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 80 / 2,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
