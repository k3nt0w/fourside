import { actions } from '../actions'
import { ActionTypes } from '../types'

describe('clock/actions', () => {
  test('increment', () => {
    const result = actions.increment()
    const expected = {
      type: ActionTypes.INCREMENT,
      payload: {}
    }
    expect(result).toEqual(expected)
  })
})
