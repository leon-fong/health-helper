export default defineAppConfig({
  pages: [
    'pages/profile/index',
    'pages/index/index',
    'pages/profile/edit',
    'pages/analysis/index',
    'pages/record/index',
    'pages/profile/eat-suggestion',
    'pages/profile/report',
    'pages/record/foodRecord',
    'pages/record/fitnessRecord',
    'pages/record/foodList'
  ],
  "tabBar": {
    "list": [{
      "pagePath": "pages/profile/index",
      "text": "",
      "iconPath":"./static/profile.png",
      "selectedIconPath":"./static/profile-active.png",
    }, {
      "pagePath": "pages/analysis/index",
      "text": "",
      "iconPath":"./static/chart.png",
      "selectedIconPath":"./static/chart-active.png",
    },
    {
      "pagePath": "pages/record/index",
      "iconPath":"./static/record.png",
      "selectedIconPath":"./static/record-active.png",
      "text": ""
    }
  ]
  },
  
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: ' ',
    navigationBarTextStyle: 'black'
  }
})
