import React from 'react';
import { View, Image, DimensionValue } from 'react-native';
import { useTheme } from '../../hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Report, Page4, Inverter, InverterType } from '../../screens/';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const Fotter = () => {
  return (
    <Tab.Navigator
      initialRouteName="report"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#131b54',
        tabBarInactiveTintColor: '#868FAC',
      }}
    >
      <Tab.Screen
        name="report"
        component={Report}
        options={{
          tabBarLabel: 'Báo cáo',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'areachart' : 'linechart'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Nhập liệu"
        component={InverterType}
        options={{
          tabBarLabel: 'Nhập liệu',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'cloudupload' : 'clouduploado'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Fotter;
