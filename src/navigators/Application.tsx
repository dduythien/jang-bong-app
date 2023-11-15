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

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <SafeAreaView style={{ backgroundColor: '#d31145', flex: 0 }} />
        <NavigatorStack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
