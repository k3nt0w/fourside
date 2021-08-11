import { createSelector } from 'reselect'
import { RootState } from 'src/renderer/states/interfaces'
import { State } from './reducers'

const authSelector = (state: RootState): State => state.auth

const getIsLoading = createSelector(authSelector, (state: State): boolean => state.isLoading)

export const selectors = {
  getIsLoading
}
