import { createSelector } from 'reselect'
import { RootState } from '@renderer/states/interfaces'
import { State } from './reducers'

const autoUpdaterSelector = (state: RootState): State => state.autoUpdater

const getMessage = createSelector(autoUpdaterSelector, (state: State) => state.message)

export const selectors = {
  getMessage
}
