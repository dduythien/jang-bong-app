import { Dashboard, Page2, Page3, Login } from '@/screens';

const rootStackConfig = {
  login: {
    component: Login,
    options: {
      gestureEnabled: false,
    },
  },
  dashboard: {
    component: Dashboard,
    options: {
      gestureEnabled: false,
    },
  },
  page2: {
    component: Page2,
    options: {
      gestureEnabled: false,
    },
  },
  page3: {
    component: Page3,
    options: {
      gestureEnabled: false,
    },
  },
};

export default rootStackConfig;
