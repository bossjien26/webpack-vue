const path = require("path");
var glob = require('glob');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin'); // 宣告使用插件
// const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

var config = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    // contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      node_modules: __dirname + '/node_modules'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({ // 打包HTML
      template: '/public/index.html'
    }),
    new Dotenv(),
    // new CopyPlugin([
    //   { from: './src/assets/images', to: 'image' },
    //   { from: './src/assets/style', to: 'css' }
    // ])
  ]
}
module.exports = config