import * as builder from 'electron-builder'

export const config: builder.Configuration = {
  productName: 'Fourside',
  appId: 'co.fourside',
  directories: {
    output: 'Fourside'
  },
  files: ['dist/**/*']
}
