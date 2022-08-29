import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 解决编程式导航多次点击爆红的方法
// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
/*
   第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
   第二个参数：成功的回调
   第三个参数：失败的回调
*/
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 配置路由
let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})

// 全局守卫   前置守卫（在路由跳转之间进行转换）
router.beforeEach(async (to, from, next) => {
  next()
  // 用户登录了才会有token
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  if (token) {
    //用户已经登录了还想去login（不能放行，停留在首页）
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      // 如果登录了，去其他页面
      // 如果用户名有
      if (name) {
        next()
      } else {
        try {
          // 如果没有用户名  派发actions请求获取用户名，在进行放行
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          /*
              token失效获取不到用户信息，从新登录
              清除token
          */
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 用户未登录：不能去交易等页面，（pay|paysuccess）和个人中心
    let toPath = to.path
    if (
      toPath.indexOf('/trade') != -1 ||
      toPath.indexOf('/pay') != -1 ||
      toPath.indexOf('/center') != -1
    ) {
      // 把未登录的时候想去而没去的信息，存储在地址栏中（路由）
      next('/login?redirect=' + toPath)
    } else {
      // 去的不是上面这些路由   ---放行
      next()
    }
  }
})
export default router
