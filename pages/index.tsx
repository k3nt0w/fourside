import React from 'react'
import { connect } from 'react-redux'
import { clockOperations, clockActions } from '../client/states/modules/clock'
import { Clock } from '../client/components/organisims/Clock'
import { Counter } from '../client/components/organisims/Counter'
import Auth from '../client/components/auth'
import { User } from '../lib/firebase/type'

interface Props {
  timer: number
  user: User
  messages: []
}

interface Handlers {
  start: () => void
}

class Index extends React.Component<Props & Handlers> {
  public constructor(props: Props & Handlers) {
    super(props)
  }

  static async getInitialProps({ req, store }: any) {
    console.log('call: Index getInitialProps')
    // const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    store.dispatch(clockActions.serverRender())
    console.log('call: **** getInitialProps ****')
    const user = req ? req.decodedToken : null
    console.log(user)
    // don't fetch anything from firebase if the user is not found
    const snap =
      user &&
      (await req.firebaseServer
        .database()
        .ref('messages')
        .once('value'))
    const messages = snap && snap.val()
    return { user, messages }
  }

  componentDidMount(this: any) {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // TO TICK THE CLOCK
    this.timer = setInterval(() => {
      this.props.start()
    }, 1000)
  }

  componentWillUnmount(this: any) {
    clearInterval(this.timer)
  }

  render() {
    const { user, messages } = this.props
    return (
      <div>
        <Auth user={user} messages={messages} />
        <Clock />
        <Counter />
      </div>
    )
  }
}
const mapDispatchToProps: Handlers = { start: clockOperations.start }

export default connect(
  null,
  mapDispatchToProps
)(Index)
