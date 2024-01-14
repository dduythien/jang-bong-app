import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useTheme } from '../hooks';
import InitNavigatorStack from './Main';
import NavigatorStack from './NavigatorStack';
import { useFlipper } from '@react-navigation/devtools';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <NavigatorStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
