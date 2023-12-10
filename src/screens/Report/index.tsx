import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  // LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { useTheme } from '../../hooks';
import { Header, LineChart } from '@/components';
import Icon from 'react-native-vector-icons/AntDesign';
import Filter from './Filter';

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
  ],
};

const Report = ({ navigation }) => {
  const { Layout, Images } = useTheme();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => console.log('zxc')} title="Update count" />
      ),
      headerTitle: () => <Text>zxczxczxczxc</Text>,
    });
  }, [navigation]);

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#131B54' }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <Header title="Báo cáo" customRender={<Filter />} />
        <ScrollView style={styles.reportContainer}>
          <View
            style={{
              paddingVertical: 12,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <LineChart
              title="Biểu đồ sản lượng điện"
              labels={lineData.labels}
              datasets={lineData.datasets}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  reportContainer: {
    // marginHorizontal: 12,
  },
});

export default Report;
