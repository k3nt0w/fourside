import { initialState, reducer } from '../reducers'
import { ActionTypes } from '../types'
import { factories } from '../factory'

describe('user/reducer', () => {
  test('initialState', () => {
    const state = undefined
    const action = {}
    const result = reducer(state, action as any)
    const expected = initialState
    expect(result).toEqual(expected)
  })

  test('INCREMENT', () => {
    const count = factories.countList[0]
    const state = { ...initialState, count }
    const action = {
      type: ActionTypes.INCREMENT,
      payload: {}
    }
    const result = reducer(state, action)
    const expected = { ...state, count: count + 1 }
    expect(result).toEqual(expected)
  })
})
