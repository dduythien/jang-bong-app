import React from 'react';
import {
  Setting,
  Inverter,
  Startup,
  InverterRountine,
  InverterType,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import rootStackConfig from './stack';

const Stack = createStackNavigator();

const NavigatorStack = () => {
  return (
    <Stack.Navigator>
      {Object.keys(rootStackConfig).map(path => (
        <Stack.Screen
          key={path}
          name={path}
          options={{ ...rootStackConfig[path]?.options, headerShown: false }} // gestureEnabled: false, swip left
          component={rootStackConfig[path].component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default NavigatorStack;
