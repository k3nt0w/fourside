import { ActionTypes } from './types'

export const actions = {
  serverRender: () => ({
    type: ActionTypes.TICK,
    payload: { light: false, ts: Date.now() }
  }),

  start: () => ({
    type: ActionTypes.TICK,
    payload: { light: true, ts: Date.now() }
  }),

  increment: () => ({
    type: ActionTypes.INCREMENT,
    payload: {}
  }),

  decrement: () => ({
    type: ActionTypes.DECREMENT,
    payload: {}
  }),

  reset: () => ({
    type: ActionTypes.RESET,
    payload: {}
  })
}
