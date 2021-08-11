export type Config = {
  environment: 'dev'
  logger: {
    level: 'debug'
    fileLevel: 'debug'
    fileNamePrefix: string
    fileNameFormat: string
    fileFormat: string
    maxFileSize: number
  }
  dateTime: {
    openingTime: {
      timezone: string
      start: string
      end: string
    }
    convertTimezone: {
      '+0900': string
    }
  }
}
