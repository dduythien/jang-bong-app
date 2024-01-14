import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  // Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useForm } from 'react-hook-form';
import _get from 'lodash/get';
import { getInverterRoutineService } from '@/services/inverter';
import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useTheme } from '../../hooks';
import { MODEL } from '../../../@types/model';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { Header, ButtonFloat } from '@/components';
import Keyboard from '@/components/Keyboard';
import LabelTypography from '@/components/LabelTypography';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const InverterRountine = ({ navigation, route }: ApplicationScreenProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const form = useForm({});
  // const { control, setValue } = form;
  // variables
  const { Gutters, Layout } = useTheme();
  // const dispatch = useDispatch();
  const [hourPicked, setHourPicked] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [listUnit, setListUnit] = useState<MODEL.IInverterRountineByUnit[]>([]);

  const { run } = useRequest(
    (params: MODEL.IQueryRoutine) => getInverterRoutineService(params),
    {
      onSuccess(data) {
        const routine = _get(data, 'data.unitRoutines');
        form.setValue('unitRoutines', routine);
        setListUnit(routine);
      },
      manual: true,
    },
  );

  useMount(() => {
    run({
      inverterId: route.params.inverterId,
      createOn: dayjs().format('YYYY-MM-DD'),
    });
  });

  const handleScrollToFocus = (index: number) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: 0,
        y: 66 * index,
        animated: true,
      });
    }, 100);
  };

  const handleOnFocusUnitRoutine = (id: string) => {
    setSelectedUnit(id);
    bottomSheetModalRef.current?.present();
  };

  const handleSetValue = (val: string) => {
    const units = listUnit.map(unit => {
      if (unit.unitId === selectedUnit) {
        return { ...unit, [`h${hourPicked}`]: unit[`h${hourPicked}`] + val };
      }
      return unit;
    });
    setListUnit(units);
  };

  const handleClearValue = () => {
    const units = listUnit.map(unit => {
      if (unit.unitId === selectedUnit) {
        return { ...unit, [`h${hourPicked}`]: '' };
      }
      return unit;
    });
    setListUnit(units);
  };

  const handleDeleteValue = () => {
    const units = listUnit.map(unit => {
      if (unit.unitId === selectedUnit) {
        return {
          ...unit,
          [`h${hourPicked}`]: unit[`h${hourPicked}`].slice(0, -1),
        };
      }
      return unit;
    });
    setListUnit(units);
  };

  const handleDismiss = () => {
    const units = listUnit.map(unit => {
      const checkNumberValid = !!Number(unit[`h${hourPicked}`]);
      if (unit.unitId === selectedUnit) {
        return {
          ...unit,
          [`h${hourPicked}`]: checkNumberValid ? unit[`h${hourPicked}`] : '',
        };
      }
      return unit;
    });
    setListUnit(units);
    setSelectedUnit('');
  };

  const handleNextValue = () => {
    let idx = 0;
    const units = listUnit.map((unit, index) => {
      const checkNumberValid = !!Number(unit[`h${hourPicked}`]);
      if (unit.unitId === selectedUnit) {
        idx = index === listUnit.length - 1 ? 0 : index + 1;
        return {
          ...unit,
          [`h${hourPicked}`]: checkNumberValid ? unit[`h${hourPicked}`] : '',
        };
      }
      return unit;
    });
    setListUnit(units);
    setSelectedUnit(listUnit[idx].unitId);
    handleScrollToFocus(idx);
  };

  const {
    typeFilter,
    types = [],
    inverterName,
    hourPicked: hourPickedParmams,
  } = route.params;
  console.log(route.params);
  useEffect(() => {
    setHourPicked(hourPickedParmams);
  }, [hourPickedParmams]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#131B54',
        paddingTop: Platform.OS === 'android' ? 24 : 0,
      }}
    >
      <BottomSheetModalProvider>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: '#fff' }}
          behavior="padding"
          keyboardVerticalOffset={0}
        >
          <Header
            title={`${inverterName} (${hourPickedParmams}:00)`}
            onPressBack={() => navigation.goBack()}
          />
          <View style={styles.container}>
            <TouchableWithoutFeedback
              onPress={() => {
                bottomSheetModalRef.current?.close();
              }}
            >
              <>
                <SafeAreaView>
                  <ScrollView
                    ref={scrollViewRef}
                    // style={styles.routineContainer}
                    contentContainerStyle={[
                      Layout.colCenter,
                      Gutters.tinyPadding,
                      { paddingBottom: 42 },
                    ]}
                  >
                    {listUnit.map((item, index) => {
                      return (
                        <LabelTypography
                          key={index}
                          label={item.typeName}
                          unit={item.unitName}
                          value={item[`h${hourPicked}`]}
                          isSelected={item.unitId === selectedUnit}
                          onPress={() => {
                            handleScrollToFocus(index);
                            handleOnFocusUnitRoutine(item.unitId);
                          }}
                        />
                      );
                    })}
                    {selectedUnit !== '' && <View style={styles.wrapper} />}
                    <View
                      style={{
                        // position: 'absolute',
                        // bottom: 1,
                        width: '100%',
                        // padding: 12,
                      }}
                    >
                      <ButtonFloat
                        title="Lưu"
                        onPress={() => console.log(listUnit)}
                      />
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </>
            </TouchableWithoutFeedback>
            <Keyboard
              bottomSheetModalRef={bottomSheetModalRef}
              setValue={handleSetValue}
              deleteValue={handleDeleteValue}
              clearValue={handleClearValue}
              nextValue={handleNextValue}
              onDismiss={handleDismiss}
            />
          </View>
        </KeyboardAvoidingView>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },

  routineContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'scroll',
    paddingBottom: 24,
  },

  wrapper: {
    height: (Dimensions.get('screen').height * 40) / 100,
  },
});

export default InverterRountine;
