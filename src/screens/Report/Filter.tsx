import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import FilterAdv from './FilterAdv';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const REPORT_TYPE = {
  LINE: 1,
  CHART: 2,
};

interface FilterProps {
  filterReport: MODEL.IEnergyAuditReportParams;
  setFilterReport: (data: any) => void;
}

const Filter = props => {
  const [reportType, setReportType] = useState(REPORT_TYPE.LINE);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onOpenAdvFilter = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <View style={styles.filterContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              reportType === REPORT_TYPE.LINE ? styles.checked : null,
            ]}
            onPress={() => setReportType(REPORT_TYPE.LINE)}
          >
            {reportType === REPORT_TYPE.LINE && (
              <Icon name="check" color={'#131B54'} size={18} />
            )}
            <Text style={styles.text}>Dạng đường</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              reportType === REPORT_TYPE.CHART ? styles.checked : null,
            ]}
            onPress={() => setReportType(REPORT_TYPE.CHART)}
          >
            {reportType === REPORT_TYPE.CHART && (
              <Icon name="check" color={'#131B54'} size={18} />
            )}
            <Text style={styles.text}>Dạng cột</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onOpenAdvFilter}>
          <Icon name="setting" color={'white'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: 'grey' }}>
        <FilterAdv bottomSheetModalRef={bottomSheetModalRef} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#bdb9c9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 24,
    width: 140,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2a1a59',
  },
  text: {
    color: '#000',
  },
});

export default Filter;
