const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const TersetJSPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    entry: {
      app: path.resolve(__dirname, 'src/main.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[id].[chunkhash].js',
    },
    optimization: {
      minimizer: [new TersetJSPlugin(), new OptimizeCSSAssetsPlugin()],
    },
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
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[hash].[ext]',
              outputPath: 'assets',
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new webpack.DllReferencePlugin({
        manifest: require('./modules-manifest.json'),
      }),
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, 'dist/js/*.dll.js'),
        outputPath: 'js',
        publicPath: 'js',
      }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/app.*'],
      }),
    ],
  };
};
