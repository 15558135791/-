import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
// 封装游客临时身份模块uuid  ---生成一个随机字符串（不能在改变）
import { getUUID } from '@/utils/uuid_token'
const state = {
  // 产品详情数据
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const actions = {
  // 获取产品数据
  async getGoodsInfo({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 加入购物车 || 修改产品的个数
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    /*
       加入购物车的解构，加入购物车之后发请求，前台将数据带给服务器，
       服务器写入数据成功，并没有返回其他数据，只返回code=200代表此次操作成功
    */
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(Error('faile'))
    }
  }
}
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const getters = {
  // 简化数据而生
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
