import { actionTypes } from './action-types'

export const actions = {
  setMessage: ({ message }: { message: string }) =>
    ({
      type: actionTypes.SET_MESSAGE,
      payload: { message }
    } as const)
}
