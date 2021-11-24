import {combineReducers} from 'redux'
import {User} from 'app/core'

export default combineReducers({
    user: User.reducer,
})