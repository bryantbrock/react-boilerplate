import React from 'react'
import prop from 'ramda/src/prop'
import {useSelector} from 'react-redux'
import {navigate} from 'navigation'
import {Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import SignIn from 'app/signin'
import SignUp from 'app/signup'
import Dashboard from 'app/dashboard'

const publicRoutes = [
  '/signin',
  '/signup',
  '/reset-password'
]

const routes = [
  {path: '/signin', title: 'Sign In', component: SignIn},
  {path: '/signup', title: 'Sign Up', component: SignUp},
  {path: '/dashboard', title: 'Dashboard', component: Dashboard},
]

const Routing = () => {
  const {isLoading} = useSelector(prop('user'))

  return isLoading
    ? (
      <div className="flex justify-center w-full pt-40">
        <div className="spinner spinner-md" />
      </div>
    )
    : (
      <Switch>
        {routes.map((route, idx) =>
          <Route
            exact={!route.notExact}
            key={idx}
            path={route.path}
            component={withRouter(route.component)}
            title={route.title} />
        )}
      </Switch>
    )
}

export default Routing