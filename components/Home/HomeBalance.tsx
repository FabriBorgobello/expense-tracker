import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import useEndpoint from '@/hooks/useEndpoint';

const HomeBalance = () => {
  const { data, error, status } = useEndpoint('/total_balance');

  if (status === 'idle' || status === 'pending') {
    return <Text>Loading...</Text>;
  }
  if (status === 'error') {
    throw error;
  }
  if (status === 'success') {
    return (
      <View style={styles.card}>
        <Text style={styles.balanceText}>Balance</Text>
        <Text style={styles.balanceAmount}>
          {data.currency} {data.balance}
        </Text>
      </View>
    );
  }
  return null;
};

export default HomeBalance;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1d3557',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 32,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  balanceAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
