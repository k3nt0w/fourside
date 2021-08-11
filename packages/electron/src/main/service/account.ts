import { newUser } from '@shared/models'

export const accountService = {
  login: async (param: { email: string; password: string }) => {
    return { user: newUser({ id: 'id', name: param.email }) }
  }
}
