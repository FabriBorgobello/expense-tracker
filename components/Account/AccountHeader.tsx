import { Image, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Account } from '@/types';
import { ACCOUNT_IMAGES } from '../../assets/images';

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
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 80 / 2,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
