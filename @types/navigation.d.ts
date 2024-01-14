import { Dashboard } from '@/screens';
import { NavigatorScreenParams, ScreenOp } from '@react-navigation/native';
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
  dashboard: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

export type StackComponent = {
  component: any;
  options: StackScreenProps;
};
export type StackProps = {
  login: StackComponent;
  dashboard: StackComponent;
  inverter: StackComponent;
  report: StackComponent;
  inverterRountine: StackComponent;
};
