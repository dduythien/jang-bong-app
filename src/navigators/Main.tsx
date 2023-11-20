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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// @refresh reset
const InverterNavigatorStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="InverterType"
        component={InverterType}
        options={{ title: 'My home' }}
      />
      <Stack.Screen
        name="Inverter"
        component={Inverter}
        options={{ title: 'My home' }}
      />
      <Stack.Screen
        name="InputInverter"
        component={InverterRountine}
        options={{ title: 'Nhập liệu' }}
      />
    </Stack.Navigator>
  );
};

const MainNavigatorStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inverter"
        component={InverterNavigatorStack}
        options={{
          tabBarLabel: 'Inverter',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <Icon name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const InitNavigatorStack = () => {
  return (
    // <BottomSheetModalProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Startup} />
      <Stack.Screen name="Inverter" component={MainNavigatorStack} />
    </Stack.Navigator>
    // </BottomSheetModalProvider>
  );
};

// const BottomNavigatorStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Setting" component={Setting} />
//     </Stack.Navigator>
//   );
// };

export default InitNavigatorStack;
