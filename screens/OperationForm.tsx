import * as React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useErrorHandler } from 'react-error-boundary';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, View } from 'react-native';

import ControlledTextInput from '@/components/Shared/ControlledTextInput';
import Spinner from '@/components/Shared/Spinner';
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
  } = useEndpoint(`/operations/${operationId}`);
  useErrorHandler(error);

  const { execute } = useEndpoint(`/operations/${operationId}`, {
    method: 'patch',
    immediate: false,
  });

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

  if (status === 'idle' || status === 'pending') {
    return <Spinner />;
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
