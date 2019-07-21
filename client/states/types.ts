import { ActionCreator, Store } from 'redux'
import { ThunkAction as ReduxThunkAction, ThunkDispatch } from 'redux-thunk'

import * as clock from './modules/clock'

export interface RootState {
  clock: clock.State
}

export type RootAction = clock.Actions

type ReduxStore = Store<RootState, RootAction>

export interface Store extends ReduxStore {
  dispatch: ThunkDispatch<RootState, undefined, RootAction>
}

export type ThunkAction = ReduxThunkAction<
  Promise<any> | void,
  RootState,
  undefined,
  RootAction
>

export type Operation = ActionCreator<ThunkAction>

type ValueOf<T> = T[keyof T]
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never
}
export type ActionsUnion<T> = ValueOf<ReturnTypes<T>>
