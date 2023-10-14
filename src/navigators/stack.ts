import { Dashboard, Page2, Page3 } from '@/screens';

const rootStackConfig = {
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