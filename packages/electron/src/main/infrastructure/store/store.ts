import Store from 'electron-store'
import { config } from '@shared/config'

export const store = new Store({
  name: `${config.environment}.config`
})
