import React, { useEffect, useState } from 'react';
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
import _get from 'lodash/get';
import { useTheme } from '../../hooks';
import { Header, LineChart, BarChart } from '@/components';
import Icon from 'react-native-vector-icons/AntDesign';
import Filter from './Filter';
import { useMount, useRequest } from 'ahooks';
import { getEnergyAuditReportService } from '@/services/report';
import dayjs from 'dayjs';

// const lineData = {
//   labels: [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June2',
//     'June3',
//     'June4',
//     'June5',
//     'June6',
//   ],
//   datasets: [
//     {
//       data: [
//         Math.random() * 100,
//         Math.random() * 100,
//         Math.random() * 100,
//         Math.random() * 100,
//         Math.random() * 100,
//         Math.random() * 100,
//         Math.random() * 100,
//         Math.random() * 100,
//         Math.random() * 100,
//         Math.random() * 100,
//       ],
//     },
//   ],
// };

const initialFilter = {
  period: 0,
  reportType: 'day',
  month: '12',
  year: '2023',
};

interface IReportData {
  labels: string[];
  datasets: MODEL.IChartDataSetProps[];
}

const Report = ({ navigation }) => {
  const { Layout, Images } = useTheme();
  const [filterReport, setFilterReport] = useState({
    period: 0,
    reportType: 'day',
    month: '12',
    year: '2023',
  });

  const [reportData, setReportData] = useState<IReportData>({
    labels: [],
    datasets: [{ data: [] }],
  });

  const { run } = useRequest(
    (params: MODEL.IEnergyAuditReportParams) =>
      getEnergyAuditReportService(params),
    {
      onSuccess(data, params) {
        const { reportType } = params[0];
        console.log(params);
        const report = _get(data, 'data', []);
        const labels = report.map(item =>
          dayjs(item.colX).format(
            reportType === 'day' ? 'DD/MM' : 'DD/MM/YYYY',
          ),
        );
        const datasets = report.map(item => item.dataX);
        setReportData({
          labels,
          datasets: [
            {
              data: datasets,
            },
          ],
        });
      },
      manual: true,
    },
  );

  useMount(() => {
    const current = dayjs();
    const params = {
      ...initialFilter,
      year: String(current.year()),
      month: String(current.month() + 1),
    };
    setFilterReport(params);
    run(params);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#131B54' }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <Header
          title="Báo cáo"
          customRender={
            <Filter
              filterReport={filterReport}
              setFilterReport={setFilterReport}
            />
          }
        />
        <ScrollView style={styles.reportContainer}>
          <View
            style={{
              paddingVertical: 12,
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 12,
            }}
          >
            {reportData?.labels.length > 0 && (
              <BarChart
                title="Biểu đồ sản lượng điện"
                labels={reportData.labels}
                datasets={reportData.datasets}
              />
            )}
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
