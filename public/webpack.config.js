const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const PAGE_TITLE = 'Space Studio';

module.exports = (env, self) => {
  let isProduction = self.hasOwnProperty('mode') ? ( self.mode === 'production' ) : true;
  let port = self.hasOwnProperty('port') ? self.port : 8080;

  if (isProduction) console.info('Webpack: Production mode'); else console.info('Webpack: Development mode');

  let config = {
    context: path.resolve(__dirname),
    entry: {
      app: './src/renderer.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[chunkhash].[name].js',
    },
    performance: {
      hints: isProduction ? 'warning' : false
    },
    devtool: isProduction ? 'source-map' : 'eval',
    devServer: {
      open: true,
      port: port,
      static: path.resolve(__dirname),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'space-studio': path.join(__dirname, '../src/export')
      }
    },
    module: {
      rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpe?g|png|gif|mtl|obj)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
            hash: 'sha512',
            digest: 'hex',
            name: '[path][name].[ext]',
            context: 'public/src'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }]
    },
    plugins: [
      new NodePolyfillPlugin(),
      new HtmlWebPackPlugin({
        title: PAGE_TITLE,
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body',
        production: isProduction
      })
    ],
    optimization: {
      minimize: isProduction,
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              minSize: 10000,
              reuseExistingChunk: true
          }
        }
      }
    }
  };

  if (isProduction) {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));
  }

  config.plugins.push(new webpack.DefinePlugin({
    isProduction: JSON.stringify(isProduction)
  }));

  return config;
};