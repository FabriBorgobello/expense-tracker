import { StyleSheet, Text, TextInput } from 'react-native';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { capitalizeFirstLetter } from '../../utils';

interface Props {
  methods: UseFormReturn<any>;
  name: string;
  placeholder?: string;
  showId?: boolean;
  type?: 'text' | 'number' | 'date';
}

const ControlledTextInput = ({
  methods,
  name,
  placeholder,
  showId = false,
}: Props) => {
  if (!showId && name === 'id') {
    return null;
  }

  return (
    <>
      <Controller
        control={methods.control}
        rules={{ required: 'This is required.' }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={`${value}`}
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
