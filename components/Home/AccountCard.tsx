import * as React from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import { ACCOUNT_IMAGES } from '@/assets/images';
import type { Account } from '@/types';

interface Props {
  account: Account;
}

function AccountCard({ account }: Props) {
  const { name, color, backgroundColor, id, currency, balance, img } = account;
  const navigation = useNavigation<any>();

  return (
    <TouchableNativeFeedback
      onPress={() => navigation.push('Account', { accountId: id })}>
      <View
        style={{
          ...styles.container,
          backgroundColor,
        }}>
        <Image style={styles.image} source={ACCOUNT_IMAGES[img]} />
        <Text style={{ ...styles.name, color }}>{name}</Text>
        <View>
          <Text style={{ ...styles.currency, color }}>{currency}</Text>
          <Text style={{ ...styles.balance, color }}>{balance}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    marginBottom: 24,
  },

  image: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 16,
  },

  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  currency: {
    color: 'white',
    textAlign: 'right',
  },
  balance: {
    color: 'white',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AccountCard;
