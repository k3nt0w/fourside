import { ipcRendererOnWrapper } from './utils'
import { Store } from '@renderer/states'
import { autoUpdaterIpcMessagesOnReceived } from '@shared/ipc/auto-updater'
import { autoUpdaterActions } from '@renderer/states/modules/auto-updater'

export const registerIPCHandler = (store: Store) => {
  ipcRendererOnWrapper(store, autoUpdaterIpcMessagesOnReceived.CHECK_FOR_UPDATE, autoUpdaterActions.setMessage)

  ipcRendererOnWrapper(store, autoUpdaterIpcMessagesOnReceived.UPDATE_AVAILABLE, autoUpdaterActions.setMessage)

  ipcRendererOnWrapper(store, autoUpdaterIpcMessagesOnReceived.UPDATE_UNAVAILABLE, autoUpdaterActions.setMessage)

  ipcRendererOnWrapper(store, autoUpdaterIpcMessagesOnReceived.DOWNLOAD_PROGRESS, autoUpdaterActions.setMessage)

  ipcRendererOnWrapper(store, autoUpdaterIpcMessagesOnReceived.UPDATE_DOWNLOADED, autoUpdaterActions.setMessage)
}
