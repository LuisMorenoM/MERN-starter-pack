/*
    USER CONTROLLER
    */

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

let verifyToken = require(__root + 'app/helpers/verifyToken');
let modUser = require(__root + 'app/helpers/modUser');

let User = require('./user');
var bcrypt = require('bcryptjs'); // used to encrypt passwords

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
	next();
})

// CREATES A NEW USER
router.post('/', function (req, res) {
	var hashedPassword = bcrypt.hashSync(req.body.password, 8);

	User.create({
		name : req.body.name,
		email : req.body.email,
		password : hashedPassword
	}, 
	function (err, user) {
		if (err) return res.status(500).send({message: "There was a problem registering the user."});

        // if user is registered without errors
        // create a token
        // var token = jwt.sign({ id: user._id }, config.secret, {
        //   expiresIn: 86400 // expires in 24 hours
        // });
        //SEND CONFIRMATION EMAIL. @TODO: confirmation email
        res.status(200).send(user);
    });
});

// RETURNS ALL THE USERS
router.get('/', function (req, res) {
	User.find({}, {password:0}, function (err, users) {
		if (err) return res.status(500).send({message: "There was a problem finding the user."});
		if (!users) return res.status(404).send({message: "No user found."});
		// setTimeout(() => {
			res.status(200).send(users);
		// }, 2000)
	});
});

// GETS A SINGLE USER
//By NAME
router.get('/:user', function (req, res) {
	User.find( {name: req.params.user}, {password:0}, function (err, user) {
		if (err) return res.status(500).send({message: "There was a problem finding the user."});
		if (!user[0]) return res.status(404).send({message: "No user found."});
		// setTimeout(() => {
			res.status(200).send(user[0]);
		// }, 2000)
	});
});

// By ID
// router.get('/:id', function (req, res) {
// 	User.findById(req.params.id, function (err, user) {
// 		if (err) return res.status(500).send("There was a problem finding the user.");
// 		if (!user) return res.status(404).send({message: "No user found."});
// 		res.status(200).send(user);
// 	});
// });

// DELETES A USER
router.delete('/:user?', [verifyToken, modUser], function (req, res) {
	User.findOneAndDelete({ _id: req.body.id }, { fields: { password: 0 } }, function (err, user) {
		if (err) return res.status(500).send({message: "There was a problem deleting the user."});
		res.status(200).send({ auth: false, token: null });
	});
});

// UPDATES A SINGLE
// Added verifyToken middleware to make sure only an authenticated user can put to this route, and get de ID
// modUser middleware to validate the rol and the permisions.
router.put('/:user?', [verifyToken, modUser], function (req, res) {
	User.findOneAndUpdate({ _id: req.body.id }, req.body, { fields: { password: 0 }, new: true }, function (err, user) {
		if (err) return res.status(500).send({message: "There was a problem updating the user."});
		res.status(200).send(user);
	});
});

//get my user info
// router.get('/me', verifyToken, function(req, res, next) {

// 	User.findById(req.userId, { password: 0 }, function (err, user) {
// 		if (err) return res.status(500).send("There was a problem finding the user.");
// 		if (!user) return res.status(404).send({message: "No user found."});
// 		res.status(200).send(user);
// 	});

// });

module.exports = router;