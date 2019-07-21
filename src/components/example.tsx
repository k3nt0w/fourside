import { connect } from 'react-redux'
import Clock from './clock'
import Counter from './counter'
import { clockSelectors } from '../states/modules/clock'
import { RootState } from '../states/types'

export interface Props {
  lastUpdate: number
  light: boolean
}

const Examples = ({ lastUpdate, light }: Props) => (
  <div>
    <Clock lastUpdate={lastUpdate} light={light} />
    <Counter />
  </div>
)

const mapStateToProps = (state: RootState): Props => ({
  lastUpdate: clockSelectors.getLastUpdate(state),
  light: clockSelectors.getLight(state)
})

export default connect(mapStateToProps)(Examples)
