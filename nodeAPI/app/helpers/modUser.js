function modUser(req, res, next) {
	console.log("modUser")
	let user 		= req.body
	let tokenInfo 	= req.tokenInfo

	console.log(tokenInfo.name, user.name)

	switch (tokenInfo.rol) {
		case 1 : 
			next()
			break;
		case 5 :
			if (tokenInfo.name !== user.name) 
				console.log("no hace next?")
				return res.status(500).send({ message: 'Not have permision.' })

			console.log("antes del next")
			next()
			break;
		default:
			return state
	}
}

module.exports = modUser;