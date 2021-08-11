import { registerAccountIPCHandler } from './account'
import { BrowserWindow, WebContents } from 'electron'
import { registerCommonIPCHandler } from './common'

export const registerIPCHandler = (webContents: WebContents, mainWindow: BrowserWindow | null) => {
  registerAccountIPCHandler()
  registerCommonIPCHandler(mainWindow)
}
