import { push } from 'connected-react-router'

export const actions = {
  pushLogin: () => push('/'),
  pushHistory: () => push('/history'),
  pushSendjpys: () => push('/sendjpys')
}
