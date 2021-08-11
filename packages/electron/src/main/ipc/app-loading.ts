import { ipcMain } from 'electron'
import { appLoading } from '@shared/ipc'
import { BrowserWindow } from 'electron'
import { Logger } from '@shared/logger'

export const registerAppLoadingIPCHandler = (mainWindow: BrowserWindow | null, loadingWindow: BrowserWindow) => {
  ipcMain.handle(appLoading.SHOW_MAIN_WINDOW, () => {
    Logger.info(appLoading.SHOW_MAIN_WINDOW)
    loadingWindow.hide()
    loadingWindow.close()
    if (mainWindow) {
      mainWindow.show()
    }
  })
}
