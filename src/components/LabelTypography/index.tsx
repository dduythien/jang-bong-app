import React, { useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type LabelTypographyProps = {
  label: string;
  unit: string;
  value: string;
  isSelected?: boolean;
  onPress: any;
};

const LabelTypography = (props: LabelTypographyProps) => {
  const { label, unit, isSelected = true, value, onPress } = props;

  let cursorOpacity = new Animated.Value(1);

  useEffect(() => {
    const startBlinking = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(cursorOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(cursorOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startBlinking();

    return () => {
      cursorOpacity.setValue(1); // Reset cursor opacity on unmount
    };
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.typoContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueWrapper}>
          <View style={styles.value}>
            <Text>{value}</Text>
            <Animated.View
              style={[
                styles.blinkingCursor,
                !isSelected && styles.unblinking,
                { opacity: cursorOpacity },
              ]}
            />
          </View>
          <Text style={styles.unit}>{unit}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  typoContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderColor: '#E14032',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 6,
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  valueWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    overflow: 'hidden',
  },
  unit: {
    textAlign: 'right',
    width: '20%',
  },
  blinkingCursor: {
    width: 2,
    borderRadius: 15,
    height: 18,
    backgroundColor: '#000000',
  },
  unblinking: {
    display: 'none',
  },
});

LabelTypography.defaultProps = {
  isSelected: true,
};

export default LabelTypography;
