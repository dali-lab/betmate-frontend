var path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
// set to 'production' or 'development' in your env

const finalCSSLoader = (env === 'production') ? MiniCssExtractPlugin.loader : { loader: 'style-loader' };
const autoprefixer = require('autoprefixer');
const { DefinePlugin } = require('webpack');

module.exports = {
  mode: env,
  output: { publicPath: '/' },
  entry: ['./src'], // this is where our app lives
  devtool: 'source-map', // this enables debugging with source in chrome devtools
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ],
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.ts$/, /\.tsx$/],
        exclude: [/node_modules/, /dist/],
        use: [
          { loader: 'ts-loader' },
          { loader: 'eslint-loader' },
        ],
      },
      { test: /\.m?js/, resolve: { fullySpecified: false } },
      {
        test: /\.s?css/,
        use: [
          finalCSSLoader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/logo.svg'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './200.html',
    }),
    new DefinePlugin({
      'process.env': {
        TARGET_ENV: JSON.stringify(process.env.TARGET_ENV),
      },
    }),
    autoprefixer,
  ],
  devServer: {
    hot: true,
    historyApiFallback: true
  },
};
