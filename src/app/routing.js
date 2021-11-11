import React from 'react'
import {connect} from 'react-redux'
import {navigate} from 'navigation'
import {Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {authenticate} from 'app/user/User'
import {
  Dashboard, Signup, Login, ResetPassword
} from 'app/pages'

const publicRoutes = ['/login', '/signup', '/reset-password']
const routes = [
  {path: '/dashboard', title: 'Dashboard', component: Dashboard},
  {path: '/signup', title: 'Signup', component: Signup},
  {path: '/reset-password', title: 'Reset Password', component: ResetPassword},
  {path: '/login', title: 'Login', component: Login},
]

const enhance = connect(
  state => ({
    fetchingUser: state.user.fetchingUser,
  }), {authenticate}
)

class Routing extends React.Component {
  renderRoutes() {
    return <Switch>
      {routes.map((route, idx) =>
        <Route
          exact={!route.notExact}
          key={idx}
          path={route.path}
          component={withRouter(route.component)}
          title={route.title} />
      )}
    </Switch>
  }
  render() {
    if (!localStorage.getItem('userId')) {
      // Don't redirect if a public route
      if (publicRoutes.includes(window.location.pathname)) {
        return this.renderRoutes()
      }

      navigate('/login')

      return this.renderRoutes()
    }

    // Get logged in and load page
    this.props.authenticate(
      'login', localStorage.getItem({id: 'userId'})
    )

    return this.props.fetchingUser ? <div className="flex justify-center w-full pt-40">
      <div className="spinner spinner-md" />
    </div> : this.renderRoutes()
  }
}

export default enhance(Routing)