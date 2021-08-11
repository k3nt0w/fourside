import { ipcMain } from 'electron'
import { commonIpcMessages } from '@shared/ipc'
import { BrowserWindow } from 'electron'
import { Logger } from '@shared/logger'

export const registerCommonIPCHandler = (mainWindow: BrowserWindow | null) => {
  ipcMain.handle(commonIpcMessages.SHOW_MAIN_WINDOW, () => {
    Logger.info(commonIpcMessages.SHOW_MAIN_WINDOW)
    if (mainWindow) {
      mainWindow.show()
    }
  })
}
