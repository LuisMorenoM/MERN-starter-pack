import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'
import { Link } from 'react-router-dom';

// HOC
import requiresAuth from '../hoc/requiresAuth'; //isLogged
import notLogged from '../hoc/notLogged'; //notLogged
import requiresOwn from '../hoc/requiresOwn'; //isLogged && Own

// Containers
import Header from './Header'
import App from './App'
import Page404c from './Page404c'
import Login from './Login'
import Signup from './Signup'
import Users from './Users'
import User from './User'
import EditUser from './EditUser'

const Root = ({history}) => (
	<ConnectedRouter history={history}>
		<div>
			<div>
				<Header />
			</div>
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/login" component={notLogged(Login)} />
				<Route exact path="/signup" component={notLogged(Signup)} />
				<Route exact path="/users" component={Users} />
				<Route exact path="/users/:userName" component={User} />
				<Route exact path="/users/edit/:userName" component={requiresOwn(EditUser)} />
				{/* <Route path="/users" 
					render={ ({ match }) => (
						<div>
							<Route exact path={`${match.url}/`} component={Users} />
							<Route exact path={`${match.url}/:userName`} component={User} />
							<Route exact path={`${match.url}/edit/:userName/`} component={requiresOwn(EditUser)} />
							<Route  component={Page404c} />
						</div>
					)}
				/> */}
				<Route component={Page404c} />
			</Switch>
			<div>
				footer
			</div>
		</div>
	</ConnectedRouter>
)

// Root.propTypes = {
//   store: PropTypes.object.isRequired,
// }

export default Root