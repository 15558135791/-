// 当前模块：API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

// 三级联动接口
export const reqCategoryList = () => {
  return requests.get('/product/getBaseCategoryList')
}

// 获取banner（home首页轮播图接口）
export const reqGetBannerList = () => {
  return mockRequests.get('/banner')
}

// 获取floor（轮播图接口）
export const reqGetFloorList = () => {
  return mockRequests.get('/floor')
}

/*
    获取搜索模块，地址：/api/list，请求方式post，参数：需要带参数
    当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数（至少是一个空对象）
*/
export const reqGetSearchInfo = (params) => {
  return requests({
    url: '/list',
    method: 'post',
    data: params
  })
}

// 获取产品详情信息的接口  /api/item/{ skuId }  请求方式get
export const reqGoodsInfo = (skuId) => {
  return requests.get(`/item/${skuId}`)
}

// 将产品添加到购物车中   /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
}

// 获取购物车列表数据的接口    /cart/cartList
export const reqCartList = () => {
  return requests.get('/cart/cartList')
}
// 删除购物车产品的接口    /cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => {
  return requests.delete(`/cart/deleteCart/${skuId}`)
}
// 修改产品是否勾选的接口  /cart/checkCart/{skuID}/{isChecked}
export const reUpdateCheckedById = (skuId, isChecked) => {
  return requests.get(`/cart/checkCart/${skuId}/${isChecked}`)
}
//获取验证码             /user/passport/sendCode/{phone}
export const reGetCode = (phone) => {
  return requests.get(`/user/passport/sendCode/${phone}`)
}
// 注册   /user/passport/register    post   参数：phone  code  password
export const reqUserRegister = (data) => {
  return requests.post('/user/passport/register', data)
}
// 登录接口    /user/passport/login  post   参数 :  phone password
export const reqUserLogin = (data) => {
  return requests.post('/user/passport/login', data)
}
// 获取用户信息（需要带用户的token向服务器要用户信息）
// /user/passport/auth/getUserInfo     get
export const reqUserInfo = () => {
  return requests.get('/user/passport/auth/getUserInfo')
}
// 用户退出登录      /user/passport/logout      get
export const reqLogout = () => {
  return requests.get('/user/passport/logout')
}
// 获取用户地址信息     /user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo = () => {
  return mockRequests.get('/address')
}
// 获取商品清单        /order/auth/trade     get
export const reqOrderInfo = () => {
  return requests.get('/order/auth/trade')
}
// 提交订单     /order/auth/submitOrder?tradeNo={tradeNo}    post
export const reqSubmitOrder = (tradeNo, data) => {
  return requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
}
// 获取订单支付信息   /payment/weixin/createNative/{orderId}   get
export const reqPayInfo = (orderId) => {
  return requests.get(`/payment/weixin/createNative/${orderId}`)
}
// 获取订单支付状态      /payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => {
  return requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
}
// 获取我的订单(个人中心)    /order/auth/{page}/{limit}     get
export const reqMyOrderList = (page, limit) => {
  return requests.get(`/order/auth/${page}/${limit}`)
}
