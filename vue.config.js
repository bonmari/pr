const path = require('path')
const name = 'Vue Typescript Admin'
const devServerPort =9527
const mockServerPort = 9528
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/', // TODO: Remember to change this to fit your need
  lintOnSave: process.env.NODE_ENV === 'development',
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
devServer:{
  port: devServerPort,
  open: true,
  overlay:{
    warnings: false,
    errors: true
  }, 
  progress: false,
  proxy: {
    [process.env.VUE_APP_BASE_API]:{
      target: `http://localhost:${mockServerPort}/mock-api/v1`,
      changeOrigin: true,
      ws: true,
      pathRewrite:{
        ['^'+process.env.VUE_APP_BASE_API]:''
      }
    }
  }
},
  chainWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
  }
}
