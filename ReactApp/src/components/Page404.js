import React from 'react'
import PropTypes from 'prop-types'

const Page404 = ({hey}) => (
    <div>
		<h1>Nothing here 404 {hey}</h1>
	</div>
)

Page404.propTypes = {
	hey: PropTypes.string
}

export default Page404