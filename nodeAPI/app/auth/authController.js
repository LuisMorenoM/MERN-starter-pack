/*
    AUTH CONTROLLER
*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var verifyToken = require(__root + '/app/helpers/verifyToken');
var User = require(__root + 'app/users/user');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs'); // used to encrypt passwords
var config = require(__root + 'config/secret'); // get config file. @TODO: Has to be in enviorment variable. NOT THERE!

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

router.post('/login', function(req, res) {
	User.findOne({ $or: [ {email: req.body.name}, {name: req.body.name} ]}, function (err, user) {
		if (err) return res.status(500).send({message: 'Error on the server.'});
		if (!user) return res.status(404).send({message: 'User not found.'});

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Incorrect password' });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id, rol: user.rol, name: user.name }, config.secret, {
	    expiresIn: 86400 // expires in 24 hours
	});

    // return the information including token as JSON
	const endUser = {
		name: user.name,
		email: user.email
	}
    res.status(200).send({ auth: true, token: token, user: endUser });
});

});

router.get('/logout', function(req, res) {
	res.status(200).send({ auth: false, token: null });
});

router.get('/me', verifyToken, function(req, res, next) {

	User.findById(req.userId, { password: 0 }, function (err, user) {
		if (err) return res.status(500).send({message: "There was a problem finding the user."});
		if (!user) return res.status(404).send({message: "User not found."});
		res.status(200).send(user);
	});

});

module.exports = router;