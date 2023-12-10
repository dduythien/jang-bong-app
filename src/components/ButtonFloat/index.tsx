import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Button = props => {
  const { title, onPress, color = '#1D1A39', ...rest } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ backgroundColor: color }, styles.container]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 16,
    paddingVertical: 16,
    flex: 1,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Button;
