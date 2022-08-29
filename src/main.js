import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 引入仓库
import store from '@/store'
import { MessageBox } from 'element-ui'

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav/index.vue'
import Carousel from '@/components/Carousel/index.vue'
import Pagination from '@/components/Pagination/index.vue'

// 引入MockServe.js    ----mock数据
import '@/mock/mockServe.js'

// 引入swiper样式
import 'swiper/css/swiper.css'
// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'

// 注册全局组件
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 使用组件，第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false

// 引入插件
import feiji from '@/assets/images/1.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // 懒加载图品
  loading: feiji
})
// 引入表单校验插件
import '@/plugins/validate.js'

new Vue({
  render: (h) => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  //注册仓库，组件身上多了一个属性$store属性
  store
}).$mount('#app')
