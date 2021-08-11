import { Operation } from '../../interfaces'
import { routerActions, routerSelectors } from '.'

// TODO(@k3nt0w): 修正する
const pushLogin: Operation = () => (dispatch, getState) => {
  const state = getState()
  const pathName = routerSelectors.getPathname(state)
  if (pathName !== '/') {
    dispatch(routerActions.pushLogin())
  }
}

const pushHome: Operation = () => (dispatch, getState) => {
  const state = getState()
  const pathName = routerSelectors.getPathname(state)

  if (pathName !== '/sample') {
    dispatch(routerActions.pushHome())
  }
}

export const operations = {
  pushLogin,
  pushHome
}
