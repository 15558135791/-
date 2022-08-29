<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leavehShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true //控制三级路由是否显示
    }
  },
  mounted() {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是home组件，让typeNav进行隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        // console.log(state)
        return state.home.categoryList
      }
    })
  },
  methods: {
    // 鼠标移上一级item触发   (使用throttle节流，50毫秒执行一次)
    // throttle回调函数别使用箭头函数，可能会出现上下文this指向不对的情况
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    //进行路由跳转
    goSearch(event) {
      // 最好的解决办法：编程式导航+事件委派
      // 存在一个问题：事件委派，是把全部的子节点的事件委派给父节点
      // 点击a标签，才会进行路由跳转（怎么能确定点击的一定是a标签）
      // 存在另一个问题：即使确定点击的是a标签，怎么区分是一级，二级，三级分类的标签

      // 把子节点中a标签，添加自定义事件属性data-categoryName ，其余的子节点没有
      let node = event.target
      // 节点有一个属性dataset，可以获得节点的自定义属性与属性值
      // console.log(element.dataset)
      let { categoryname, category1id, category2id, category3id } = node.dataset
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        //一级，二级，三级分类的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // console.log(location, query)
        // 判断，如果路由跳转的时候，带有params参数，也需要传递
        if (this.$route.params) {
          location.params = this.$route.params
          // 整理参数
          location.query = query
          // 路由跳转
          this.$router.push(location)
        }
      }
    },
    // 当鼠标进入的时候让商品分类进行展示
    enterShow() {
      this.show = true
    },
    // 当鼠标离开让商品进行隐藏
    leavehShow() {
      // 如果是home 组件则离开就隐藏
      this.currentIndex = -1
      // 判断如果是search路由组件的时候才会执行
      if (this.$route.path != '/home') {
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    /* 
      过度动画的样式
       过度动画开始的状态
     */
    .sort-enter {
      height: 0px;
    }
    /*
       过度动画的结束
    */
    .sort-enter-to {
      height: 461px;
    }
    /*
      定义过度动画的事件，速率
    */
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
