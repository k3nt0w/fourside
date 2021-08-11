import { routerOperations } from '@renderer/states/modules/router'
import React from 'react'
import { useDispatch } from 'react-redux'

export const Login = () => {
  const dispatch = useDispatch()
  const handleClick = () => dispatch(routerOperations.pushHome())
  return (
    <>
      <h1>LOGIN PAGE</h1>
      <button onClick={handleClick}>TO HOME</button>
    </>
  )
}
