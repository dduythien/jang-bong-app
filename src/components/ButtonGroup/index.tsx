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
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const ButtonGroup = (props: MODEL.IButtonGroupProps) => {
  const { listButton, setValue, value, label } = props;

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal={true}>
        <View style={styles.buttonContainer}>
          {listButton.map(item => (
            <TouchableOpacity
              style={[
                styles.button,
                value === item.value ? styles.checked : null,
              ]}
              onPress={() => setValue(item.value)}
            >
              {value === item.value && (
                <Icon name="check" color={'#fff'} size={18} />
              )}
              <Text
                style={[
                  value === item.value ? styles.textChecked : styles.text,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: '#E7EDF1', //131B54
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#E7EDF1',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#131B54',
    borderWidth: 1,
    borderColor: '#2a1a59',
  },
  text: {
    color: '#000',
  },
  textChecked: {
    color: '#fff',
  },
  label: {
    paddingBottom: 8,
  },
});

export default ButtonGroup;
