import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Taro from '@tarojs/taro'
import '@tarojs/taro/html.css';
import 'normalize.css/normalize.css';
import './app.scss'
import './styles/iconfont.css'
import {
  Button, Radio, NumberKeyboard,
  OverLay, Picker, Popup, DatePicker,
  RadioGroup, Tabs, TabPane, Form, FormItem, Icon
  , Cell, CellGroup, Avatar,
  Swipe, Swiper, SwiperItem, Table
  , Input, Dialog, Badge
} from '@nutui/nutui-taro';

const doLogin = () => {
  const token = Taro.getStorageSync('token')
  if (!token) {
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }
}

const App = createApp({
  onLaunch() {
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
  .use(DatePicker).use(Picker).use(NumberKeyboard).use(Dialog).use(Badge)

App.use(createPinia())

export default App
