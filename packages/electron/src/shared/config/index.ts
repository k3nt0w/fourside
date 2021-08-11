import { devConfig } from './dev'

const getConfig = () => {
  switch (process.env.DEPLOY_ENV) {
    case 'dev':
    default:
      return devConfig
  }
}

export const config = getConfig()
