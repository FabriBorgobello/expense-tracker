import * as React from 'react';

import { useIsFocused, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text } from 'react-native';

import OperationCard from '@/components/Shared/OperationCard';
import useEndpoint from '@/hooks/useEndpoint';
const AccountOperations = () => {
  const isFocused = useIsFocused();
  const { params } = useRoute<any>();
  const {
    data: operations,
    error,
    status,
    execute,
  } = useEndpoint('/operations', {
    params: { accountId: params.accountId },
    immediate: false,
  });

  React.useEffect(() => {
    if (isFocused) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  if (status === 'pending') {
    return <Text>Loading...</Text>;
  }
  if (status === 'error') {
    throw error;
  }
  if (status === 'success' && operations?.length === 0) {
    return <Text>No operations</Text>;
  }

  return (
    <>
      <Text>Account operations</Text>
      <ScrollView style={styles.cardContainer}>
        {operations?.map((operation: any) => (
          <OperationCard
            operation={operation}
            key={operation.id}
            refetch={execute}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default AccountOperations;

const styles = StyleSheet.create({
  cardContainer: {},
});
