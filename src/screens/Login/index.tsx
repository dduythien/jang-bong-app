import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  // Button
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _get from 'lodash/get';
import { useRequest } from 'ahooks';
import { StackActions } from '@react-navigation/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { LoadingComponent, Button, Input } from '@/components';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { authenticateService } from '@/services/auth';
import { _storeData, _retrieveData } from '@/utils/storeage';
import { COOKIE_NAMES } from '@/utils/constants';

const LoginScreen = ({ navigation }: ApplicationScreenProps) => {
  const insets = useSafeAreaInsets();

  const { Layout, Gutters, Images, Fonts } = useTheme();
  const form = useForm({});
  const { control, handleSubmit } = form;

  const { runAsync, loading } = useRequest(
    payload => authenticateService(payload),
    {
      manual: true,
      onSuccess: async res => {
        const token = _get(res, 'data');
        console.log('token: ', token);
        const { accessToken, refreshToken, userId } = token;
        await _storeData(COOKIE_NAMES.ACCESS_TOKEN, accessToken);
        await _storeData(COOKIE_NAMES.REFRESH_TOKEN, refreshToken);
        await _storeData(COOKIE_NAMES.USER_ID, userId);

        console.log('navigation: ', navigation);
        navigation.reset({
          index: 0,
          routes: [{ name: 'dashboard' }],
        });
      },
      onError: err => {
        console.log('asd', err);
        Alert.alert('Thông báo', 'Tài khoản hoặc mật khẩu không chính xác', [
          { text: 'Đồng ý' },
        ]);
      },
    },
  );
  const onSubmit = async (data: any) => {
    await runAsync(data);
  };

  useEffect(() => {
    (async () => {
      const token = await _retrieveData(COOKIE_NAMES.ACCESS_TOKEN);
      if (token) {
        // TODO: check expire time
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'dashboard' }],
        // });
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <View style={{ flex: 1, alignItems: 'stretch' }}>
        <Image
          style={{ flex: 1, width: '100%' }}
          source={Images.bg.login2}
          // resizeMode="contain"
        />
      </View>
      <>
        <View
          style={{
            flex: 1,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              zIndex: 1,
              top: -20,
              height: '100%',
              backgroundColor: '#fff',
            }}
          >
            <View style={styles.container}>
              <Text
                style={[
                  Fonts.textBold,
                  Fonts.titleRegular,
                  Gutters.smallPadding,
                ]}
              >
                Jang bông
              </Text>
            </View>
            <View style={styles.formConstainer}>
              <Controller
                control={control}
                name="userName"
                defaultValue="admin"
                render={({ field: { onChange, value, ...rest } }) => (
                  <Input
                    {...rest}
                    value={value}
                    autoCapitalize="none"
                    label="Tên đăng nhập"
                    name="username"
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                defaultValue="123qwe"
                render={({ field: { onChange, value, ...rest } }) => (
                  <Input
                    {...rest}
                    value={value}
                    label="Mật khẩu"
                    name="password"
                    isPassword
                    onChange={onChange}
                  />
                )}
              />
              <Button title="Đăng nhập" onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </View>
      </>
      <LoadingComponent loading={loading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // padding: 24,
  },
  formContainer: {
    flex: 1,
    // justifyContent: 'flex-end',
    height: 200,
  },
  scrollContainer: {
    backgroundColor: 'none',
    borderTopRightRadius: 20,
    borderWidth: 1,
    top: -10,
    flex: 1, //added flexGrow
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2, //flex added
  },
  formConstainer: {
    // flex: 1, //flex added
    height: 200,
    paddingHorizontal: 12,
  },
});

export default LoginScreen;
