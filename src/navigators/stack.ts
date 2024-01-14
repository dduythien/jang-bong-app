import {
  Dashboard,
  Inverter,
  Report,
  Login,
  InverterRountine,
} from '@/screens';
import { StackProps } from 'types/navigation';

const rootStackConfig: StackProps = {
  login: {
    component: Login,
    options: {
      gestureEnabled: false,
      headerTransparent: true,
      headerShown: false,
    },
  },
  dashboard: {
    component: Dashboard,
    options: {
      gestureEnabled: false,
      headerTransparent: true,
      headerShown: false,
    },
  },
  report: {
    component: Report,
    options: {
      gestureEnabled: false,
      headerTransparent: true,
      headerShown: false,
    },
  },
  inverter: {
    component: Inverter,
    options: {
      gestureEnabled: false,
      headerTransparent: true,
      headerShown: false,
    },
  },
  inverterRountine: {
    component: InverterRountine,
    options: {
      gestureEnabled: false,
      headerTransparent: true,
      headerShown: false,
    },
  },
};

export default rootStackConfig;
