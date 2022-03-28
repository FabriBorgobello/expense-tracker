import * as React from 'react';

import { useRoute } from '@react-navigation/native';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';
import invariant from 'tiny-invariant';

import api from '@/api';
import ControlledTextInput from '@/components/Shared/ControlledTextInput';
import ErrorFallback from '@/components/Shared/ErrorFallback';
import { Operation } from '@/types';

function OperationFormScreen() {
  const { params } = useRoute<any>();
  const { operationId } = params;
  const [operation, setOperation] = React.useState<Operation | {}>({});
  const handleError = useErrorHandler();
  const methods = useForm<Operation>();

  React.useEffect(() => {
    if (operationId) {
      const getOperationById = async (id: number) => {
        try {
          const response = await api.get(`/operations/${id}`);
          setOperation(response.data);
          methods.reset(response.data);
        } catch (err) {
          invariant(err instanceof Error, 'err must be an Error');
          handleError(err);
        }
      };
      getOperationById(operationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleError, methods.reset, operationId]);

  methods.watch();

  // const { execute } = useEndpoint(`/operations/${operationId}`, {
  //   method: 'patch',
  //   immediate: false,
  // });

  // const onSubmit: SubmitHandler<Operation> = async (data) => {
  //   // Transform the data to the format expected by the API.
  //   const formattedData = {
  //     ...data,
  //     accountId: Number(data.accountId),
  //     amount: Number(data.amount),
  //   };
  //   await execute(formattedData);
  //   navigation.goBack({ shouldRefresh: true });
  // };
  const onSubmit: SubmitHandler<Operation> = async (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {Object.keys(operation).map((key, index) => {
            console.log(index);
            // Continue debugging this.
            return <ControlledTextInput key={key} name={key} />;
          })}
          <Button title="Submit" onPress={methods.handleSubmit(onSubmit)} />
        </ErrorBoundary>
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: '100%',
  },
  divider: {
    borderBottomColor: '#cecece',
    borderBottomWidth: 1,
    marginBottom: 24,
  },
});

export default OperationFormScreen;
