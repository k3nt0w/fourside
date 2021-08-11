import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DefaultNamingStrategy, Table, NamingStrategyInterface } from 'typeorm'
import { environment } from './environment'

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  foreignKeyName(tableOrName: Table | string, columnNames: string[], referencedTablePath?: string): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name
    const name = columnNames.reduce((name, column) => `${name}_${column}`, `${tableOrName}_${referencedTablePath}`)
    return `fk_${name}`
  }
}

const typeOrmOptions = ((): TypeOrmModuleOptions => {
  switch (environment.NODE_ENV) {
    case 'development':
      return {
        type: 'mysql',
        host: environment.DB_HOST,
        port: environment.DB_PORT,
        username: environment.DB_USER,
        password: environment.DB_PASSWORD,
        database: 'fourside',
        migrations: ['./**/migration/**/*.ts'],
        entities: ['./**/*.entity{.ts,.js}'],
        logging: environment.DB_DEBUG_LOG,
        keepConnectionAlive: true,
        cli: {
          migrationsDir: './src/migration'
        },
        namingStrategy: new CustomNamingStrategy()
      }
    case 'production':
      return {
        type: 'mysql',
        host: environment.DB_HOST,
        extra: {
          socketPath: environment.DB_HOST
        },
        username: environment.DB_USER,
        password: environment.DB_PASSWORD,
        database: 'fourside',
        logging: process.env.MIGRATION_ENV === 'ci' ? true : false,
        entities: process.env.MIGRATION_ENV === 'ci' ? ['./**/*.entity{.ts,.js}'] : ['./dist/**/*.entity{.ts,.js}'],
        keepConnectionAlive: true,
        migrations: process.env.MIGRATION_ENV === 'ci' ? ['./**/migration/**/*.ts'] : ['./dist/migration/**{.ts,.js}'],
        cli: {
          migrationsDir: process.env.MIGRATION_ENV === 'ci' ? './src/migration' : './dist/migration'
        },
        namingStrategy: new CustomNamingStrategy()
      }
    default:
      console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
      throw new Error('no match case')
  }
})()

export default typeOrmOptions
