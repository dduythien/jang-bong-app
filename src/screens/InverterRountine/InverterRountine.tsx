import React, { useState, useRef } from 'react';
import {
  View,
  // Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
// import { useTranslation } from 'react-i18next';
import {
  BottomSheetModal,
  // BottomSheetBackdrop,
  // BottomSheet
} from '@gorhom/bottom-sheet';
import { useForm } from 'react-hook-form';
import _get from 'lodash/get';
import { getInverterRoutineService } from '@/services/inverter';
import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useTheme } from '../../hooks';
// import { InputFloat } from '@/components';
import { MODEL } from '../../../@types/model';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { Header } from '@/components';
import Keyboard from '@/components/Keyboard';
import LabelTypography from '@/components/LabelTypography';

const InverterRountine = ({ navigation, route }: ApplicationScreenProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const form = useForm({});
  // const { control, setValue } = form;
  // variables
  const { Gutters } = useTheme();
  // const dispatch = useDispatch();
  const [hourPicked] = useState(9);
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

  // const onOpenPickHour = () => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'InputInverter' }],
  //   });
  // };

  useMount(() => {
    run({
      inverterId: route.params.inverterId,
      createOn: dayjs().format('YYYY-MM-DD'),
    });
  });

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
  };

  const { typeFilter, types = [] } = route.params;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        bottomSheetModalRef.current?.close();
      }}
    >
      <View style={{ height: '100%' }}>
        <StatusBar barStyle="dark-content" />
        <Header
          title={'Nhập liệu'}
          isHasFirstIconRight
          iconNameFirstRight="info"
          onPressBack={() =>
            navigation.navigate('Inverter', { typeFilter, types })
          }
        />
        <SafeAreaView>
          <ScrollView contentContainerStyle={[Gutters.tinyPadding]}>
            {listUnit.map((item, index) => {
              return (
                <LabelTypography
                  key={index}
                  label={item.typeName}
                  unit={item.unitName}
                  value={item[`h${hourPicked}`]}
                  isSelected={item.unitId === selectedUnit}
                  onPress={() => {
                    handleOnFocusUnitRoutine(item.unitId);
                  }}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
        <Keyboard
          bottomSheetModalRef={bottomSheetModalRef}
          setValue={handleSetValue}
          deleteValue={handleDeleteValue}
          clearValue={handleClearValue}
          nextValue={handleNextValue}
          onDismiss={handleDismiss}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InverterRountine;
