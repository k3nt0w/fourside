import React from 'react'

export interface Props {
  count: number
  lastUpdate: number
  light: boolean
}

export interface Handlers {
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const Counter = (props: Props & Handlers) => {
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
