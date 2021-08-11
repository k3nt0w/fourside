import { accountIpcMessages, AccountLoginArguments, AccountLoginResult } from '@shared/ipc'
import { ipcRendererInvokeWrapper } from './utils'

export const loginIpc = ipcRendererInvokeWrapper<AccountLoginArguments, AccountLoginResult>(
  accountIpcMessages.LOGIN,
  false
)
