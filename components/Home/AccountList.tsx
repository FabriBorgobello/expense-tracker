import { Account } from '../../types';
import useAxios from 'axios-hooks';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text } from 'react-native';
import AccountCard from './AccountCard';
import { URL_BASE } from '../../constants';

const AccountList = () => {
  const [{ data: accounts, loading, error }] = useAxios(`${URL_BASE}/accounts`);

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
