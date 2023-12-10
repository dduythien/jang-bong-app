import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, { useMemo, RefObject, useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from '../../hooks';

import { ButtonGroup, ButtonFloat } from '@/components';
export type FilterAdvProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
};

const listButton = [
  {
    label: 'Giai đoạn 1',
    value: 1,
  },
  {
    label: 'Giai đoạn 2',
    value: 2,
  },
  {
    label: 'Tổng',
    value: 3,
  },
];

const listReportType = [
  {
    label: 'Ngày',
    value: 'day',
  },
  {
    label: 'Tháng',
    value: 'month',
  },
  {
    label: 'Quý',
    value: 'quarter',
  },
  {
    label: 'Năm',
    value: 'year',
  },
];

const listMonth = [
  {
    label: 'Tháng 1',
    value: '1',
  },
  {
    label: 'Tháng 2',
    value: '2',
  },
  {
    label: 'Tháng 3',
    value: '3',
  },
  {
    label: 'Tháng 4',
    value: '4',
  },
  {
    label: 'Tháng 5',
    value: '5',
  },
  {
    label: 'Tháng 6',
    value: '6',
  },
  {
    label: 'Tháng 7',
    value: '7',
  },
  {
    label: 'Tháng 8',
    value: '8',
  },
  {
    label: 'Tháng 9',
    value: '9',
  },
  {
    label: 'Tháng 10',
    value: '10',
  },
  {
    label: 'Tháng 11',
    value: '11',
  },
  {
    label: 'Tháng 12',
    value: '12',
  },
];

const listYear = [
  {
    label: '2020',
    value: '2020',
  },
  {
    label: '2021',
    value: '2021',
  },
  {
    label: '2022',
    value: '2022',
  },
  {
    label: '2023',
    value: '2023',
  },
  {
    label: '2024',
    value: '2024',
  },
  {
    label: '2025',
    value: '2025',
  },
  {
    label: '2026',
    value: '2026',
  },
];

const FilterAdv = (props: KeyBoardProps) => {
  const { onDismiss, bottomSheetModalRef } = props;
  const snapPoints = useMemo(() => ['50%'], []);
  const { Layout, Gutters, Images, Fonts } = useTheme();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        enableTouchThrough
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const [period, setPeriod] = useState<number | string>(1);
  const [reportType, setReportType] = useState<number | string>('day');
  const [month, setMonth] = useState<number | string>('1');
  const [year, setYear] = useState<number | string>('2023');

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      enableOverDrag={false}
      enableDismissOnClose={true}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.container}>
        <View style={Gutters.tinyBMargin}>
          <ButtonGroup
            label="Chọn loại"
            listButton={listButton}
            value={period}
            setValue={(val: string | number) => setPeriod(val)}
          />
        </View>

        <View style={Gutters.tinyBMargin}>
          <ButtonGroup
            label="Loại báo cáo"
            listButton={listReportType}
            value={reportType}
            setValue={(val: string | number) => setReportType(val)}
          />
        </View>
        <View style={Gutters.tinyBMargin}>
          <ButtonGroup
            label="Tháng"
            listButton={listMonth}
            value={month}
            setValue={(val: string | number) => setMonth(val)}
          />
        </View>
        <View style={Gutters.smallBMargin}>
          <ButtonGroup
            label="Năm"
            listButton={listYear}
            value={year}
            setValue={(val: string | number) => setYear(val)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <ButtonFloat title="Xoá" type="secondary" />
          <ButtonFloat title="Tìm kiếm" />
        </View>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },

  icon: {
    textAlign: 'center',
  },

  title: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default FilterAdv;
