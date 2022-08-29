import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
// home模块
const state = {
  // home仓库中存储三级联动的数据
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // floor轮播图数据
  floorList: []
}
const actions = {
  //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    // console.log(result)
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data.splice(0, 16))
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    // console.log(result)
    if (result.code === 200) {
      commit('BANNERLIST', result.data)
    }
  },
  // 获取floor轮播图
  async getFloorList({ commit }) {
    let result = await reqGetFloorList()
    // console.log(result)
    if (result.code === 200) {
      commit('FLOORLIST', result.data)
    }
  }
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
