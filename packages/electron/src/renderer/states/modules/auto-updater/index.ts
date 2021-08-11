import { actions } from './actions'
import { Actions, initialState, reducer, State } from './reducers'
import { selectors } from './selectors'
import { actionTypes } from './action-types'

export {
  Actions,
  initialState,
  State,
  actionTypes as autoUpdaterActionTypes,
  actions as autoUpdaterActions,
  selectors as autoUpdaterSelectors
}

export default reducer
