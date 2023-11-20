import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  // Button
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _get from 'lodash/get';
import { useRequest } from 'ahooks';

import { LoadingComponent, Button, Input } from '@/components';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { authenticateService } from '@/services/auth';
import { _storeData } from '@/utils/storeage';
import { COOKIE_NAMES } from '@/utils/constants';

const LoginScreen = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters, Images, Fonts } = useTheme();
  const form = useForm({});
  const { control, handleSubmit } = form;

  const { runAsync, loading } = useRequest(
    payload => authenticateService(payload),
    {
      manual: true,
      onSuccess: async res => {
        const token = _get(res, 'data');
        const { accessToken, refreshToken, userId } = token;
        await _storeData(COOKIE_NAMES.ACCESS_TOKEN, accessToken);
        await _storeData(COOKIE_NAMES.REFRESH_TOKEN, refreshToken);
        await _storeData(COOKIE_NAMES.USER_ID, userId);
        // navigation.replace('Dashboard');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      },
    },
  );
  const onSubmit = async (data: any) => {
    // console.log(data);
    await runAsync(data);
  };
  // console.log('adkad');
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <Image
              style={{ width: '100%', flex: 1 }}
              source={Images.bg.login}
              resizeMode="contain"
            />
            <Text
              style={[
                Fonts.textBold,
                Fonts.titleRegular,
                Gutters.regularBMargin,
              ]}
            >
              Jang bông
            </Text>
          </View>
          <View style={styles.formConstainer}>
            <Controller
              control={control}
              name="userName"
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
            <Button title="Đăng nhập" onPress={onSubmit} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <LoadingComponent loading={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 24,
  },
  formContainer: {
    flex: 1,
    // justifyContent: 'flex-end',
    height: 200,
  },
  scrollContainer: {
    // backgroundColor: 'yellow',
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
