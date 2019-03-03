var merge = require('webpack-merge');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
const productionConfig = require('./webpack.pro.config.js'); // 引入生产环境配置文件
const developmentConfig = require('./webpack.dev.config.js'); // 引入开发环境配置文件

/**
 * 根据不同的环境，生成不同的配置
 * @param{String} env 'devlopment' or 'production'
 */

 const generateConfig = env =>{

 return {
  entry:'./src/app.js',
  
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'js/[name].bundle.js',
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
          'style-loader',
          { loader:'css-loader',options:{importLoaders:1}},
          'postcss-loader',
        ]
      },
      { 
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
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
            limit:200000, // 表示小于50kb的图片转为base64,大于50kb的是路径
            outputPath:'images' //定义输出的图片文件夹
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
  ]
 }
};

 

module.exports = ()=>{
  // console.log("process.env.NODE_ENV====",process.env.NODE_ENV);
  let config = process.env.NODE_ENV === 'production'? productionConfig:developmentConfig;
  return merge(generateConfig(process.env.NODE_ENV),config);
}