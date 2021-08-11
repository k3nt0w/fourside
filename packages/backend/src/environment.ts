import { cleanEnv, str, bool, num } from 'envalid'

export const environment = cleanEnv(process.env, {
  NODE_ENV: str(),
  GOOGLE_PROJECT_ID: str(),
  GOOGLE_APPLICATION_CREDENTIALS: str(),
  TEMP_DIR: str(),
  ENABLED_STACKDRIVER: bool(),
  DB_HOST: str(),
  DB_PORT: num(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  PORT: num({ default: 3001 }),
  DB_DEBUG_LOG: bool({ default: true })
})
