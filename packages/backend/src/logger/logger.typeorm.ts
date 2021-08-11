import { Logger } from './logger.service'
import { QueryRunner, Logger as TypeORMLogger } from 'typeorm'

export class QueryLogger implements TypeORMLogger {
  static init() {
    return new QueryLogger(new Logger())
  }

  constructor(private readonly logger: Logger) {}

  logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.logger.debug(this.queryRawer(query, parameters))
  }

  logQueryError(error: string, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.logger.error(this.queryRawer(query, parameters), error)
  }

  logQuerySlow(time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.logger.warn(`Time: ${time} | Query: ${this.queryRawer(query, parameters)}`)
  }

  logSchemaBuild(_message: string, _queryRunner?: QueryRunner) {
    return
  }
  logMigration(_message: string, _queryRunner?: QueryRunner) {
    return
  }

  log(level: 'log' | 'info' | 'warn', message: any, _queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.log(message)
        break
      case 'warn':
        this.logger.warn(message)
        break
    }
  }

  // RAW SQLを出力する
  private queryRawer(query: string, parameters?: any[]): string {
    if (!parameters) {
      return query
    }
    const copyParams = Array.from(parameters)
    return query.replace(/\?/g, () => copyParams.shift() || '?')
  }
}
