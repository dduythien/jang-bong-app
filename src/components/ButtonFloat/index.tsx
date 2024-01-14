import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface IButtonProps {
  title: string;
  onPress?: (val?: any) => void;
  color?: string;
  type?: 'primary' | 'outline';
}

const Button = (props: IButtonProps) => {
  const {
    title,
    onPress,
    color = '#1D1A39',
    type = 'primary',
    ...rest
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        type === 'primary' ? styles.primary : styles.outline,
      ]}
      {...rest}
    >
      <Text style={[styles.title, type !== 'primary' && styles.outlineText]}>
        {title}
      </Text>
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
  outlineText: {
    color: '#1D1A39',
  },
  primary: {
    backgroundColor: '#1D1A39',
  },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1D1A39',
  },
});

export default Button;
