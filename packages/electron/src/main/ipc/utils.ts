import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Logger } from '@shared/logger'

export const ipcMainHandleWrapper = (
  channel: string,
  fn: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
) => {
  ipcMain.handle(channel, async (event: IpcMainInvokeEvent, ...args: any[]) => {
    Logger.info(channel)
    return fn(event, args[0]).catch((e: Error) => {
      return { errorMessage: e.message }
    })
  })
}
