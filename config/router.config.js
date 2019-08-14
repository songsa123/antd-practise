export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/test/list', authority: ['admin', 'user'] },
      // test
      {
        path: '/test',
        name: 'test',
        icon: 'dashboard',
        routes: [
          {
            path: '/test/list',
            name: 'list',
            component: './Test/List',
          },
          {
            path: '/test/controConsole',
            name: 'controConsole',
            component: './Test/controConsole',
          },
          {
            path: '/test/echart',
            name: 'echarts',
            component: './Test/Echart',
          },
          {
            path: '/test/vip',
            name: 'vip',
            component: './Test/vip',
          },
          {
            path: '/test/workhour',
            name: 'workhour',
            component: './Test/Workhour',
          },
          {
            path: '/test/security',
            name: 'security',
            component: './Test/Security',
          },
          {
            path: '/test/tab',
            name: 'tab',
            component: './Test/tab',
          },
          {
            path: '/test/Video',
            name: 'Video',
            component: './Test/Video',
          },
          {
            path: '/test/emoji',
            name: 'Emoji',
            component: './Test/Emoji',
          },
          {
            path: '/test/pages',
            name: 'pages',
            routes: [
              {
                path: '/test/pages/page1',
                name: 'page1',
                component: './Test/Pages1',
              },
              {
                path: '/test/pages/page2',
                name: 'page2',
                component: './Test/Pages',
              },
            ],
          },
          {
            path: '/test/daping',
            name: 'Daping',
            component: './Test/Daping',
          },
          {
            component: '404',
          },
        ],
      },
      // user
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      // expection
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
