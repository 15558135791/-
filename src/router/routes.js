// 引入路由组件
// 引入二级路由组件
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'

// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就更加高效了。

// 路由配置信息
export default [
  // 配置路由
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: { show: true }
  }, //首页
  {
    path: '/detail/:skuid',
    component: () => import('@/views/Detail'),
    meta: { show: true }
  }, //详情页
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { show: false }
  }, //登录页
  {
    path: '/register',
    component: () => import('@/views/Register'),
    meta: { show: false }
  }, //注册
  {
    path: '/shopcart',
    component: () => import('@/views/ShopCart'),
    meta: { show: true }
  }, //购物车
  {
    path: '/trade',
    component: () => import('@/views/Trade'),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  }, //购物车结算页面
  {
    path: '/pay',
    component: () => import('@/views/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  }, //付款界面
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay') {
        next()
      } else {
        next(false)
      }
    }
  }, //付款成功界面
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: { show: true }
  }, //添加购物车成功
  // 搜索页面
  {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/views/Search'),
    meta: { show: true }
  },
  {
    path: '/center',
    component: () => import('@/views/Center'),
    meta: { show: true },
    redirect: '/center/myorder',
    children: [
      { path: 'myorder', component: () => import('@/views/Center/myOrder') },
      {
        path: 'grouporder',
        component: () => import('@/views/Center/groupOrder')
      }
    ]
  } //付款成功界面
]
