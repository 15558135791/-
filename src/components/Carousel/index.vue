<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'MyCarousel',
  props: ['list'],
  /*
       在listContainer组件中书写Swiper的时候，在mounted书写时不可以的，而在此处可以
       第一次写轮播图的时候是在当前内部发请求，动态渲染结构服务器回来的数据需要事件，而此处是在主 组件发的请求
    */
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            autoplay: true, //可选选项，自动滑动
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true //点击小球跳转
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style></style>
