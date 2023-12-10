import { Dashboard, Page2, Report, Login } from '@/screens';
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
  page2: {
    component: Page2,
    options: {
      gestureEnabled: false,
    },
  },
};

export default rootStackConfig;
