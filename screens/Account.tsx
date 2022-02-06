import AccountBalance from '../components/Account/AccountBalance';
import AccountHeader from '../components/Account/AccountHeader';
import useAxios from 'axios-hooks';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

function AccountScreen({ route, navigation }: any) {
  const { accountId } = route.params;
  const [{ data: account, loading, error }] = useAxios(
    `http://localhost:3001/accounts/${accountId}`,
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
      <View>
        <Text>{account.name}</Text>
        <Text>Account ID: {accountId}</Text>
        <Button
          title="Go to Account... again"
          onPress={() => navigation.push('Account', { accountId })}
        />
      </View>
    </>
  );
}

export default AccountScreen;
