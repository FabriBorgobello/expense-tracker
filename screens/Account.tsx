import AccountBalance from '../components/Account/AccountBalance';
import AccountHeader from '../components/Account/AccountHeader';
import useAxios from 'axios-hooks';
import * as React from 'react';
import { Text } from 'react-native';
import AccountOperations from '../components/Account/AccountOperations';
import { URL_BASE } from '../constants';

function AccountScreen({ route }: any) {
  const { accountId } = route.params;
  const [{ data: account, loading, error }] = useAxios(
    `${URL_BASE}/accounts/${accountId}`,
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error!</Text>;
  }

  return (
    <>
      <AccountHeader account={account} />
      <AccountBalance />
      <AccountOperations />
    </>
  );
}

export default AccountScreen;
