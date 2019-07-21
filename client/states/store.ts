import {
  applyMiddleware,
  combineReducers,
  createStore,
  DeepPartial
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'

import { default as clock } from './modules/clock'
import { RootAction, RootState, Store } from './types'

export default (preloadedState?: DeepPartial<RootState>): Store => {
  const reducer = combineReducers<RootState>({
    clock
  })
  const middleware = [thunk as ThunkMiddleware<RootState, RootAction>]
  const enhancer = composeWithDevTools(applyMiddleware(...middleware))

  return createStore<RootState, RootAction, {}, {}>(
    reducer,
    preloadedState,
    enhancer
  )
}
