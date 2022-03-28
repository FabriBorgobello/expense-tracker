import * as React from 'react';

import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { StyleSheet, View } from 'react-native';

import AccountBalance from '@/components/Account/AccountBalance';
import AccountHeader from '@/components/Account/AccountHeader';
import AccountOperations from '@/components/Account/AccountOperations';
import ErrorFallback from '@/components/Shared/ErrorFallback';
import Spinner from '@/components/Shared/Spinner';
import { OperationsProvider } from '@/contexts/OperationsContext';
import useEndpoint from '@/hooks/useEndpoint';

function AccountScreen({ route }: any) {
  const { accountId } = route.params;
  const {
    data: account,
    error,
    status,
  } = useEndpoint(`/accounts/${accountId}`);
  useErrorHandler(error);

  if (status === 'idle' || status === 'pending') {
    return <Spinner />;
  }

  if (status === 'success') {
    return (
      <OperationsProvider>
        <View style={styles.container}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AccountHeader account={account} />
            <AccountBalance />
            <AccountOperations />
          </ErrorBoundary>
        </View>
      </OperationsProvider>
    );
  }
  return null;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: '100%',
  },
});

export default AccountScreen;
