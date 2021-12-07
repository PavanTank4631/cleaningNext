// routes
import { PATH_DASHBOARD } from '../../otherComponents/routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: '100%', height: '100%' }}
  />
);
const myIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/${name}.svg`}
    sx={{ width: '100%', height: '100%' }}
  />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  mail: getIcon('ic_mail'),
  blog: getIcon('ic_blog'),
  booking: getIcon('ic_booking'),
  chat: getIcon('ic_chat'),
  danger: myIcon('_danger-14'),
  user8: myIcon('_user-8'),
  user28: myIcon('_user-28'),
  smiley8: myIcon('_smiley-8'),
  car4: myIcon('_car-4'),
  noun_newcar: myIcon('noun_new-car'),
  noun_cleancar: myIcon('noun_cleancar'),
  noun_sell: myIcon('noun_sell'),
  noun_checkout: myIcon('noun_checkout'),
  noun_checkout2: myIcon('noun_checkout2'),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.general.pageOne,
        icon: ICONS.dashboard,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.app.root,
        icon: ICONS.user,
        children: [
          { title: 'Account', path: PATH_DASHBOARD.app.pageAccount },
          { title: 'Cart', path: PATH_DASHBOARD.app.pageFive },
          { title: 'Contact', path: PATH_DASHBOARD.app.pageSix },
        ],
      },
    ],
  },

  {
    subheader: 'More',
    items: [
      {
        title: 'Cars',
        path: '/dashboard/shop',
        icon: ICONS.car4,
      },
      {
        title: 'Login',
        path: PATH_DASHBOARD.user.pageLogin,
        icon: ICONS.smiley8,
      },
      {
        title: 'Register',
        path: PATH_DASHBOARD.user.pageRegister,
        icon: ICONS.user8,
      },
      {
        title: 'Verify',
        path: PATH_DASHBOARD.user.pageVerify,
        icon: ICONS.noun_newcar,
      },
      {
        title: 'Sell',
        path: PATH_DASHBOARD.general.pageSell,
        icon: ICONS.noun_checkout,
      },
      // {
      //   title: 'Details',
      //   path: PATH_DASHBOARD.general.pageThree,
      //   icon: ICONS.noun_cleancar,
      // },
      {
        title: 'Checkout',
        path: '/dashboard/shop/checkout',
        icon: ICONS.noun_checkout2,
      },
      {
        title: 'Inbox',
        path: PATH_DASHBOARD.mail.all,
        icon: ICONS.chat,
      },
      // {
      //   title: 'Message Us',
      //   path: PATH_DASHBOARD.general.pageThree,
      //   icon: ICONS.chat,
      // },
    ],
  },
];

export default sidebarConfig;
