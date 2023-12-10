import React from 'react';
import {
  Setting,
  Inverter,
  Startup,
  InverterRountine,
  InverterType,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import rootStackConfig from './stack';
import { StackComponent, StackProps } from 'types/navigation';

const Stack = createStackNavigator();

const NavigatorStack = () => {
  return (
    <Stack.Navigator>
      {Object.keys(rootStackConfig).map((path: string) => (
        <Stack.Screen
          key={path}
          name={path}
          options={{
            ...rootStackConfig[path as keyof StackProps]?.options,
            // headerShown: false,
            // headerTransparent: true,
            headerTintColor: '#fff',
          }} // gestureEnabled: false, swip left
          component={rootStackConfig[path as keyof StackProps].component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default NavigatorStack;
