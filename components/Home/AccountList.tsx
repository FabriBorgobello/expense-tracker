import * as React from 'react';

import { useErrorHandler } from 'react-error-boundary';
import { ScrollView, StyleSheet, Text } from 'react-native';

import AccountCard from '@/components/Home/AccountCard';
import Spinner from '@/components/Shared/Spinner';
import useEndpoint from '@/hooks/useEndpoint';
import { Account } from '@/types';

const AccountList = () => {
  const { data: accounts, error, status } = useEndpoint('/accounts');
  useErrorHandler(error);

  if (status === 'pending') {
    return <Spinner />;
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
