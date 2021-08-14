import { App, app, BrowserWindow, ipcMain, globalShortcut, Menu, dialog } from 'electron'
import { version } from '../../package.json'
import { registerIPCHandler } from './ipc'
import { Logger } from '@shared/logger'
import { registerAutoUpdater } from './auto-updater'
import { appLoadingOnReceived } from '@shared/ipc/app-loading'
import { registerAppLoadingIPCHandler } from './ipc/app-loading'
import { isDevNodeEnv, isDevWithoutAutoUpdateDeployEnv, isLocalDeployEnv } from '@shared/utils'
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'

if (isLocalDeployEnv || isDevNodeEnv || process.env.WITH_DEV_TOOL) {
  app.whenReady().then(() => {
    installExtension(REDUX_DEVTOOLS, { loadExtensionOptions: { allowFileAccess: true } })
      .then(name => Logger.info(`Added Extension:  ${name}`))
      .catch(err => console.error('An error occurred: ', err))
  })
}

class Main {
  private mainWindow: BrowserWindow | null = null
  private loadingWindow: BrowserWindow | null = null
  private app: App
  private forceQuit = false

  private mainURL = `file://${__dirname}/index.html`
  private loadingURL = `file://${__dirname}/loading.html`

  public constructor(app: App) {
    this.app = app
    this.app.allowRendererProcessReuse = true
    this.app.on('window-all-closed', () => {
      Logger.info('event(electron): window-all-closed')
      this.app.quit()
    })
    this.app.on('before-quit', async (e: Event) => {
      Logger.info('event(electron): before-quit')
      if (process.platform === 'darwin') {
        await this.confirmAndQuitMac(e)
      }
    })
    this.app.on('ready', async () => {
      Logger.info('event(electron): ready')
      await this.onReady()
    })
    this.app.on('activate', this.onActivated.bind(this))
    this.app.on('quit', async () => {
      Logger.info('event(electron): quit start')
      await this.onQuit()
      Logger.info('event(electron): quit end')
      return
    })
    this.app.setAboutPanelOptions({
      applicationName: 'Fourside',
      applicationVersion: `App Version: ${version}`
    })
    this.app.setAppUserModelId('Fourside')
  }

  private async onQuit() {}

  private create() {
    Logger.info('electron: create')
    globalShortcut.register('CommandOrControl+R', () => false)
    const BACKGROUND_COLOR = '#303855'
    this.loadingWindow = new BrowserWindow({
      width: 600,
      height: 600,
      minWidth: 600,
      minHeight: 600,
      maxWidth: 800,
      maxHeight: 800,
      acceptFirstMouse: true,
      frame: false,
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true
      },
      show: false
    })
    this.mainWindow = new BrowserWindow({
      width: 1500,
      height: 800,
      minWidth: 1280,
      minHeight: 800,
      acceptFirstMouse: true,
      frame: true,
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true
      },
      show: false
    })
    const main = this.mainWindow
    const loading = this.loadingWindow

    loading.setBackgroundColor(BACKGROUND_COLOR)
    main.setBackgroundColor(BACKGROUND_COLOR)

    loading.loadURL(this.loadingURL)
    main.loadURL(this.mainURL)

    registerIPCHandler(main.webContents, main)
    registerAppLoadingIPCHandler(main, loading)

    // NOTE:
    // reactが読み込まれる前にipcが発火するとrendererでmessageを受け取れないので、
    // loading windowのreactが読み込まれてからwindowを表示させauto-updaterの処理を仕込む
    loading.webContents.once('dom-ready', () => {
      loading.show()
      if (isDevWithoutAutoUpdateDeployEnv) {
        // NOTE:
        // dev-without-autoupdate環境のアプリケーションは特定のバージョンで動作確認をしたいため
        // auto-updateの処理は行わず完了のIPCのみをrendererへ送信する
        loading.webContents.send(appLoadingOnReceived.COMPLETED_CHECKING_UPDATE)
      } else {
        registerAutoUpdater(loading.webContents, main)
      }
    })

    main.webContents.once('dom-ready', () => {
      loading.webContents.send(appLoadingOnReceived.COMPLETED_LOADING_MAIN_WINDOW_DOM)
    })

    ipcMain.on('quit-app', () => {
      Logger.info('ipcon(main): quit-app')
      this.app.quit()
    })

    main.on('close', (e: Event) => {
      Logger.info('event(main window): close')
      if (process.platform === 'darwin') {
        // NOTE:
        // macOSではcloseボタン押下してもアプリケーションは終了しない。
        // そのため、hideの処理をMenuから行いcloseのイベントはpreventDefaultしている。
        // また「cmd + Q」の強制終了の際はforceQuitフラグをtrueにすることで、
        // このpreventDefaultが発火しないように制御している。
        if (!this.forceQuit) {
          Menu.sendActionToFirstResponder('hide:')
          e.preventDefault()
        }
      } else {
        Logger.info('windows event: close')
        this.confirmAndQuitWindows(e)
      }
    })

    // Create the Application's main menu
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: 'Application',
        submenu: [
          {
            label: 'About Application',
            role: 'about'
          },
          { type: 'separator' },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            role: 'quit'
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [{ role: 'undo' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }]
      },
      {
        label: 'View',
        submenu: [
          {
            accelerator: 'CmdOrCtrl+Alt+I',
            label: 'Open DevTools',
            role: 'toggleDevTools'
          }
        ]
      },
      {
        label: 'Window',
        submenu: [{ role: 'minimize' }, { role: 'zoom' }]
      }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }

  private async onReady() {
    this.create()
  }

  private onActivated() {
    if (this.mainWindow === null) {
      this.create()
    }
  }

  // NOTE
  // windowsとmacではeventの扱われ方が根本的に異なっている。
  // windowsでcloseボタン押下時にconfirmを挟む場合、
  // 一度そのeventをpreventDefaultしてあげないとあげないと処理が進んでしまう。
  // これらを差異は無理にひとつの関数にまとめるよりOSごとに関数を分けてしまった方が見通しがよくなるため関数ごと分けている。
  private messageBoxOptions = {
    type: 'question',
    buttons: ['Quit', 'Cancel'],
    title: 'This will quit the app',
    message: 'Are you sure you want to quit?'
  }
  private async confirmAndQuitMac(e: Event) {
    Logger.info('confirm and quit mac')
    if (this.mainWindow?.isVisible()) {
      const { response } = await dialog.showMessageBox(null as any, this.messageBoxOptions)
      if (response == 1) {
        e.preventDefault()
      } else {
        this.forceQuit = true
      }
    } else {
      this.forceQuit = true
    }
  }

  private async confirmAndQuitWindows(e: Event) {
    // NOTE
    // windowsのauto-update中にconfirmが入ってしまうと自動更新に失敗してしまうので、
    // MainWindowがvisible状態になってからConfirm Dialogが出るようにする。
    if (this.mainWindow?.isVisible()) {
      if (!this.forceQuit) {
        e.preventDefault()
        const { response } = await dialog.showMessageBox(null as any, this.messageBoxOptions)
        if (response == 0) {
          this.forceQuit = true
          this.app.quit()
        }
      }
    }
  }
}

process.on('uncaughtException', function (err) {
  Logger.error('electron:event:uncaughtException')
  Logger.error(err)
  Logger.error(err.stack)
  app.quit()
})

Logger.info('electron: boot')
export const main: Main = new Main(app)
