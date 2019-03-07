var webpack = require('webpack');
const path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode:'development',
  devtool:'inline-source-map',
  devServer:{
    contentBase:'./dist',
    // contentBase:path.join(__dirname,'dist'),
    // compress:true, // 一切服务都启用gzip压缩
    port:9000,
    // hot:true
  },

  plugins:[
    new htmlWebpackPlugin({
      // filename:'index.html',
      template:'index.html',
      inject: "body", // 将生成的js插入过html的body标签中
      // minify:{
      //   // 删除注释
      //     removeComments:true,
      //   //删除空格
      //     collapseWhitespace:true
      // }
    }),
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块，也被称为HMR；注意永远不要在生产环境下启用该选项
    new webpack.NamedChunksPlugin(), //  当开启HMR的时候使用该插件会显示模块的相对路径，建议用于开发环境
    // CleanWebpackPlugin 参数传入数组，其中每个元素是每次需要清空的文件目录
    // new CleanWebpackPlugin(["dist"])
  ]
}