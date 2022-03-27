import * as React from 'react';

import { Text } from 'react-native';

import AccountBalance from '@/components/Account/AccountBalance';
import AccountHeader from '@/components/Account/AccountHeader';
import AccountOperations from '@/components/Account/AccountOperations';
import useEndpoint from '@/hooks/useEndpoint';

function AccountScreen({ route }: any) {
  const { accountId } = route.params;
  const {
    data: account,
    error,
    status,
  } = useEndpoint(`/accounts/${accountId}`);

  if (status === 'pending') {
    return <Text>Loading...</Text>;
  }
  if (status === 'error') {
    throw error;
  }
  if (status === 'success') {
    return (
      <>
        <AccountHeader account={account} />
        <AccountBalance />
        <AccountOperations />
      </>
    );
  }
  return null;
}

export default AccountScreen;
