import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../../hooks';
import { Header } from '@/components';

const ChartLine = (props: MODEL.ILineChartProps) => {
  const { Layout } = useTheme();
  const { labels, datasets, title } = props;
  return (
    <View>
      <Text>{title}</Text>
      <ScrollView
        horizontal={true}
        contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
        showsHorizontalScrollIndicator={false} // to hide scroll bar
      >
        <LineChart
          verticalLabelRotation={0}
          data={{
            labels,
            datasets,
          }}
          width={
            (labels.length * Dimensions.get('window').width) / labels.length
          } // from react-native
          height={300}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00', //e26a00
            backgroundGradientFrom: '#2d3991', //fb8c00
            backgroundGradientTo: '#131b54', //ffa726
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#131b54',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            // paddingHorizontal: 12,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ChartLine;
