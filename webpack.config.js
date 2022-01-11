const path = require("path");
var glob = require('glob');
const { VueLoaderPlugin } = require('vue-loader')
var HtmlWebpackPlugin = require('html-webpack-plugin');
let fs = require('fs');

// 
var getEntry = function (globPath) {
  var entries = {
    // vendor: ['jquery', 'react', 'react-dom', './src/app'] // 类库
  };
  glob.sync(globPath).forEach(function (entry) {
    if (entry.split('/').splice(-2)[0] == "index") {
      entries['index'] = [entry];
    } else {
      var pathname = entry.split('/').splice(-2).join('/').split('.')[0];
      entries[pathname] = [entry];
    }

  });
  console.log(entries);
  return entries;
};
var isProduction = process.env.NODE_ENV === 'production';
var entries = getEntry('./src/view/*/*.js');
var chunks = Object.keys(entries);

module.exports = {
  mode: 'development',
  entry: entries,
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
      }
    ]
  },
  // Where to compile the bundle
  // By default the output directory is `dist`
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      watch: true,
    },
    port: 3000,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      node_modules: __dirname + '/node_modules'
    }
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
}

// const header = fs.readFileSync('./src/view/layout/header.html');
const footer = fs.readFileSync('./src/view/layout/footer.html');

// 生成HTML文件
chunks.forEach(function (pathname) {
  if (pathname == 'vendor') {
    return;
  }
  var conf = {
    title: 'My App',
    filename: isProduction ? '../view/' + pathname + '.html' : pathname + '.html',
    template: './public/index.html',
    inject: 'body',
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    // header:header,
    footer:footer
  };
  if (pathname in module.exports.entry) {
    conf.chunks = ['vendor', pathname];
    conf.hash = false;
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});

