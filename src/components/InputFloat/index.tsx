import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MODEL } from '../../../@types/model';

import { FloatingLabelInput } from 'react-native-floating-label-input';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    width: '100%',
    borderRadius: 8,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    backgroundColor: 'white',
  },

  divider: {
    borderBottomColor: '#BBC6D9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const InputFloat = (props: any) => {
  const { unit, onChange, value, label } = props;
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginBottom: 16 }}>
      <FloatingLabelInput
        // {...props}
        label={label}
        onChangeText={val => onChange(val)}
        value={value}
        rightComponent={<Text>{unit}</Text>}
        keyboardType='numeric'
        returnKeyType='done' 
        autoFocus={true}
      />
    </View>
  );
};

export default InputFloat;
