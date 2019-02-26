import usersConstants from '../constants/users'

const init_state = {
	items : 		[],
	isFetching: 	false,
	error: 			null,
	activeUser: 	null
}

const usersReducer = (state = init_state, action) => {
	switch (action.type) {
		case usersConstants.REQUEST_USERS : 
			return {
				...state,
				isFetching: true
			}
		case usersConstants.GET_ALL_SUCCESS : 
			return {
				...state,
				items: 		action.value,
				isFetching: false
			}
		case usersConstants.GET_ALL_FAILURE : 
			return {
				...state,
				items: 		null,
				isFetching: false,
				error: 		action.value
			}
		case usersConstants.REGISTER_SUCCESS:
			return {
				...state,
				isFetching: false
			}
		case usersConstants.REGISTER_FAILURE:
		 	return {
				...state,
				isFetching: false,
				error: 		action.value
		 	}
		case usersConstants.GET_USER_SUCCESS:
			return {
				...state,
				activeUser: action.value,
				isFetching: false
			}
		case usersConstants.GET_USER_FAILURE:
			return {
				...state,
				activeUser: null,
				error: 		action.value,
				isFetching: false
			}
		case usersConstants.UPDATE_USER_SUCCESS:
			return {
				...state,
				isFetching: false
			}
		case usersConstants.UPDATE_USER_FAILURE:
			return {
				...state,
				error: 		action.value,
				isFetching: false
			}
		default:
			return state
	}

}

export default usersReducer