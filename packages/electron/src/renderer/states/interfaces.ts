import { ActionCreator, Store as BaseStore } from 'redux'
import { ThunkAction as ReduxThunkAction, ThunkDispatch } from 'redux-thunk'

import * as auth from './modules/auth'
import * as router from './modules/router'
import * as autoUpdater from './modules/auto-updater'

export interface RootState {
  router: router.State
  auth: auth.State
  autoUpdater: autoUpdater.State
}

export type RootAction = auth.Actions | autoUpdater.Actions | router.Actions

type ReduxStore = BaseStore<RootState, RootAction>

export interface Store extends ReduxStore {
  dispatch: ThunkDispatch<RootState, undefined, RootAction>
}

export type ThunkAction = ReduxThunkAction<Promise<any> | void, RootState, undefined, RootAction>

export type Operation = ActionCreator<ThunkAction>

type ValueOf<T> = T[keyof T]
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : never
}
export type ActionsUnion<T> = ValueOf<ReturnTypes<T>>
