import { connect } from 'react-redux'
import { clockOperations, clockSelectors } from '../../../states/modules/clock'
import { RootState } from '../../../states/types'
import { Counter as Component, Props, Handlers } from './Counter'

const mapStateToProps = (state: RootState): Props => ({
  count: clockSelectors.getCount(state),
  lastUpdate: clockSelectors.getLastUpdate(state),
  light: clockSelectors.getLight(state)
})

const mapDispatchToProps: Handlers = {
  increment: clockOperations.increment,
  decrement: clockOperations.decrement,
  reset: clockOperations.reset
}

export const Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
