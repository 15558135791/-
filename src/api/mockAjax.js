// 对axios二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// start：进度条开始  done：进度条结束

// 创建axios实例
const requests = axios.create({
  baseURL: '/mock',
  timeout: 5000
})
// 请求拦截器，在发送请求之前，请求拦截器可以检测到请求发送出去之前的事情
requests.interceptors.request.use((config) => {
  // config  配置对象中有header请求头
  nprogress.start() //进度条开始
  return config
})
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调，响应拦截器可以检测到成功回来的数据
    nprogress.done() //进度条结束
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default requests
