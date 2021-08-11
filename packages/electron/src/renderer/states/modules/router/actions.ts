import { route } from '@renderer/router'
import { push } from 'connected-react-router'

export const actions = {
  pushLogin: () => push(route.LOGIN),
  pushHome: () => push(route.HOME)
}
