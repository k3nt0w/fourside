import React from 'react'
import { connect } from 'react-redux'
import { clockOperations, clockSelectors } from '../states/modules/clock'
import { RootState } from '../states/types'

export interface Props {
  count: number
}

export interface Handlers {
  increment: () => void
  decrement: () => void
  reset: () => void
}

const Counter = (props: Props & Handlers) => {
  const { count, increment, decrement, reset } = props
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

const mapStateToProps = (state: RootState): Props => ({
  count: clockSelectors.getCount(state)
})

const mapDispatchToProps: Handlers = {
  increment: clockOperations.increment,
  decrement: clockOperations.decrement,
  reset: clockOperations.reset
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
