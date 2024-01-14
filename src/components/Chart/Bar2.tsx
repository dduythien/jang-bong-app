import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTheme } from '../../hooks';
import { Header } from '@/components';

const ChartLine = (props: MODEL.ILineChartProps) => {
  const { Layout } = useTheme();
  const { labels, datasets, title, data } = props;
  return (
    <View>
      <Text>{title}</Text>
      <ScrollView
        horizontal={true}
        contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
        showsHorizontalScrollIndicator={false} // to hide scroll bar
      >
        <BarChart
          data={data}
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="#2d3991"
          yAxisThickness={0}
          xAxisThickness={0}
          // backgroundColor="#131b54"
          gradientColor={'#FFEEFE'}
          backgroundColor={'#131b54'}
          showGradient
        />
      </ScrollView>
    </View>
  );
};

export default ChartLine;
