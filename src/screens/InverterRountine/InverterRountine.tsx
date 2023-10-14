import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  // BottomSheet
} from '@gorhom/bottom-sheet';
import { useForm, Controller } from 'react-hook-form';
import _get from 'lodash/get';
import { getInverterRoutineService } from '@/services/inverter';
import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useTheme } from '../../hooks';
import { InputFloat } from '@/components';
import { MODEL } from '../../../@types/model';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { Header } from '@/components';

const InverterRountine = ({ navigation, route }: ApplicationScreenProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const form = useForm({});
  const { control } = form;
  // variables
  const snapPoints = useMemo(() => ['40%', '50%'], []);
  const { Fonts, Gutters, Layout } = useTheme();
  const dispatch = useDispatch();
  const [hourPicked, setHourPicked] = useState(9);
  const [listUnit, setListUnit] = useState<MODEL.IInverterRountineByUnit[]>([]);

  const { loading, run } = useRequest(
    (params: MODEL.IQueryRoutine) => getInverterRoutineService(params),
    {
      onSuccess(data, params) {
        const routine = _get(data, 'data.unitRoutines');
        form.setValue('unitRoutines', routine);
        setListUnit(routine);
      },
      manual: true,
    },
  );

  const onOpenPickHour = () => {
    // bottomSheetModalRef.current?.present();
    navigation.reset({
      index: 0,
      routes: [{ name: 'InputInverter' }],
    });
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useMount(() => {
    run({
      inverterId: route.params.inverterId,
      createOn: dayjs().format('YYYY-MM-DD'),
    });
  });

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} opacity={0.5} enableTouchThrough />
    ),
    [],
  );

  const { typeFilter, types = [] } = route.params;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header
        title={'Nhập l'}
        isHasFirstIconRight
        iconNameFirstRight="info"
        onPressBack={() => navigation.navigate('Inverter', {typeFilter, types})}
      />
      <SafeAreaView>
        <ScrollView
          // style={Layout.fill}
          contentContainerStyle={[
            // Layout.fullSize,
            // Layout.fill,
            // Layout.colCenter,
            // Layout.scrollSpaceBetween,
            Gutters.tinyPadding,
            // { width: '100%' },
          ]}
        >
          {/* <Button title='zxc' onPress={() => form.setValue('unitRoutines.0.h8', 123123)} />
          <Button title='zxczxc' onPress={() => console.log(form.getValues())} /> */}
          {/* <Controller
                control={control}
                name={`unitRoutines.0.h8`}
                render={({ field: { onChange, value, ...rest } }) => (
                  <InputFloat
                    {...rest}
                    value={value}
                    label={'item.typeName'}
                    unit={item.unitName}
                    name={`unitRoutines.0.h8`}
                    onChange={onChange}
                  />
                )}
              /> */}

          {listUnit.map((item, index) => {
            return (
              <Controller
                control={control}
                name={`unitRoutines[${index}]h${hourPicked}`}
                render={({ field: { onChange, value, ...rest } }) => (
                  <InputFloat
                    {...rest}
                    value={value}
                    label={item.typeName}
                    unit={item.unitName}
                    name={`unitRoutines[${index}].h${hourPicked}`}
                    onChange={onChange}
                  />
                )}
              />
            );
          })}
        </ScrollView>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            // backdropComponent={({ style }) => (
            //   <View
            //     style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
            //   />
            // )}
          >
            <View style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </SafeAreaView>
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

export default InverterRountine;
