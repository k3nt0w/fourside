import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : process.env.NODE_ENV === 'production' ? 'production' : 'none'

const GREEN = '\u001b[32m'
const COLOR_RESET = '\u001b[0m'

console.info(GREEN)
console.info(`webpack for main and renderer`)
console.info(`Webpack mode: ${mode}`)
console.info(`NODE ENV: ${process.env.NODE_ENV}`)
console.info(`DEPLOY_ENV: ${process.env.DEPLOY_ENV}`)
console.info(`Is this packaging?: ${process.env.PACKAGE ? true : false}`)
console.info(COLOR_RESET)

export const main: webpack.Configuration = {
  mode,
  entry: ['./src/main/index.ts'],

  output: {
    path: path.join(__dirname, '../..', 'dist'),
    filename: 'main.js',
  },

  devtool: 'inline-source-map',
  target: 'electron-main',

  externals: {
    bindings: 'commonjs bindings',
    'cfd-js': 'commonjs cfd-js',
    sqlite3: 'commonjs sqlite3',
    usb: 'commonjs usb',
    'usb-detection': 'commonjs usb-detection',
    grpc: 'require("grpc")',
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    alias: {
      src: path.join(__dirname, '../..', 'src'),
      '@shared': path.join(__dirname, '../..', 'src/shared'),
      '@main': path.join(__dirname, '../..', 'src/main'),
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json', '.node'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      DEPLOY_ENV: process.env.DEPLOY_ENV,
    }),
  ],
}

export const renderer: webpack.Configuration = {
  mode,
  entry: {
    renderer: './src/renderer/index.tsx',
  },

  output:
    !process.env.PACKAGE && (process.env.NODE_ENV == 'development' || process.env.DEPLOY_ENV == 'dev')
      ? {
          publicPath: `http://localhost:8080/dist`,
          filename: '[name].js',
        }
      : {
          path: path.join(__dirname, '../..', 'dist'),
          filename: '[name].js',
        },

  devtool: 'inline-source-map',
  target: 'electron-renderer',

  externals: {
    fsevents: 'require("fsevents")',
    worker_threads: 'require("worker_threads")',
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    alias: {
      src: path.join(__dirname, '../..', 'src'),
      '@renderer': path.join(__dirname, '../..', 'src/renderer'),
      '@shared': path.join(__dirname, '../..', 'src/shared'),
      '@main': path.join(__dirname, '../..', 'src/main'),
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    mainFields: ['module', 'main'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../..', 'src/renderer/index.html'),
      chunks: ['renderer'],
      filename: 'index.html',
    }),
    new webpack.EnvironmentPlugin({
      DEPLOY_ENV: process.env.DEPLOY_ENV,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(jpg|png|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
    ],
  },
}

export default [main, renderer]
