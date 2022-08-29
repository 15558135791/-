//  登录与注册的模块
import {
  reGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout
} from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '', //验证码
  token: getToken(), //用户token
  userInfo: {}
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    const result = await reGetCode(phone)
    // console.log(result)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 注册用户
  async userRegister({ commit }, user) {
    const result = await reqUserRegister(user)
    // console.log(result)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 登录
  async userLogin({ commit }, data) {
    const result = await reqUserLogin(data)
    // console.log(result)
    // 服务器下发token,将来经常通过token找服务器进行信息展示
    if (result.code == 200) {
      // 用户成功登录并且获取到token值
      commit('USERLOGIN', result.data.token)
      // 将token持久化存储
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    // console.log(result)
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    const result = await reqLogout()
    // console.log(result)
    if (result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  // 用户登录业务
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR(state) {
    // 把仓库中的数据清空
    state.token = ''
    state.userInfo = {}
    // 本地存储清空
    removeToken()
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
