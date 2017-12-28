const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const paths = {
  public: path.resolve(__dirname, 'public'),
  src: path.resolve(__dirname, 'src')
}

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(paths.src, 'index.html'),
  filename: 'index.html',
  inject: 'body'
});

const config = {
  entry: path.join(paths.src, 'index.js'),
  output: {
    path: paths.public,
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 2323,
    hot: true,
    historyApiFallback: true,
    contentBase: paths.public
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { 
        test: /\.jsx$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" }, 
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader' },
      { test: /\.(woff|woff2|eot|otf|ttf)$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new UglifyJSPlugin()
  )
}

module.exports = config