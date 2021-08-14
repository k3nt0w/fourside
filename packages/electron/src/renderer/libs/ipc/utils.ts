// import { Logger } from 'src/renderer/libs/electron'
import { Store, RootAction } from '@renderer/states'
import { ipcRenderer } from 'src/renderer/libs/electron'

export const ipcRendererInvokeWrapper = (channel: string) => ipcRenderer.invoke(channel)

export const ipcRendererOnWrapper = <T>(store: Store, channel: string, actionCreator: (...args: T[]) => RootAction) => {
  ipcRenderer.on(channel, (_: Electron.IpcRendererEvent, ...params: any[]) => {
    // Logger.info(`ipcRendererOnWrapper: ${channel}`)
    store.dispatch(actionCreator(...params))
  })
}
