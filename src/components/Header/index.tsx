import React from 'react';
import { Text, Image, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const Header = (props: any) => {
  const { style, customRender, onPressBack } = props;

  return (
    <Animated.View style={[styles.content, style]}>
      <AnimatedTouchableOpacity style={[styles.btnBack]} onPress={onPressBack}>
        <Icon name="arrowleft" color={'white'} size={24}/>
      </AnimatedTouchableOpacity>
      {customRender}
    </Animated.View>
  );
};

export default Header;
