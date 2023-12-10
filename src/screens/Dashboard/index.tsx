import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Fotter } from '@/components';
import { useTheme } from '../../hooks';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Example = () => {
  const { Layout } = useTheme();

  return (
    <BottomSheetModalProvider>
      <Fotter />
    </BottomSheetModalProvider>
  );
};

export default Example;
