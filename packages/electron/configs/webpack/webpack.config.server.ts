import webpack from 'webpack'
import { merge } from 'webpack-merge'
import { main, preload, renderer } from './webpack.config'

const devRenderer = merge(
  {
    mode: 'development',
    entry: ['react-hot-loader/patch', `webpack-dev-server/client?http://localhost:8080`, 'webpack/hot/only-dev-server'],
    output: {
      publicPath: `http://localhost:8080/dist`,
      filename: '[name].js'
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  },
  renderer
)

export default [
  { name: 'main', ...main },
  { name: 'preload', ...preload },
  { name: 'devRenderer', ...devRenderer }
]
