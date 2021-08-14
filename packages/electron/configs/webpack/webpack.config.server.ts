import { Compiler } from 'webpack'
import { merge } from 'webpack-merge'
import { renderer } from './webpack.config'
import { spawn } from 'child_process'

const devRenderer = merge(
  {
    mode: 'development',
    entry: ['http://localhost:8080'],
    output: {
      publicPath: `http://localhost:8080/dist`,
      filename: '[name].js'
    },
    plugins: [
      {
        apply: (compiler: Compiler) => {
          compiler.hooks.initialize.tap('InitializePlugin', () => {
            spawn('electron', ['./dist/main.js'], {
              shell: true,
              env: process.env,
              stdio: 'inherit'
            })
              .on('close', code => {
                process.exit(code)
              })
              .on('error', spawnError => console.error(spawnError))
          })
        }
      }
    ]
  },
  renderer
)

export default [{ name: 'devRenderer', ...devRenderer }]
