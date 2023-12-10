import React from 'react';
import { Text, Image, Animated, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const Header = (props: any) => {
  const { style, title, customRender, onPressBack } = props;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, style]}>
        {onPressBack && (
          <AnimatedTouchableOpacity
            style={[styles.btnBack]}
            onPress={onPressBack}
          >
            <Icon name="arrowleft" color={'white'} size={24} />
          </AnimatedTouchableOpacity>
        )}
      </Animated.View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {customRender && (
        <View style={styles.customRenderContainer}>{customRender}</View>
      )}
    </View>
  );
};

export default Header;
