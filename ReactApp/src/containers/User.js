import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import usersActions from '../actions/users'
import UserError from '../components/UserError'


class User extends Component {

	constructor(props) {
		super(props)

		this.ownProfile = false
		this.isReady = null
		this.getCurrentUser = this.getCurrentUser.bind(this)
		this._isReady = this._isReady.bind(this)
	}

	componentDidMount() {
		this.getCurrentUser()
	}

	componentDidUpdate(prevProps) {
		if (!this.props.isFetching) {
			if (this.props.activeUser && (this.props.activeUser.name !== this.props.match.params.userName)) {
				this.getCurrentUser()
			} else if (!this.props.activeUser && (prevProps.history.location.pathname !== prevProps.location.pathname)) {
				this.getCurrentUser()
			}
		}
		// if (prevProps.history.location.pathname !== prevProps.location.pathname) {
		// 	this.getCurrentUser()	
		// }
	}

	getCurrentUser() {
		this.props.getUser(this.props.match.params.userName)
	}

	_isReady() {
		if (this.props.activeUser) {
			this.isReady = this.props.activeUser
			if (this.props.match.params.userName !==  this.props.activeUser.name) {
				this.isReady = null
			}
		}
	}

	render() {
		this.ownProfile = (this.props.match.params.userName === this.props.authUser.name) ? true : false
		this._isReady()
		
		return (
			<div className="">
				{ !this.isReady ? 
					(
						<div>
							{ !this.props.isFetching ?
								( 
									<div>
										{/* <h1 style={{backgroundColor:'blue', color:'red'}}>not found</h1> */}
										<UserError />
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
						<div>
							<h2>{this.props.activeUser.name}'s Profile</h2>
							{ this.props.activeUser.description &&
								(
									<div>
										Description:
										<p>{this.props.activeUser.description}</p>
									</div>
								)
							}
							{ this.props.authUser.isLogged && this.ownProfile &&
								(
									<div>
										<button><Link to={`/users/edit/${this.props.match.params.userName}`}>Edit Profile</Link></button>
									</div>
								)
							}
						</div>
					)
				}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		activeUser: state.usersReducer.activeUser,
		isFetching: state.usersReducer.isFetching,
		authUser: state.authReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: (param) => dispatch(usersActions.getUser(param))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User))

