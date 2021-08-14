declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg'

interface Window {
  electron: {
    ipcRenderer: any
    ipcRendererOn: any
    log: any
  }
}
