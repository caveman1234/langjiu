'use strict'
// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/ocm-web': {
                target: 'http://192.168.100.58', //测试
                // target: 'http://182.150.55.64:8013', //测试在线
                // target: 'http://10.18.2.37:8081', //杜琼
                // target: 'http://10.18.3.205:8080', //简称波
                // target: 'http://10.18.0.203:8080', //朱瑾
                // target: 'http://10.18.1.239', //代凯
                // target: 'http://10.18.0.210:8080',//尚玉杰
                // target: 'http://10.18.3.87:8080', //孔庆鹏
                // target: 'http://c.langjiu.cn', //正式
                changeOrigin: true,
                pathRewrite: {
                    '^/ocm-web': '/ocm-web'
                }
            },
            '/ism': {
                // target: 'http://10.18.1.82:8092/', //小平
                target: 'http://192.168.100.58', //测试
                changeOrigin: true,
                pathRewrite: {
                    '^/ism': '/ism'
                }
            }
        },
        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}