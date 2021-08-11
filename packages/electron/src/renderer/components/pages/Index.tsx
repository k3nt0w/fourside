import { routerOperations } from '@renderer/states/modules/router'
import React from 'react'
import { useDispatch } from 'react-redux'

export const Index = () => {
  const dispatch = useDispatch()
  const handleClick = () => dispatch(routerOperations.pushHome())
  return (
    <>
      <h1>INDEX PAGE</h1>
      <button onClick={handleClick}>TO HOME</button>
    </>
  )
}
