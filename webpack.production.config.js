
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/pages');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    jobList: path.resolve(APP_PATH, 'jobList.js'),
    vendors: ['zepto', 'lodash']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].js'
  },
  resolve: {
    alias: {

    }
  },
  
  
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: APP_PATH,
        loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style?sourceMap', 'css?sourceMap'],
      },
      {
        test: /\.(gif|png|jpg)$/,
        loader: 'url?limit=40'
      },
       //处理html模板
	    {
	        test: /\.html$/,
	        loader: 'html-loader',
	        include: APP_PATH
	    },
	    //处理zepto的commonjs规范兼容
	    {
	      test: require.resolve('zepto'),
	      loader: 'exports-loader?window.Zepto!script-loader'
	    },
	    {
	      test: require.resolve('./app/js/swipe.js'),
	      loader: 'exports-loader?window.Swipe!script-loader'
	    }
    ] 
  },

  //custom jshint options
  // any jshint option http://www.jshint.com/docs/options/
  jshint: {
    "esnext": true
  },

  plugins: [
  //enable uglify
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlwebpackPlugin({
      title: '首页',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: '职位列表',
      template: path.resolve(TEM_PATH, 'jobList.html'),
      filename: 'jobList.html',
      chunks: ['jobList', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: '找工作',
      template: path.resolve(TEM_PATH, 'searchJob.html'),
      filename: 'searchJob.html',
      chunks: ['searchJob', 'vendors'],
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    //provide $, jQuery and window.jQuery to every script
    /*new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })*/
  ]
};
