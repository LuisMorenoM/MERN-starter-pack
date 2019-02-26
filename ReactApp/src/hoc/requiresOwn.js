import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router';

import Page404 from '../components/Page404'

export default function (ComposedComponent) {  
	class Own extends Component {

		constructor(props) {
			super(props)
	
			this.newComponent = true
			this._checkAndRedirect = this._checkAndRedirect.bind(this)
		}

		componentDidMount() {
		}

		componentDidUpdate() {
		}

		_checkAndRedirect() {
			const { isLogged, authName, redirect } = this.props;
			if (!isLogged || (authName !== this.props.match.params.userName)) {
				// redirect();
				this.newComponent = false
			}
		}

		render() {
			this._checkAndRedirect()
			return (
				<div>
					{ this.newComponent ? <ComposedComponent {...this.props} /> : <Page404 /> }
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
			redirect: () => dispatch(push('/404')) //@TODO: redirect to /404 page or handle here
		}
	}

	return withRouter(connect(mapStateToProps, mapDispatchToProps)(Own));
}