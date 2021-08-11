import { applyMiddleware, combineReducers, createStore, AnyAction, compose } from 'redux'

import thunk, { ThunkMiddleware } from 'redux-thunk'

import { default as auth } from './modules/auth'
import { connectedReactRouter, default as router } from './modules/router'
import { default as autoUpdater } from './modules/auto-updater'

import { RootAction, RootState, Store } from './interfaces'

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initializeStore = (preloadedState?: RootState): Store => {
  const appReducer = combineReducers<RootState>({
    auth,
    autoUpdater,
    router
  })

  const rootReducer: typeof appReducer = (state: RootState | undefined, action: AnyAction): RootState => {
    return appReducer(state, action)
  }

  const middleware = [connectedReactRouter, thunk as ThunkMiddleware<RootState, RootAction>]
  const store = createStore<RootState, RootAction, {}, {}>(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  )
  return store
}
