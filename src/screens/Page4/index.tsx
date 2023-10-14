import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { useTheme } from '../../hooks';

const Example = () => {
  const { Layout } = useTheme();

  return (
    <>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[
          Layout.fullSize,
          Layout.fill,
          Layout.colCenter,
          Layout.scrollSpaceBetween,
        ]}
      >
        <View
          style={[
            Layout.fill,
            Layout.relative,
            Layout.fullWidth,
            Layout.justifyContentCenter,
            Layout.alignItemsCenter,
          ]}
        >
          <Text>4</Text>
        </View>
      </ScrollView>
      {/* <Fotter /> */}
    </>
  );
};

export default Example;
