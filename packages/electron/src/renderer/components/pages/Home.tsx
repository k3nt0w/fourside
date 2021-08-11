import { routerActions } from '@renderer/states/modules/router'
import React from 'react'
import { useDispatch } from 'react-redux'

export const Home = () => {
  const dispatch = useDispatch()
  const handleClick = () => dispatch(routerActions.pushLogin())
  return (
    <>
      <h1>HOME PAGE</h1>
      <button onClick={handleClick}>TO LOGIN</button>
    </>
  )
}
