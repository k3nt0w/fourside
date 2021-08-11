import { accountIpcMessages, AccountLoginArguments, AccountLoginResult } from '@shared/ipc'
import { accountService } from '@main/service/account'
import { ipcMainHandleWrapper } from './utils'

export const registerAccountIPCHandler = () => {
  ipcMainHandleWrapper(
    accountIpcMessages.LOGIN,
    async (_, ...args: AccountLoginArguments): Promise<AccountLoginResult> => accountService.login(args[0])
  )
}
