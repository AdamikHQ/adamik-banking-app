import React from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';

export interface InputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

const Input: React.FC<InputProps> = ({value, onChangeText, ...props}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Input;
