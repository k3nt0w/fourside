import log from 'electron-log'
import { config } from '@shared/config'
import { datetime } from '@shared/fixtures'

const LEVEL = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  LOG: 4,
  DEBUG: 5
}

export const Logger = new (class Logger {
  private logger: typeof log
  private logLevel: number

  constructor() {
    const {
      logger: { level, fileNameFormat, fileFormat, maxFileSize, fileNamePrefix }
    } = config
    if (process.env.DEPLOY_ENV !== 'local') {
      log.transports.console.level = false
    }
    log.transports.file.fileName = `${fileNamePrefix}${datetime.now().format(fileNameFormat)}.log`
    log.transports.file.maxSize = maxFileSize
    log.transports.file.sync = false
    log.transports.file.format = fileFormat
    log.transports.console.format = fileFormat
    this.logger = log

    if (level.toUpperCase() in LEVEL) {
      this.logLevel = LEVEL[level.toUpperCase() as keyof typeof LEVEL]
    } else {
      this.logLevel = LEVEL.DEBUG
    }
  }

  public debug = (data: any) => {
    if (this.logLevel >= LEVEL.DEBUG) {
      this.logger.debug(data)
    }
  }

  public log = (data: any) => {
    if (this.logLevel >= LEVEL.LOG) {
      this.logger.log(data)
    }
  }

  public info = (data: any) => {
    if (this.logLevel >= LEVEL.INFO) {
      this.logger.info(data)
    }
  }

  public warn = (data: any) => {
    if (this.logLevel >= LEVEL.WARN) {
      this.logger.warn(data)
    }
  }

  public error = (data: any) => {
    if (this.logLevel >= LEVEL.ERROR) {
      this.logger.error(data)
    }
  }
})()
