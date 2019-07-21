import { connect } from 'react-redux'
import { clockSelectors } from '../../../states/modules/clock'
import { RootState } from '../../../states/types'
import { Clock as Component, Props } from './Clock'

const mapStateToProps = (state: RootState): Props => ({
  lastUpdate: clockSelectors.getLastUpdate(state),
  light: clockSelectors.getLight(state)
})

export const Clock = connect(
  mapStateToProps,
  undefined
)(Component)
