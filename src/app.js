import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Taro from '@tarojs/taro'


import { Button,Radio,OverLay,Picker,Popup,DatePicker,RadioGroup,Tabs, TabPane, Toast,Form,FormItem,Icon ,Cell,CellGroup,Avatar ,Input} from '@nutui/nutui-taro';

import '@tarojs/taro/html.css';
import 'normalize.css/normalize.css';
import './app.scss'
import './style/iconfont.css'
// import "@nutui/nutui-taro/dist/style.css";

const checkSession = () => {
 return wx.checkSession()
}

const doLogin = async() => {
  // const sessionErrMsg = await checkSession()
  const token = Taro.getStorageSync('token')
  // console.log('[ sessionErrMsg ] >', sessionErrMsg)
  if ( !token) {
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }else{

    Taro.reLaunch({
      url: '/pages/profile/index'
    })
  }
}


const App = createApp({
  onLaunch(){
    doLogin()
  }
})




App.use(Button).use(Form)
.use(FormItem).use(Icon).use(Avatar)
.use(Cell).use(CellGroup)
.use(Radio).use(RadioGroup)
.use(Input).use(Popup).use(OverLay)
.use(Tabs).use(TabPane)
.use(DatePicker).use(Picker)

App.use(createPinia())
export default App
