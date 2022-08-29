<template>
  <div>
    <!-- 头部区域 -->
    <Header></Header>

    <!-- 路由占位符 -->
    <router-view></router-view>

    <!-- 底部区域 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'MyApp',
  components: { Header, Footer },
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less" scoped></style>
