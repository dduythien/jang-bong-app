import { RefObject } from 'react';
import { ScrollView } from 'react-native';

export const handleScrollToElement = (
  scrollViewRef: RefObject<ScrollView>,
  index: number,
  heightPerElement: number,
) => {
  setTimeout(() => {
    if (scrollViewRef) {
      scrollViewRef.current?.scrollTo({
        x: 0,
        y: heightPerElement * index,
        animated: true,
      });
    }
  }, 100);
};
