import React from 'react'
import { connect } from 'react-redux'
import Examples from '../src/components/example'
import { clockOperations, clockActions } from '../src/states/modules/clock'

interface Props {
  timer: number
}

interface Handlers {
  start: () => void
}

class Index extends React.Component<Props & Handlers> {
  public constructor(props: Props & Handlers) {
    super(props)
  }

  static getInitialProps({ store }: any) {
    // const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    store.dispatch(clockActions.serverRender())

    return {}
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
    return <Examples />
  }
}
const mapDispatchToProps: Handlers = { start: clockOperations.start }

export default connect(
  null,
  mapDispatchToProps
)(Index)
