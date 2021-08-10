import webpack from 'webpack'
import { merge } from 'webpack-merge'
import { renderer } from './webpack.config'

const publicPath = `http://localhost:8080/dist`

export default merge(
  {
    mode: 'development',
    entry: ['react-hot-loader/patch', `webpack-dev-server/client?http://localhost:8080`, 'webpack/hot/only-dev-server'],

    output: {
      publicPath,
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],

    devtool: 'inline-source-map',

    //@ts-ignore
    devServer: {
      port: 8081,
      historyApiFallback: true,
    },
  },
  renderer
)
