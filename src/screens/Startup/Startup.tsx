import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { setDefaultTheme } from '../../store/theme';
import { ApplicationScreenProps } from '../../../@types/navigation';
import _get from 'lodash/get';
import { authenticateService } from '@/services/auth';
import { _storeData } from '@/utils/storeage';
import { COOKIE_NAMES } from '@/utils/constants';
import { useRequest, useMount } from 'ahooks';

const Startup = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters } = useTheme();

  const { runAsync } = useRequest(payload => authenticateService(payload), {
    manual: true,
  });

  useMount(async () => {
    await setDefaultTheme({ theme: 'default', darkMode: null });
    const res = await runAsync({
      userName: 'admin',
      password: '123qwe',
    });
    const token = _get(res, 'data');
    const { accessToken, refreshToken, userId } = token;

    await _storeData(COOKIE_NAMES.ACCESS_TOKEN, accessToken);
    await _storeData(COOKIE_NAMES.REFRESH_TOKEN, refreshToken);
    await _storeData(COOKIE_NAMES.USER_ID, userId);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Inverter' }],
    });
  });

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  );
};

export default Startup;
