import { Reducer } from 'redux'
import { ActionsUnion } from '@renderer/states/interfaces'
import { actions } from './actions'
import { actionTypes } from './action-types'

export type Actions = ActionsUnion<typeof actions>

export interface State {
  message: string
}

export const initialState: State = {
  message: ''
}

export const reducer: Reducer<State, Actions> = (state = initialState, action): State => {
  switch (action.type) {
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message
      }
    default:
      return state
  }
}
