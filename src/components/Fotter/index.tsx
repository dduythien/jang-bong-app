import React from 'react';
import { View, Image, DimensionValue } from 'react-native';
import { useTheme } from '../../hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Page3, Page4 } from '../../screens/';

const Tab = createBottomTabNavigator();

const Fotter = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Page3" component={Page3} />
      <Tab.Screen name="Page4" component={Page4} />
    </Tab.Navigator>
  );
};

export default Fotter;
