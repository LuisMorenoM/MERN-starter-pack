import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import authActions from '../actions/auth'
import usersActions from '../actions/users'

class Users extends Component {

	constructor(props) {
		super(props)

		this.isReady = false
		this._isReady = this._isReady.bind(this)
	}

	componentDidMount() {
		this.props.getAllUsers()
	}

	_isReady() {
		this.isReady = (this.props.users.length) ? true : false
	}

	render() {
		this._isReady()

		return (
			<div className="">
				<h2>Users</h2>		
				{ !this.isReady ? 
					(
						<div>
							{ !this.props.isFetching ?
								( 
									<div>
										<h1 style={{backgroundColor:'blue', color:'red'}}>not found</h1>
									</div>
								)
								:
								(
									<div>
										<h1 style={{backgroundColor:'blue', color:'red'}}>loading</h1>
									</div>
								)
							}
						</div>
					) 
					:
					(
						<ul>
							{
								this.props.users.map((user, i) => (
									<li key={i}><Link to={`/users/${user.name}`}>{user.name}</Link></li>
								))
							}
						</ul>
					)
				}
			</div>
			);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		users:    	state.usersReducer.items,
		isFetching: state.usersReducer.isFetching
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllUsers: (param) => {dispatch(usersActions.getAllUsers(param))}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))

