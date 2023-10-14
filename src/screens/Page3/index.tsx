import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { useTheme } from '../../hooks';

const Example = ({navigation}) => {
  const { Layout } = useTheme();

  return (
    <>
      <ScrollView

      >
        <View
          
        >
          <Text>3</Text>
        </View>
      </ScrollView>
      {/* <Fotter /> */}
    </>
  );
};

export default Example;
