import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput } from 'react-native';

import { capitalizeFirstLetter } from '@/utils';

interface Props {
  name: string;
  placeholder?: string;
  showId?: boolean;
  type?: 'text' | 'number' | 'date';
}

const ControlledTextInput = ({ name, placeholder, showId = false }: Props) => {
  const methods = useFormContext();
  // Do not show the ID field
  if (!showId && name === 'id') {
    return null;
  }

  return (
    <>
      <Controller
        control={methods.control}
        rules={{ required: 'This is required.' }}
        render={({ field }) => {
          console.log(field);
          return (
            <TextInput
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={`${field.value}`}
              placeholder={placeholder || capitalizeFirstLetter(name)}
            />
          );
        }}
        name={name}
      />
      {methods.formState.errors[name] && (
        <Text style={styles.errorText}>
          {methods.formState.errors[name].message}
        </Text>
      )}
    </>
  );
};

export default ControlledTextInput;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
