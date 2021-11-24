import React, {useState} from 'react'
import prop from 'ramda/src/prop'
import {Anchor} from 'partials'
import {navigate} from 'navigation'
import {signIn} from 'app/core'
import {useSelector, useDispatch} from 'react-redux'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {isLoading, error} = useSelector(prop('user'))
  const dispatch = useDispatch()

  const authenticate = event => {
    event.preventDefault()
    dispatch(signIn({email, password}))
  }

  return (
    <div className="circuit-pattern h-screen pt-32">
      <div className="flex flex-col px-20 py-16 mx-auto card bg-white w-lg rounded shadow-lg">
        <h2 className="font-bold text-3xl pb-3">Sign in to your account</h2>
        {error && <div className="px-3 py-2 error">Invalid email or password.</div>}
        <form onSubmit={authenticate} className="flex flex-col">
          <label className="pt-6">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="border rounded w-full p-4 my-4"
            onChange={event => setEmail(event.target.value)}/>
          <div className="pt-6 flex justify-between">
            <label>Password</label>
            <Anchor onClick={() => navigate('/reset-password')}>Forgot your password?</Anchor>
          </div>
          <input
            type="password"
            name="password"
            value={password}
            className="border rounded w-full p-4 my-4"
            onChange={event => setPassword(event.target.value)}/>
          <button
            type="submit"
            className="py-4 flex justify-center text-lg"
            className="flex justify-center text-lg bg-blue-600 text-white p-4 rounded w-full my-4">
            {isLoading ? <div className="spinner spinner-white spinner-sm" /> : 'Continue'}
          </button>
        </form>
        <div className="mx-auto">
          Don't have an account? <Anchor onClick={() => navigate('/signup')}>Sign up</Anchor>
        </div>
      </div>
    </div>
  )
}

export default SignIn