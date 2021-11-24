import React from 'react'
import prop from 'ramda/src/prop'
import {useSelector, useDispatch} from 'react-redux'

const Dashboard = () => {
  const dispatch = useDispatch()
  const user = useSelector(prop('user'))

  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default Dashboard