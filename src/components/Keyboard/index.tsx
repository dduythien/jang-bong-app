import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, { useMemo, RefObject } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome6';

export type KeyBoardProps = {
  setValue: (val: string) => void;
  deleteValue: () => void;
  clearValue: () => void;
  nextValue: () => void;
  onDismiss: () => void;
  bottomSheetModalRef: RefObject<BottomSheetModal>;
};

const KeyboardButton = (props: any) => {
  const { title, onPress, color = '#fff', isIcon = false, ...rest } = props;

  if (isIcon) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[stylesBtn.container, { backgroundColor: color }]}
        {...rest}
      >
        {title}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[stylesBtn.container, { backgroundColor: color }]}
      {...rest}
    >
      {typeof title === 'string' ? (
        <Text style={stylesBtn.title}>{title}</Text>
      ) : (
        { title }
      )}
    </TouchableOpacity>
  );
};

const Keyboard = (props: KeyBoardProps) => {
  const {
    setValue,
    deleteValue,
    clearValue,
    onDismiss,
    nextValue,
    bottomSheetModalRef,
  } = props;
  const snapPoints = useMemo(() => ['40%'], []);

  return (
    // <BottomSheetModalProvider>
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      enableOverDrag={false}
      // enablePanDownToClose={false}
      enableDismissOnClose={true}
    >
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <KeyboardButton
            title="7"
            onPress={() => {
              setValue('7');
            }}
          />
          <KeyboardButton
            title="8"
            onPress={() => {
              setValue('8');
            }}
          />
          <KeyboardButton
            title="9"
            onPress={() => {
              setValue('9');
            }}
          />
          <KeyboardButton title="AC" color="#d8d8d8" onPress={clearValue} />
        </View>
        <View style={styles.row}>
          <KeyboardButton
            title="4"
            onPress={() => {
              setValue('4');
            }}
          />
          <KeyboardButton
            title="5"
            onPress={() => {
              setValue('5');
            }}
          />
          <KeyboardButton
            title="6"
            onPress={() => {
              setValue('6');
            }}
          />
          <KeyboardButton
            title={
              <Icon2 style={stylesBtn.icon} name="delete-left" size={22} />
            }
            isIcon
            color="#d8d8d8"
            onPress={deleteValue}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.nextRowContainer}>
            <View style={styles.nextRow}>
              <KeyboardButton
                title="1"
                onPress={() => {
                  setValue('1');
                }}
              />
              <KeyboardButton
                title="2"
                onPress={() => {
                  setValue('2');
                }}
              />
              <KeyboardButton
                title="3"
                onPress={() => {
                  setValue('3');
                }}
              />
            </View>
            <View style={styles.nextRow}>
              <KeyboardButton
                title="-"
                onPress={() => {
                  setValue('-');
                }}
              />
              <KeyboardButton
                title="0"
                onPress={() => {
                  setValue('0');
                }}
              />
              <KeyboardButton
                title="."
                onPress={() => {
                  setValue('.');
                }}
              />
            </View>
          </View>
          <View style={styles.nextRowBtnWrapper}>
            <KeyboardButton
              title={<Icon style={stylesBtn.icon} name="enter" size={22} />}
              isIcon
              color="#d8d8d8"
              onPress={nextValue}
            />
          </View>
        </View>
      </View>
    </BottomSheetModal>
    // </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 4,
    height: '100%',
    backgroundColor: '#f9f9f9',
  },
  row: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  rowContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  nextRowContainer: {
    flex: 3,
  },
  nextRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  nextRowBtnWrapper: {
    flex: 1,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
});

const stylesBtn = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    margin: 4,
    backgroundColor: '#fff',
  },

  icon: {
    textAlign: 'center',
  },

  title: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Keyboard;
