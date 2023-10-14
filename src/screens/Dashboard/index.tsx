import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {Fotter} from '@/components'
import { useTheme } from '../../hooks';

const Example = () => {
  const { Layout } = useTheme();

  return (
    <>
      
      <Fotter />
    </>
  );
};

export default Example;
