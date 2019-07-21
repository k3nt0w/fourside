import { RootState } from '../../../types'
import createStore from '../../../store'
import { selectors } from '../selectors'
import { factories } from '../factory'

const baseState: RootState = createStore().getState()

describe('user/selectors', () => {
  test('getList', () => {
    const state: RootState = baseState
    const expected = factories.countList[0]
    state.clock.count = expected
    const result = selectors.getCount(state)
    expect(result).toEqual(expected)
  })
})
