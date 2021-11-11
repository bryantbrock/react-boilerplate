import {combineReducers} from 'redux'
import {User} from 'app/user'

export default combineReducers({
    user: User.reducer,
})