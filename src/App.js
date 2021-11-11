import React from 'react'
import {Provider} from 'react-redux'
import {history} from 'navigation'
import {store} from 'store'
import {Router} from 'react-router-dom'
import Routing from 'app/routing'

export default () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routing />
      </Router>
    </Provider>
  )
}