import { Reducer } from 'redux'
import { ActionsUnion } from 'src/renderer/states/interfaces'
import { actions } from './actions'
import { ActionTypes } from './action-types'

export type Actions = ActionsUnion<typeof actions>

export interface State {
  isLoading: boolean
}

export const initialState: State = {
  isLoading: false
}

export const reducer: Reducer<State, Actions> = (state = initialState, action): State => {
  switch (action.type) {
    case ActionTypes.SINGIN_REQUEST:
      return { ...state, isLoading: true }
    case ActionTypes.SINGIN_SUCCESS:
      return { ...state, isLoading: false }
    case ActionTypes.SINGIN_FAILURE:
      return { ...state, isLoading: false }

    default:
      return { ...state }
  }
}
