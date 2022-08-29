import { reqGetSearchInfo } from '@/api'

// search模块
const state = {
  // 初始化数据
  searchList: {}
}
const actions = {
  async getSearchList({ commit }, params = {}) {
    const result = await reqGetSearchInfo(params)
    // console.log(result)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
// 计算属性
/*
   项目当中getters主要的作用就是简化仓库中的数据
   可以把我们将来要用的数据简化一下
*/
const getters = {
  goodsList(state) {
    return state.searchList.goodsList //此写法有问题，无法确认goodsList是否含值
  },
  attrsList(state) {
    return state.searchList.attrsList
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
