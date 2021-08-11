import { autoUpdaterIpcMessagesOnReceived } from '@shared/ipc/auto-updater'
import { Logger } from '@shared/logger'
import { BrowserWindow, WebContents } from 'electron'
import { autoUpdater } from 'electron-updater'
import { ProgressInfo, UpdateInfo } from 'builder-util-runtime'
import { AutoUpdateMessage, AutoUpdateMessageNumber } from '@shared/interfaces'
import { appLoadingOnReceived } from '@shared/ipc'

export function registerAutoUpdater(webContents: WebContents, mainWindow: BrowserWindow | null): void {
  autoUpdater.logger = Logger

  autoUpdater.on('checking-for-update', () => {
    Logger.info('auto-updater: checking-for-update')
    webContents.send(autoUpdaterIpcMessagesOnReceived.CHECK_FOR_UPDATE, {
      message: 'Checking software version ...'
    } as AutoUpdateMessage)
  })

  autoUpdater.on('update-available', (info: UpdateInfo) => {
    Logger.info('auto-updater: update-available')
    webContents.send(autoUpdaterIpcMessagesOnReceived.UPDATE_AVAILABLE, {
      message: `update available ${info.releaseName}`
    } as AutoUpdateMessage)
  })

  autoUpdater.on('update-not-available', (info: UpdateInfo) => {
    Logger.info('auto-updater: update-not-available')
    webContents.send(autoUpdaterIpcMessagesOnReceived.UPDATE_UNAVAILABLE, {
      message: `update not available ${info.releaseName}`
    } as AutoUpdateMessage)
    webContents.send(appLoadingOnReceived.COMPLETED_CHECKING_UPDATE)
  })

  autoUpdater.on('update-downloaded', () => {
    Logger.info('auto-updater: update downloaded')
    if (mainWindow) {
      mainWindow.close()
      mainWindow = null
    }
    autoUpdater.quitAndInstall()
  })

  autoUpdater.on('download-progress', (info: ProgressInfo) => {
    Logger.info(`auto-updater: download-progress ${info.percent} %`)

    // 表示用メッセージ
    webContents.send(autoUpdaterIpcMessagesOnReceived.DOWNLOAD_PROGRESS, {
      message: `Downloading latest version ...`
    } as AutoUpdateMessage)

    // 進捗表示用の progress bar に使う値。メッセージとは分けて利用したいため、別のイベントで送出する
    webContents.send(autoUpdaterIpcMessagesOnReceived.DOWNLOAD_PROGRESS_PERSENTAGE, {
      message: info.percent
    } as AutoUpdateMessageNumber)
  })

  autoUpdater.on('error', err => {
    Logger.info('auto-updater: error')
    Logger.error(err)
    webContents.send(autoUpdaterIpcMessagesOnReceived.UPDATE_DOWNLOADED, {
      message: `Some error occurred while checking the update.`
    } as AutoUpdateMessage)
    // エラーになった場合もアプリは起動させるために'COMPLETED_CHECKING_UPDATE'を発火させる
    webContents.send(appLoadingOnReceived.COMPLETED_CHECKING_UPDATE)
  })

  // NOTE: あまりにも早く loading window内のmessageが切り替わると違和感があるので待機させる
  setTimeout(() => {
    autoUpdater.checkForUpdatesAndNotify()
  }, 3000)
}
