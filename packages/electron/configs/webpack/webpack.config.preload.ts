import path from 'path'
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

export default {
  mode,
  entry: ['./src/preload/index.ts'],

  output: {
    path: path.join(__dirname, '../..', 'dist'),
    filename: 'preload.js'
  },

  devtool: 'inline-source-map',
  target: 'electron13.1-preload',

  externals: {
    bindings: 'commonjs bindings'
  },

  node: {
    __dirname: false,
    __filename: false
  },

  resolve: {
    alias: {
      src: path.join(__dirname, '../..', 'src'),
      '@shared': path.join(__dirname, '../..', 'src/shared'),
      '@main': path.join(__dirname, '../..', 'src/main')
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json', '.node']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      DEPLOY_ENV: process.env.DEPLOY_ENV
    })
  ]
}
