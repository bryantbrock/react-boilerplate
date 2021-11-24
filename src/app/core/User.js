import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  error: null,
  user: {},
}

export const User = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => ({...state, error: action.payload}),
    resetError: state => ({...state, error: null}),
    setIsLoading: state => ({...state, isLoading: true, error: null}),
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
      isLoading: false,
      error: null,
    })
  }
})

// Actions
export const signIn = ({email, password}) => dispatch => {
  console.log(email, password)
}
export const signUp = ({email, password}) => dispatch => {
  console.log(email, password)
}

export default User