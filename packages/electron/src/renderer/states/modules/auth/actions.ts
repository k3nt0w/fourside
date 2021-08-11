import { ActionTypes } from './action-types'

export const actions = {
  signinRequest: () =>
    ({
      type: ActionTypes.SINGIN_REQUEST,
      payload: {}
    } as const),

  signinSuccess: () =>
    ({
      type: ActionTypes.SINGIN_SUCCESS,
      payload: {}
    } as const),

  signinFailure: (errorMessage: string) =>
    ({
      type: ActionTypes.SINGIN_FAILURE,
      payload: {
        errorMessage
      }
    } as const)
}
