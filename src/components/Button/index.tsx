import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../hooks';

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
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 16,
    padding: 4,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
  },
});

export default Button;
