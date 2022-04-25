import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Taro from '@tarojs/taro'


import { Button,Radio,NumberKeyboard,
  OverLay,Picker,Popup,DatePicker,
  RadioGroup,Tabs, TabPane, 
  Toast,Form,FormItem,Icon 
  ,Cell,CellGroup,Avatar,
  Swipe,Swiper,SwiperItem ,Table
  ,Input} from '@nutui/nutui-taro';

import '@tarojs/taro/html.css';
import 'normalize.css/normalize.css';
import './app.scss'
import './styles/iconfont.css'

const doLogin = async() => {
  const token = Taro.getStorageSync('token')
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
.use(Tabs).use(TabPane).use(Swipe)
.use(Swiper).use(SwiperItem).use(Table)
.use(DatePicker).use(Picker).use(NumberKeyboard)

App.use(createPinia())
export default App
