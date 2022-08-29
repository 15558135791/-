<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要在引入 -->
    <type-nav></type-nav>
    <list-container></list-container>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'

export default {
  name: 'MyHome',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    // 派发actions,通过API发请求存储在仓库中
    this.$store.dispatch('getFloorList')
    // 获取用户信息在首页展示
  //   this.$store.dispatch('getUserInfo')
  },
  computed: {
    // 从仓库获取数据
    ...mapState({
      floorList: (state) => state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped></style>
