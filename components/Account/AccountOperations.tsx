import { ScrollView, StyleSheet, Text } from 'react-native';
import * as React from 'react';
import useAxios from 'axios-hooks';
import { useRoute } from '@react-navigation/native';
import OperationCard from '../Shared/OperationCard';
import { URL_BASE } from '../../constants';

const AccountOperations = () => {
  const { params } = useRoute<any>();
  const [{ data: operations, loading, error }, refetch] = useAxios(
    `${URL_BASE}/operations?accountId=${params.accountId}`,
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error!</Text>;
  }

  const operationList = operations.map((operation: any) => (
    <OperationCard operation={operation} key={operation.id} refetch={refetch} />
  ));

  const emptyState = <Text>No operations</Text>;

  return (
    <>
      <Text>Account operations</Text>
      <ScrollView style={styles.cardContainer}>
        {operations.length > 0 ? operationList : emptyState}
      </ScrollView>
    </>
  );
};

export default AccountOperations;

const styles = StyleSheet.create({
  cardContainer: {},
});
