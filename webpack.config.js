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
      loaders: [
        {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/},
        {test: /\.scss$/, loaders: ['style-loader', 'css-loader']},
      ],
    },
  }
}
