import { Account } from '../../types';
import useAxios from 'axios-hooks';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text } from 'react-native';
import AccountCard from './AccountCard';

const AccountList = () => {
  const [{ data: accounts, loading, error }, refetch] = useAxios(
    'http://localhost:3001/accounts',
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <ScrollView>{JSON.stringify(error, null, 2)}</ScrollView>;
  }

  return (
    <>
      <Text style={styles.title}>Accounts</Text>
      <ScrollView>
        {accounts.map((account: Account, index: number) => (
          <AccountCard
            key={account.id}
            account={account}
            isLast={index === accounts.length}
          />
        ))}
      </ScrollView>
      <Button title="Refresh" onPress={() => refetch()} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default AccountList;
