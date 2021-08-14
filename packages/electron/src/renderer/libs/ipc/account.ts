import { accountIpcMessages } from '@shared/ipc'
import { ipcRendererInvokeWrapper } from './utils'

export const loginIpc = ipcRendererInvokeWrapper(accountIpcMessages.LOGIN)
