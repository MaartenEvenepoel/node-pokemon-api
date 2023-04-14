// Load environment
import * as dotenv from 'dotenv-safe'
dotenv.config()

interface Config {
  API_PORT: string
  DB_TYPE: string
  DB_HOST: string
  DB_PORT: number
  DB_USER: string
  DB_PASSWORD: string
  DB_NAME: string
  DB_MIGRATIONS: string
}

export const config: Config = {
  API_PORT: process.env.API_PORT as string,
  DB_TYPE: process.env.DB_TYPE as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: parseInt(process.env.DB_PORT as string),
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_NAME: process.env.DB_NAME as string,
  DB_MIGRATIONS: process.env.DB_MIGRATIONS as string
}
