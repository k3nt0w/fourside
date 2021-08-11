import { Observable, from } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { ipcRenderer } from 'electron'
import { Logger } from '@shared/logger'
import { Store, RootAction } from '@renderer/states'

const retryable = (retryCount: number, func: Function) => {
  let promise = Promise.reject().catch(() => func())
  for (let i = 0; i < retryCount; i++) {
    promise = promise.catch(() => func())
  }
  return promise
}

export const ipcRendererInvokeWrapper =
  <P extends any[], R>(channel: string, needRetry = true) =>
  (params: P): Observable<R> =>
    from(
      needRetry ? retryable(3, () => ipcRenderer.invoke(channel, ...params)) : ipcRenderer.invoke(channel, ...params)
    ).pipe(
      tap(_ => Logger.info(channel)),
      map(({ errorMessage, errorObj, ...result }) => {
        if (errorObj) {
          Logger.error(errorObj)
        } else if (errorMessage) {
          Logger.error(errorMessage)
          throw new Error(errorMessage)
        } else {
          return result
        }
      })
    )

export const ipcRendererOnWrapper = <T>(store: Store, channel: string, actionCreator: (...args: T[]) => RootAction) => {
  ipcRenderer.on(channel, (_: Electron.IpcRendererEvent, ...params: any[]) => {
    Logger.info(`ipcRendererOnWrapper: ${channel}`)
    store.dispatch(actionCreator(...params))
  })
}
