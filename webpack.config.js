const path = require('path')
ExtractTextPlugin = require('extract-text-webpack-plugin')
UglifyPlugin = require('uglifyjs-webpack-plugin')
const dev = process.env.NODE_ENV === 'dev'

let config = {
  entry: ['./src/js/app.js', './src/css/app.css'],
  output: {
    path: path.resolve("./web/dist"),
    filename: "bundle.js"
  },
  watch: dev,
  devtool: dev ? "source-map" : false,
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["eslint-loader"],
      },
      {
        test: /\.js$/,
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
}

if (!dev) {
  config.plugins.push(new UglifyPlugin())
}

module.exports = config
