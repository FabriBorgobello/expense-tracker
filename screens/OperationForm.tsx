import * as React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Text, View } from 'react-native';

import ControlledTextInput from '@/components/Shared/ControlledTextInput';
import useEndpoint from '@/hooks/useEndpoint';
import { Operation } from '@/types';

function OperationFormScreen() {
  const { params } = useRoute<any>();
  const navigation = useNavigation<any>();
  const { action, operationId } = params;
  const {
    data: operation,
    error,
    status,
  } = useEndpoint('get', `/operations/${operationId}`);
  const { execute } = useEndpoint(
    'patch',
    `/operations/${operationId}`,
    undefined,
    false,
  );

  const methods = useForm<Operation>({
    defaultValues: action === 'edit' && operation,
  });

  const onSubmit: SubmitHandler<Operation> = async (data) => {
    // Transform the data to the format expected by the API.
    const formattedData = {
      ...data,
      accountId: Number(data.accountId),
      amount: Number(data.amount),
    };
    await execute(formattedData);
    navigation.goBack({ shouldRefresh: true });
  };

  /* Set default values once they are loaded */
  React.useEffect(() => {
    methods.reset(operation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation]);

  if (status === 'pending') {
    return <Text>Loading...</Text>;
  }
  if (status === 'error') {
    throw error;
  }

  if (action === 'new' || operation) {
    return (
      <View>
        {Object.keys(operation).map((key) => (
          <ControlledTextInput methods={methods} key={key} name={key} />
        ))}
        <Button title="Submit" onPress={methods.handleSubmit(onSubmit)} />
      </View>
    );
  }
  return null;
}

export default OperationFormScreen;
