import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Page404 from '../components/Page404'

import './App.css';

class Page404c extends Component {

	static propTypes = {
	}

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Page404 hey={'from container'}/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page404c))

