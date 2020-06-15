const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

/**
 *  @file
 *  Check .env files in order to manage
 *  stack accordingly to prod or dev stage
 * */
module.exports = env => {
  const basePath = path.join(__dirname) + '/.env';
  const envPath = basePath + '.' + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    mode: 'development',
    entry: {
      app: path.resolve(__dirname, 'src/main.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
      publicPath: 'http://localhost:9000/',
      chunkFilename: 'js/[id].[chunkhash].js',
    },
    devServer: {
      hot: true,
      open: true,
      port: 9000,
      contentBase: path.resolve(__dirname, 'dist'),
    },
    devtool: '#eval-source-map',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.s(c|a)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              // Requires sass-loader@^7.0.0
              options: {
                implementation: require('sass'),
                fiber: require('fibers'),
                indentedSyntax: true, // optional
              },
              // Requires sass-loader@^8.0.0
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers'),
                  indentedSyntax: true, // optional
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(s*)css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                outputPath: 'assets/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new VueLoaderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        favicon: './public/favicon.ico',
      }),
    ],
  };
};
