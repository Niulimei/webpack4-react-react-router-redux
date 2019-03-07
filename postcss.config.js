module.exports = {
  plugins: [
    // css加私有前缀的功能
    require('autoprefixer')({
    browsers:['last 5 versions']
    })
  ]
}