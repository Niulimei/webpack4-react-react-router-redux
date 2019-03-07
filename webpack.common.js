var merge = require('webpack-merge');
// MiniCssExtractPlugin 此插件将css提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS 文件，他支持CSS和SourceMaps的按需加载
// 如果当前项目是webpack3.x版本，则使用 extract-text-webpack-plugin，否则webpack4.x的使用 mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
const productionConfig = require('./webpack.pro.config.js'); // 引入生产环境配置文件
const developmentConfig = require('./webpack.dev.config.js'); // 引入开发环境配置文件

/**
 * 根据不同的环境，生成不同的配置
 * @param{String} process.env.NODE_ENV 'devlopment' or 'production'
 */

 const generateConfig = env =>{
 return {
  entry:'./src/app.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    publicPath:'/dist/',
    filename:'js/[name]-[hash:5].bundle.js',
    // chunkFilename: "js/[name].chunk.js",
    
    // 生产环境
    publicPath: env === 'development'? '/':__dirname + '/dist',

  },
  module:{
    rules:[ 
      { test:/(\.jsx|\.js)$/,
        loader:'babel-loader',
        // 解析ES6
        options: {
          presets: ['@babel/preset-env']
        },
        exclude:/(node_modules)/,
      },
      { test:/\.css$/,
        use:[
          env === 'development'?'style-loader':{loader:MiniCssExtractPlugin.loader,options:{ publicPath:'../'}},
          { loader:'css-loader',options:{importLoaders:1}},
          // 给css 添加浏览器的兼容性私有前缀的功能
          'postcss-loader',
        ]
      },
      { 
        test: /\.less$/,
        use: [
          env === 'development'?'style-loader':{loader:MiniCssExtractPlugin.loader,options:{ publicPath:'../'}}, // creates style nodes from JS strings
         {
            loader: "css-loader", // translates CSS into CommonJS
            options:{ sourceMap:env === 'development'?true:false // 开启source-map
            }
        }, {
          loader: "postcss-loader",
        },{
            loader: "less-loader", // compiles Less to CSS
            options:{
              sourceMap:env === 'development'?true:false // 开启source-map
            }
        }]
      },
      // 处理图片
      {
        test:/\.(png|jpg|gif|svg)$/i,
        use:[{
          loader:'url-loader',
          options:{ // 这里的options选项参数可以定义多大的图片转换为base64
            name: '[name].[ext]',
            limit:2000, // 表示小于50kb的图片转为base64,大于50kb的是路径
            outputPath:'/images/' //定义输出的图片文件夹
          }
          },
          	// 压缩http请求的图片,压缩图片要在file-loader之后使用
          //  {loader:'image-webpack-loader',} // 目前有问题
        ]
      },
      {
        // 处理<img/>里面的图片，必须要在启动服务的情况下，不然就无法找到图片路径
        // 尼玛，踩了一天坑，因为看的是别人的教程，别人的教程里面就没有启动服务，然后我就呵呵呵了
        test:/\.(html)$/,
        use:[
          {
            loader:'html-loader',
            options:{
              minimize:true,
              attrs: ["img:src"],
            },
          },
        ]
      },
      {
        test:/\.(eot|woff|ttf|woff2|gif|appcache)(\?|$)/,
        use:[{
          loader:'file-loader',
            options: {
              name: '[name].[ext]',
              limit: 5000,               
              outputPath:'/fonts/'
            }
          },
          	// 压缩http请求的图片,压缩图片要在file-loader之后使用
          //  {loader:'image-webpack-loader',} // 目前有问题
        ]
      },
    ]
  },
  plugins:[
    // 开发环境和生产环境两者均需要的插件
    new htmlWebpackPlugin({
      filename:'index.html',
      template:'index.html',
      //删除空格
      collapseWhitespace:true
    }),
    new MiniCssExtractPlugin({
      filename:"css/[name]-[hash:5].css",
      chunkFilename:"css/[id]-[hash:5].css"
    })
  ],
 }
};

 

module.exports = ()=>{
  // console.log("process.env.NODE_ENV====",process.env.NODE_ENV);
  let config = process.env.NODE_ENV === 'production'? productionConfig:developmentConfig;
  return merge(generateConfig(process.env.NODE_ENV),config);
}