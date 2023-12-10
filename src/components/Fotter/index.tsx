import React from 'react';
import { View, Image, DimensionValue } from 'react-native';
import { useTheme } from '../../hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Report, Page4 } from '../../screens/';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const Fotter = () => {
  return (
    <Tab.Navigator
      initialRouteName="report"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="report"
        component={Report}
        options={{
          tabBarLabel: 'bao cao',
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons
            //   name="file-document"
            //   color={color}
            //   size={size}
            // />
            <Icon name="areachart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Page4" component={Page4} />
    </Tab.Navigator>
  );
};

export default Fotter;
