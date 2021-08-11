import { Config } from './type'

export const devConfig: Config = {
  environment: 'dev',
  logger: {
    level: 'debug',
    fileLevel: 'debug',
    fileNamePrefix: 'fourside.dev_',
    fileNameFormat: 'YYYY-MM-DD',
    fileFormat: '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{processType}] [{level}] {text}',
    maxFileSize: 1073741824
  },
  dateTime: {
    openingTime: {
      timezone: 'Asia/Tokyo',
      start: '080000',
      end: '061000'
    },
    convertTimezone: {
      '+0900': 'JST'
    }
  }
}
