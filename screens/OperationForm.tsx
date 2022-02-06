import { URL_BASE } from '../constants';
import { useRoute } from '@react-navigation/native';
import useAxios from 'axios-hooks';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Operation } from '@/types';
import ControlledTextInput from '../components/Shared/ControlledTextInput';

function OperationFormScreen() {
  const { params } = useRoute<any>();
  const { action, operationId } = params;
  const [{ data: operation, loading, error }] = useAxios(
    `${URL_BASE}/operations/${operationId}`,
  );
  const methods = useForm<Operation>({
    defaultValues:
      action === 'edit'
        ? operation
        : {
            accountId: null,
            date: null,
            type: null,
            amount: null,
            description: null,
          },
  });
  const [formData, setFormData] = React.useState<Operation | []>([]);
  const onSubmit: SubmitHandler<Operation> = (data) => {
    const formattedData = {
      ...data,
      date: new Date(data.date).toLocaleDateString(),
      accountId: Number(data.accountId),
      amount: Number(data.amount),
    };
    setFormData(formattedData);
  };

  React.useEffect(() => {
    methods.reset(operation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error!</Text>;
  }

  if (action === 'new' || operation) {
    return (
      <View>
        <Text>Operation form</Text>
        <Text>{JSON.stringify(operation)}</Text>
        {/* Map object operation */}
        {Object.keys(operation).map((key) => (
          <ControlledTextInput methods={methods} key={key} name={key} />
        ))}
        <Button title="Submit" onPress={methods.handleSubmit(onSubmit)} />
        {formData && <Text>{JSON.stringify(formData, null, 2)}</Text>}
      </View>
    );
  } else {
    return null;
  }
}

export default OperationFormScreen;
