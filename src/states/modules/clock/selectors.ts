import { createSelector } from 'reselect'
import { RootState } from '../../types'
import { State } from './reducers'

const clockSelector = (state: RootState): State => state.clock

const getCount = createSelector(
  clockSelector,
  (state: State): number => state.count
)

const getLastUpdate = createSelector(
  clockSelector,
  (state: State): number => state.lastUpdate
)

const getLight = createSelector(
  clockSelector,
  (state: State): boolean => state.light
)

export const selectors = {
  getCount,
  getLastUpdate,
  getLight
}
