function modUser(req, res, next) {
	let user 		= req.body
	let tokenInfo 	= req.tokenInfo

	switch (tokenInfo.rol) {
		case 1 : 
			next()
			break;
		case 5 :
			if (tokenInfo.name === user.name) {
				next()
			} else {
				return res.status(403).send({ message: 'Not have permision.' })
			}
			break;
		default:
			return res.status(500).send({ auth: false, message: 'Not have permision.' })
	}
}

module.exports = modUser;