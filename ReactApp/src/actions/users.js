import { push, goBack } from 'connected-react-router'

import authConstants from '../constants/auth'
import usersConstants from '../constants/users'
import usersServices from '../services/users'

const getAllUsers = params => {
	return dispatch => {
		dispatch({
			type: usersConstants.REQUEST_USERS
		})
		//request
		usersServices.getAllUsers().then(res => {
			if (res.status) {
				dispatch({
				  type: usersConstants.GET_ALL_SUCCESS,
				  value: res.value
				})
			} else {
				dispatch({
					type: usersConstants.GET_ALL_FAILURE,
					value: res.value
				})
			}
		})

	}
	
}

const newUser = user => {
	return dispatch => {
		//request
		usersServices.newUser(user).then( res => {
			if (res.status) {
				dispatch({
				  type: usersConstants.REGISTER_SUCCESS,
				  value: res.value
				})
				dispatch(push('/'))
			} else {
				dispatch({
					type: usersConstants.REGISTER_FAILURE,
					value: res.value
				})
			}
		})
	}
}

const getUser = user => {
	
	return dispatch => {
		dispatch({
		  type: usersConstants.REQUEST_USERS
		})
		//request
		usersServices.getUser(user).then(res => {
			if (res.status) {
				dispatch({
				  type: usersConstants.GET_USER_SUCCESS,
				  value: res.value
				})
			} else {
				dispatch({
					type: usersConstants.GET_USER_FAILURE,
					value: res.value
				})
			}
		})
	}
}

const modUser = user => {
	return dispatch => {
		dispatch({
			type: usersConstants.REQUEST_USERS
		})
		let token = JSON.parse(localStorage.getItem('auth')).token
		//request
		usersServices.modUser(user, token).then( res => {
			console.log("bien en las acciones ->",res)
			if (res.status) {
				dispatch({
				  type: usersConstants.UPDATE_USER_SUCCESS,
				  value: res.value
				})
				dispatch(goBack())
			} else {
				dispatch({
					type: usersConstants.UPDATE_USER_FAILURE,
					value: res.value
				})
			}
		})
	}
}

const delUser = user => {
	return dispatch => {
		dispatch({
			type: usersConstants.REQUEST_USERS
		})
		let token = JSON.parse(localStorage.getItem('auth')).token
		//request
		usersServices.delUser(user, token).then( res => {
			if (res.status) {
				dispatch({
				  	type: usersConstants.DELETE_USER_SUCCESS,
				  	value: res.value
				})
				dispatch({
					type: authConstants.LOGOUT_SUCCESS,
					value: res.value
				})
				localStorage.clear() //localStorage.removeItem('auth');
				push('/')
			} else {
				dispatch({
					type: usersConstants.DELETE_USER_FAILURE,
					value: res.value
				})
			}
		})
	}
}

const usersActions = {
	getAllUsers,
	newUser,
	getUser,
	modUser,
	delUser
}

export default usersActions