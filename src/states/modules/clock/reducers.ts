import { Reducer } from 'redux'
import { ActionsUnion } from '../../types'
import { actions } from './actions'
import { ActionTypes } from './types'

export type Actions = ActionsUnion<typeof actions>

export interface State {
  lastUpdate: number
  light: boolean
  count: number
}

export const initialState: State = {
  lastUpdate: 0,
  light: false,
  count: 0
}

export const reducer: Reducer<State, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.TICK:
      return {
        ...state,
        lastUpdate: action.payload.ts,
        light: !!action.payload.light
      }
    case ActionTypes.INCREMENT:
      return { ...state, count: state.count + 1 }
    case ActionTypes.DECREMENT:
      return { ...state, count: state.count - 1 }
    case ActionTypes.RESET:
      return { ...state, count: initialState.count }
    default:
      return state
  }
}
