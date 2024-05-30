// Filename: /Users/mac/Documents/2.个人文档/3.vue项目/publish-helper-vue/vue.config.js

module.exports = {
  // Other configurations...

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5372', // Change this to your backend server's URL
        changeOrigin: true,
        pathRewrite: { '^/api': 'api' },
      },
    },
  },

  // Other configurations...
};