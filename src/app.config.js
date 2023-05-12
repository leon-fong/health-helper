export default defineAppConfig({
  pages: [
    'pages/profile/index',
    'pages/index/index',
    'pages/profile/edit',
    'pages/record/index',
    'pages/profile/report',
    'pages/profile/recommend',
    'pages/record/foodRecord',
    'pages/record/sportRecord',
    'pages/record/foodList',
    'pages/record/sportList',
    'pages/record/foodCompare'
  ],
  'subpackages': [
    {
      'root': 'module',
      'pages': [
        'pages/analysis/index',
      ],
      // "independent": true
    }
  ],
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/record/index",
        "iconPath": "./static/record.png",
        "selectedIconPath": "./static/record-active.png",
        "text": ""
      }, {
        "pagePath": "pages/profile/index",
        "text": "",
        "iconPath": "./static/profile.png",
        "selectedIconPath": "./static/profile-active.png",
      },
    ]
  },

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fabb39',
    navigationBarTitleText: '健康助手',
    navigationBarTextStyle: 'white'
  },
  // lazyCodeLoading: "requiredComponents"
})
