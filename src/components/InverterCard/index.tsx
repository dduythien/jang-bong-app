import React from 'react';
import { View, Text, DimensionValue, StyleSheet } from 'react-native';
import { MODEL } from '../../../@types/model';
import { useTheme } from '../../hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

    backgroundColor: 'white',
  },

  divider: {
    borderBottomColor: '#BBC6D9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

interface IInveterProps {
  info: MODEL.IItemInverter;
  onClick: (id: string) => void;
}

const InverterCard = (props: IInveterProps) => {
  const { info, onClick } = props;
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  return (
    <View style={[styles.container, Gutters.tinyBMargin]}>
      <TouchableOpacity onPress={() => onClick(info.inverterId || '')}>
        <View style={[Gutters.tinyPadding]}>
          <Text style={[Fonts.textTiny, Fonts.textLight]}>Thông số</Text>
        </View>
        <View style={styles.divider} />
        <View style={[Gutters.tinyPadding]}>
          <Text style={[Fonts.textBold, Fonts.textSmall, Gutters.tinyBMargin]}>
            {info?.inverterName}
          </Text>
          <Text style={[Fonts.textTiny, Fonts.textLight]}>Ca hiện tại</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InverterCard;
