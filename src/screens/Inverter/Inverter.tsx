import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  // BottomSheet
} from '@gorhom/bottom-sheet';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { getListInverterService } from '@/services/inverter';
import { useRequest } from 'ahooks';
import { useTheme } from '../../hooks';
import { InverterCard, Header } from '@/components';
import { MODEL } from '../../../@types/model';
import { ApplicationScreenProps } from '../../../@types/navigation';

const Inverter = ({ navigation, route }: ApplicationScreenProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['40%', '50%'], []);
  const { Fonts, Gutters, Layout } = useTheme();
  const dispatch = useDispatch();

  const { loading, data, run } = useRequest(getListInverterService, {
    onSuccess: datas => {
      return [];
    },
  });

  const listInverter = _get(data, 'data.items', []);
  // console.log('inverter: ', listInverter);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const filterInverter = (
    list: MODEL.IItemInverter[],
    types: number[] = [],
    typeFilter: number,
  ) => {
    if (_isEmpty(list) || list.length === 0) {
      return [];
    } else {
      return list
        .filter((item: MODEL.IItemInverter) =>
          types.includes(Number(item.type)),
        )
        .sort(function (a: any, b: any) {
          return a.createdOn.localeCompare(b.createdOn);
        });
    }
  };

  const { typeFilter, types = [] } = route.params;

  const onSelectInverter = (inverterId: string) => {
    // bottomSheetModalRef.current?.present();
    navigation.navigate('InputInverter', { inverterId, typeFilter, types });
  };

  return (
    <>
      <Header
        title={'Nhập l'}
        isHasFirstIconRight
        iconNameFirstRight="info"
        onPressBack={() => navigation.navigate('InverterType')}
      />
      <ScrollView
        // style={Layout.fill}
        contentContainerStyle={[
          // Layout.fullSize,
          // Layout.fill,
          Layout.colCenter,
          // Layout.scrollSpaceBetween,
          Gutters.tinyPadding,
        ]}
      >
        {filterInverter(listInverter, types, typeFilter).map(
          (inverterInfo: MODEL.IItemInverter, index) => (
            <InverterCard
              key={index}
              info={inverterInfo}
              onClick={onSelectInverter}
            />
          ),
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Inverter;
