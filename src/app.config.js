export default defineAppConfig({
  pages: [
    'pages/profile/index',
    'pages/index/index',
    'pages/profile/edit',
    'pages/analysis/index',
    'pages/record/index',
    'pages/profile/report',
    'pages/profile/recommend',
    'pages/record/foodRecord',
    'pages/record/sportRecord',
    'pages/record/foodList',
    'pages/record/sportList',
    'pages/record/foodCompare'
  ],
  "tabBar": {
    "list": [
    {
      "pagePath": "pages/record/index",
      "iconPath":"./static/record.png",
      "selectedIconPath":"./static/record-active.png",
      "text": ""
    },{
      "pagePath": "pages/profile/index",
      "text": "",
      "iconPath":"./static/profile.png",
      "selectedIconPath":"./static/profile-active.png",
    },
  ]
  },
  
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fabb39',
    navigationBarTitleText: ' ',
    navigationBarTextStyle: 'white'
  }
})
