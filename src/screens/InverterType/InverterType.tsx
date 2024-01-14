import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  // BottomSheet
} from '@gorhom/bottom-sheet';

import _get from 'lodash/get';
import { getListInverterService } from '@/services/inverter';
import { useRequest } from 'ahooks';
import { useTheme } from '../../hooks';
import { Header, InverterCard } from '@/components';
import { MODEL } from '../../../@types/model';
import { ApplicationScreenProps } from '../../../@types/navigation';

interface ICardTypeProps {
  title: string;
  description: string;
  onPress: (type: number) => void;
}

const CardType = (props: ICardTypeProps) => {
  const { Fonts, Gutters, Layout } = useTheme();
  const { onPress, title, description, type } = props;
  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[Gutters.tinyPadding]}>
          <Text
            style={[
              Fonts.textBold,
              Fonts.textSmall,
              Gutters.tinyBMargin,
              { color: '#FFF' },
            ]}
          >
            {title}
          </Text>
          <Text style={[Fonts.textTiny, Fonts.textLight]}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Inverter = ({ navigation }: ApplicationScreenProps) => {
  // variables
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [typePicked, setTypePicked] = useState(0);
  const snapPoints = useMemo(() => ['40%', '50%'], []);
  const { Fonts, Gutters, Layout } = useTheme();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onChooseType = (type: number) => {
    setTypePicked(type);
    bottomSheetModalRef.current?.present();
  };

  const navigateInverterList = (typeFilter: number, types: number[]) => {
    navigation.navigate('inverter', { typeFilter, types });
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} opacity={0.5} enableTouchThrough />
    ),
    [],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#131B54' }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <Header title="Báo cáo" />
        <ScrollView
        // contentContainerStyle={[Layout.fullSize, Gutters.tinyPadding]}
        >
          <Text
            style={[Fonts.textBold, Fonts.textRegular, Gutters.regularBMargin]}
          >
            Chọn Chu kỳ
          </Text>
          <CardType
            title="Chu kỳ 1 Giờ"
            onPress={() => onChooseType(1)}
            description="1 Giờ nhập 1 lần"
          />
          <CardType
            title="Chu kỳ 2 Giờ"
            onPress={() => onChooseType(2)}
            description="2 Giờ nhập 1 lần"
          />
          <CardType
            title="Chu kỳ 1 và 7 ngày"
            onPress={() => onChooseType(3)}
            description="1 hoặc 7 ngày nhập 1 lần"
          />
        </ScrollView>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
          >
            <View style={styles.contentContainer}>
              <Text>Lựa chọn Nhóm thông số</Text>
            </View>
            <ScrollView
              contentContainerStyle={[Layout.fullSize, Gutters.tinyPadding]}
            >
              {typePicked === 1 && (
                <>
                  <CardType
                    title="Thông số vận hành Nhà máy"
                    onPress={() => navigateInverterList(1, [6])}
                    description="1 Giờ nhập 1 lần"
                  />
                  <CardType
                    title="Thông số nhiệt độ Inverter"
                    onPress={() => navigateInverterList(1, [1, 3])}
                    description="1 Giờ nhập 1 lần"
                  />
                  <CardType
                    title="Thông số vận hành Inverter"
                    onPress={() => navigateInverterList(1, [4, 5])}
                    description="1 Giờ nhập 1 lần"
                  />
                </>
              )}
              {typePicked === 2 && (
                <>
                  <CardType
                    title="Thông số vận hành tự dùng AD-DC"
                    onPress={() => navigateInverterList(2, [1])}
                    description="1 Giờ nhập 1 lần"
                  />
                  <CardType
                    title="Hệ thống tự dùng 220 VDC"
                    onPress={() => navigateInverterList(2, [2])}
                    description="1 Giờ nhập 1 lần"
                  />
                </>
              )}
              {typePicked === 3 && (
                <>
                  <CardType
                    title="LS9 và LS 10 chu kỳ 1 ngày"
                    onPress={() => navigateInverterList(3, [8])}
                    description="1 Giờ nhập 1 lần"
                  />
                  <CardType
                    title="LS11 chu kỳ 7 ngày"
                    onPress={() => navigateInverterList(3, [9])}
                    description="1 Giờ nhập 1 lần"
                  />
                </>
              )}
            </ScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    width: '100%',
    borderRadius: 8,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    backgroundColor: '#131b54',
    marginBottom: 16,
  },
  contentContainer: {
    // flex: 1,
    alignItems: 'center',
    width: '100%',
  },
});

export default Inverter;
