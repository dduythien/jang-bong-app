import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MODEL } from '../../../@types/model';

import { FloatingLabelInput } from 'react-native-floating-label-input';


const InputFloat = (props: any) => {
  const { unit, onChange, value, label, ...rest } = props;
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginBottom: 16 }}>
      <FloatingLabelInput
        {...rest}
        label={label}
        onChangeText={val => onChange(val)}
        value={value}
        rightComponent={<Text>{unit}</Text>}
        // keyboardType='numeric'
        // returnKeyType='done'
        // autoFocus={true}
      />
    </View>
  );
};

export default InputFloat;
