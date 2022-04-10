export default defineAppConfig({
  pages: [
    'pages/profile/index',
    'pages/index/index',
    'pages/profile/edit',
    'pages/analysis/index',
    'pages/record/index',
    'pages/profile/report',
    'pages/record/foodRecord',
    'pages/record/sportRecord',
    'pages/record/foodList',
    'pages/record/sportList',
    'pages/record/foodCompare'
  ],
  "tabBar": {
    "list": [{
      "pagePath": "pages/profile/index",
      "text": "",
      "iconPath":"./static/profile.png",
      "selectedIconPath":"./static/profile-active.png",
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
