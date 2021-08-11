import * as winston from 'winston'
import { LoggerService } from '@nestjs/common'
import { LoggingWinston } from '@google-cloud/logging-winston'
import { environment } from '../environment'

const loggingWinston = new LoggingWinston()

// https://github.com/winstonjs/winston
export class Logger implements LoggerService {
  logger: winston.Logger

  constructor() {
    const transports: winston.transport[] = []
    if (environment.ENABLED_STACKDRIVER) {
      transports.push(loggingWinston)
    } else {
      transports.push(
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        })
      )
    }
    transports.push()
    const logger = winston.createLogger({ transports })

    this.logger = logger
  }

  log(message: string) {
    this.logger.log({
      level: 'info',
      message: `${message}`
    })
  }

  error(_: string, trace: string) {
    this.logger.log({
      level: 'error',
      message: `${trace}`
    })
  }

  warn(message: string) {
    this.logger.log({
      level: 'warn',
      message: `WARNING: ${message}`
    })
  }

  debug(message: string) {
    this.logger.log({
      level: 'debug',
      message: `${message}`
    })
  }

  verbose(message: string) {
    this.logger.log({
      level: 'verbose',
      message: `${message}`
    })
  }
}
