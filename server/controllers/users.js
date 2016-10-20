var mongoose = require('mongoose');
var User = mongoose.model('User');
var Task = mongoose.model('Task');

function UsersController (){
	var _this = this;

	this.index = function (req,res){
		User.find({}, (err, users) => {
			if (err) {
				console.log(err);
			} else {
				res.json(users);
			}
		});
	};

	this.delete = function (req,res){
		User.remove({}, (err) => {
			if (err) {
				console.log(err);
			} else {
				res.json({success: 'success'})
			}
		})
	}

	this.getOne = function (req,res){
		User.findOne({_id: req.params.id}, (err, user) => {
			if (err) {
				console.log(err);
			} else {
				res.json(user);
			}
		});
	};

	this.login = function (req,res){
		User.findOne({name: req.body.name}, (err, user) => {
			if (err) {
				console.log(err);
			} else {
				if (user) {
					res.json(user);
				} else {
					var newUser = new User(req.body);
					newUser.save((err) => {
						if (err) {
							console.log(err);
						} else {
							res.json(newUser);
						}
					});
				}
			}
		});
	};
}

module.exports = new UsersController();