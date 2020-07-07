const webpack = require('webpack');

const commonPaths = require('./paths');

console.log(commonPaths.root + "/src/" + commonPaths.imagesFolder)

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js',
  },
  module: {
      rules: [{
              test: require('path').resolve('node_modules/leader-line/'),
              use: [{
                loader: 'skeleton-loader',
                options: {procedure: content => `${content}export default LeaderLine`}
              }]
          },{
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader']
          }, {
              test: /\.scss$/,
              use: [{
                  loader: "style-loader" // creates style nodes from JS strings
              }, {
                  loader: "css-loader" // translates CSS into CommonJS
              }, {
                  loader: "sass-loader" // compiles Sass to CSS
              }]
          }, {
              test: /\.css$/, loader: "style-loader!css-loader"
          }, {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                include: `${commonPaths.root}"/src/"${commonPaths.imagesFolder}`
        }]
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
