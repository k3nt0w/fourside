import { Operation } from '../../interfaces'
import { routerActions, routerSelectors } from '.'

const pushLogin: Operation = () => (dispatch, getState) => {
  const state = getState()
  const pathName = routerSelectors.getPathname(state)
  if (pathName !== '/') {
    dispatch(routerActions.pushLogin())
  }
}

const pushHistory: Operation = () => (dispatch, getState) => {
  const state = getState()
  const pathName = routerSelectors.getPathname(state)

  if (pathName !== '/history') {
    dispatch(routerActions.pushHistory())
  }
}

const pushSendjpys: Operation = () => (dispatch, getState) => {
  const state = getState()
  const pathName = routerSelectors.getPathname(state)

  if (pathName !== '/sendjpys') {
    dispatch(routerActions.pushSendjpys())
  }
}

export const operations = {
  pushLogin,
  pushHistory,
  pushSendjpys
}
