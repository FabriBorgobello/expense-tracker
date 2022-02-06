import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import useAxios from 'axios-hooks';

const HomeBalance = () => {
  const [{ data, loading, error }] = useAxios(
    'http://localhost:3001/total_balance',
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    throw error;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.balanceText}>Balance</Text>
      <Text style={styles.balanceAmount}>
        {data.currency} {data.balance}
      </Text>
    </View>
  );
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
