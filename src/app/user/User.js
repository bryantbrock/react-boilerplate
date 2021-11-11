import {createSlice} from '@reduxjs/toolkit'
import {Users} from 'api/base'

const initialState = {
  fetchingUser: false,
  errors: null,
  user: {},
}

export const User = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => ({...state, errors: action.payload}),
    resetErrors: state => ({...state, errors: null}),
    setFetchingUser: state => ({...state, fetchingUser: true, errors: null}),
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
      fetchingUser: false,
      errors: null,
    })
  }
})

// Actions
export const resetErrors = () => dispatch => dispatch(User.actions.resetErrors())

export const authenticate = (type, data) => async dispatch => {
  dispatch(User.actions.setFetchingUser())

  let res
  let user
  if (type === "signup") {

    // Check all fields are filled
    if (!data.password || !data.confirmPassword || !data.email) {
      dispatch(User.actions.setError('Please fill in all fields.'))

      return {success: false}
    }

    // Validate info before requesting
    if (data.password !== data.confirmPassword) {
      dispatch(User.actions.setError('Passwords do not match.'))

      return {success: false}
    }


    res = await Users.createOne(data)
    user = await Users.getOne(res.id)
  } else {
    res = await Users.getOne(data.email)

    if (res.status === 'ok') {
        user = res.data
    } else {
        dispatch(User.actions.setError('Unable to login with provided crendentials.'))

        return {success: false}
    }
  }

  dispatch(User.actions.setUser(user))

  localStorage.setItem('userId', user.id)

  return {success: true}
}

export const smartLoad = () => async dispatch => {
  dispatch(User.actions.setFetchingUser())
  // TODO: clear storage if token is expired
  try {
    const userId = localStorage.getItem('userId')
    const user = await Users.getOne(userId)

    dispatch(User.actions.setUser(user))
  } catch (err) {
    dispatch(User.actions.setError(err.message))

    localStorage.clear()
  }
}

export default User