import { accountIpcMessages } from '@shared/ipc'
import { accountService } from '@main/service/account'
import { ipcMainHandleWrapper } from './utils'

export const registerAccountIPCHandler = () => {
  ipcMainHandleWrapper(accountIpcMessages.LOGIN, async (_, ...args: any): Promise<any> => accountService.login(args[0]))
}
