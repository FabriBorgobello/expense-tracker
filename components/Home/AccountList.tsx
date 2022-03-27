import * as React from 'react';

import { ScrollView, StyleSheet, Text } from 'react-native';

import AccountCard from '@/components/Home/AccountCard';
import useEndpoint from '@/hooks/useEndpoint';
import { Account } from '@/types';

const AccountList = () => {
  const { data: accounts, error, status } = useEndpoint('/accounts');

  if (status === 'pending') {
    return <Text>Loading...</Text>;
  }
  if (status === 'error') {
    throw error;
  }
  if (status === 'success' && accounts?.length === 0) {
    return <Text>No operations</Text>;
  }

  return (
    <>
      <Text style={styles.title}>Accounts</Text>
      <ScrollView>
        {accounts?.map((account: Account) => (
          <AccountCard key={account.id} account={account} />
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
