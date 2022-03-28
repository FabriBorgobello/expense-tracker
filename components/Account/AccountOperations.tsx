import * as React from 'react';

import { useErrorHandler } from 'react-error-boundary';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { useOperations } from '@/contexts/OperationsContext';

import OperationCard from '../Shared/OperationCard';
import Spinner from '../Shared/Spinner';

const AccountOperations = () => {
  const { operations, error, status } = useOperations();
  useErrorHandler(error);

  if (status === 'idle' || status === 'pending') {
    return <Spinner />;
  }

  if (status === 'success' && operations.length === 0) {
    return <Text>No elements</Text>;
  }

  if (status === 'success' && operations.length > 0) {
    return (
      <>
        <Text>Account operations</Text>
        <ScrollView style={styles.cardContainer}>
          {operations?.map((operation: any) => (
            <OperationCard operation={operation} key={operation.id} />
          ))}
        </ScrollView>
      </>
    );
  }
  return null;
};

export default AccountOperations;

const styles = StyleSheet.create({
  cardContainer: {},
});
