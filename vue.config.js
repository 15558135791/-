const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  lintOnSave: false, //关闭代码检查
  productionSourceMap: false,
  transpileDependencies: true,
  // 配置代理服务器
  devServer: {
    host: 'localhost', //主机地址
    port: 8080, //端口号,
    // 代理跨域
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
