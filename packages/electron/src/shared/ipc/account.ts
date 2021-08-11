import { User } from '@shared/models'

export const accountIpcMessages = {
  LOGIN: '@ipc/ACCOUNT_LOGIN'
} as const

export type AccountLoginArguments = [
  {
    email: string
    password: string
  }
]

export type AccountLoginResult = {
  user: User
}
