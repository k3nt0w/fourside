import { contextBridge, ipcRenderer } from 'electron'
import log from 'electron-log'

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  ipcRendererOn: (channel: string, cb: (_: any) => void) => ipcRenderer.on(channel, cb),
  log
})

contextBridge.exposeInMainWorld('require', {
  json5: require('json5'),
  os: require('os')
})
