import { reqCartList, reqDeleteCartById, reUpdateCheckedById } from '@/api'
const state = {
  // 购物车传递数据
  cartList: []
}
const actions = {
  // 获取购物车列表信息
  async getCartList({ commit }) {
    const result = await reqCartList()
    // console.log(result)
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车产品
  async deleteCartListBySkuId({ commit }, skuId) {
    const result = await reqDeleteCartById(skuId)
    // console.log(result)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    const result = await reUpdateCheckedById(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      // 调用删除每一个产品的actions
      let promise =
        item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      // 将每一次返回的promise添加到数组中
      PromiseAll.push(promise)
    })
    // 如果一个失败则返回即为失败
    return Promise.all(PromiseAll)
  },
  // 修改全部产品的状态
  updateAllCartIsChecked({ dispatch, getters }, isChecked) {
    let arr = []
    getters.cartList.cartInfoList.forEach((item) => {
      let p = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      arr.push(p)
    })
    return Promise.all(arr)
  }
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
