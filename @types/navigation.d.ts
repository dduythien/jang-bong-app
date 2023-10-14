import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Inverter: {
    typeFilter: number;
    types: number[];
  };
  Home: undefined;
  Setting: undefined;
  Login: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Login: undefined;
  Inverter: NavigatorScreenParams<MainParamsList>;
  InputInverter: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
