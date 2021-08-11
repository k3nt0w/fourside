import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './states/modules/router'
import { Provider } from 'react-redux'
import { initializeStore } from './states'
import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { route } from './router'
import { registerIPCHandler } from './libs/ipc'
import { Index } from './components/pages/Index'
import { Home } from './components/pages/Home'

const store = initializeStore()
registerIPCHandler(store)

ReactDOM.render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={route.LOGIN} component={Index} />
          <Route path={route.HOME} component={Home} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </>,
  document.getElementById('root') as HTMLElement
)
