import { actions } from './actions'
import { operations } from './operations'
import { Actions, initialState, reducer, State } from './reducers'
import { selectors } from './selectors'
import { ActionTypes } from './types'

export type Actions = Actions
export type State = State

export {
  initialState,
  ActionTypes as ClockActionTypes,
  actions as clockActions,
  operations as clockOperations,
  selectors as clockSelectors
}
export default reducer
