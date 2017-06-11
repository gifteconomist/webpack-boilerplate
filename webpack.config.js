const resolve = require('path').resolve;

module.exports = function(env) {
  return {
    context: resolve('src'),
    entry: './entry.js',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/dist/',
    },
    devtool: env.prod ? 'source-map' : 'eval',
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'], exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                }
            }, {
                loader: "postcss-loader",
                options: {
                    plugins: function () {
                        return [autoprefixer]
                    }
                }
            }]
          })
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]',
          },
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              query: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
    ],
  }
}
