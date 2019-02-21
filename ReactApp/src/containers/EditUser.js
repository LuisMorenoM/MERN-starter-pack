import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import usersActions from '../actions/users'

class EditUser extends Component {

	constructor(props) {
		super(props)

		this.isReady = null

		this.getCurrentUser = this.getCurrentUser.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this._isReady = this._isReady.bind(this)
	}

	componentDidMount(prevProps) {
		// this.getCurrentUser()
		// if (!this.props.isFetching && !this.props.activeUser || (this.props.activeUser.name !== this.props.match.params.userName)) {
		// 	this.getCurrentUser()
		// }
		if (!this.props.activeUser && !this.props.isFetching) {
			this.getCurrentUser()
		}
	}

	getCurrentUser() {
		this.props.getUser(this.props.match.params.userName)
	}

	handleSubmit(e) {
		e.preventDefault();
		let modUser = {
			name: 			this.props.activeUser.name,
			description: 	e.target.description.value
		}
		this.props.modUser(modUser)
	}

	handleDelete(e) {
		e.preventDefault()
		let delUser = {
			name: this.props.activeUser.name
		}
		this.props.delUser(delUser)
	}

	_isReady () {
		if (this.props.activeUser) {
			this.isReady = this.props.activeUser
			if (this.props.match.params.userName !==  this.props.activeUser.name) {
				this.isReady = null
			}
		}
	}

	render() {
		this._isReady()
		//@TODO: if this.props.match.params.userName !== this.props.activeUser.name render loading
		return (
			<div className="">
				{ !this.isReady ? 
					(
						<div>
							{ !this.props.isFetching ?
								(
									<div style={{backgroundColor:'blue'}}>Not Found</div>
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
							<h2>Edit {this.props.activeUser.name}'s Profile</h2>
							<div>
								<form onSubmit={this.handleSubmit}>
									<span>
										<label htmlFor="description">description</label>
										<input id="description" type="description" name="description"/>
									</span>
									<button type="submit" value="Submit" >Edit</button>
								</form>
							</div>
							<div>
								<button onClick={this.handleDelete} value="delUser">Delete</button>
							</div>
						</div>
					)
				}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		activeUser: 	state.usersReducer.activeUser,
		isFetching: 	state.usersReducer.isFetching,
		authUser: 		state.authReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: (param) => dispatch(usersActions.getUser(param)),
		modUser: (param) => dispatch(usersActions.modUser(param)),
		delUser: (param) => dispatch(usersActions.delUser(param))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUser))

