import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router';

export default function (ComposedComponent) {  
	class Own extends Component {

		componentDidMount() {
			this._checkAndRedirect();
		}

		componentDidUpdate() {
			this._checkAndRedirect();
		}

		_checkAndRedirect() {
			const { isLogged, authName, redirect } = this.props;
			if (!isLogged || (authName !== this.props.match.params.userName)) {
				redirect();
			}
		}

		render() {
			//@TODO: maybe handle error here?
			return (
				<div>
					{ this.props.isLogged ? <ComposedComponent {...this.props} /> : null }
				</div>
			);
		}
	}

	const mapStateToProps = (state, ownProps) => {
		return {
            authName: state.authReducer.name,
            isLogged: state.authReducer.isLogged
		}
	}

	const mapDispatchToProps = (dispatch) => {
		return {
			redirect: () => dispatch(push('/')) //@TODO: redirect to /404 page or handle here
		}
	}

	return withRouter(connect(mapStateToProps, mapDispatchToProps)(Own));
}