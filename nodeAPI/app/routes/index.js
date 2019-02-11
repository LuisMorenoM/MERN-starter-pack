
module.exports = function(app) {
	app.get('/', function(req, res) {
	  	res.send("This is Working :3")
	});
	console.log("root :>", __root)

	let UserController = require(__root + 'app/users/userController');
	app.use('/api/users', UserController);

	let AuthController = require(__root + 'app/auth/authController');
	app.use('/api/auth', AuthController);

}