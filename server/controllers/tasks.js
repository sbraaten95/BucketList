var mongoose = require('mongoose');
var Task = mongoose.model('Task');
var User = mongoose.model('User');

function TasksController (){
	var _this = this;

	this.index = function (req,res){
		Task.find({}, (err, tasks) => {
			if (err) {
				console.log(err);
			} else {
				res.json(tasks);
			}
		});
	};

	this.getUserTasks = function (req,res){
		User.findOne({_id: req.params.id}).populate('tasks').exec((err, tasks) => {
			if (err) {
				console.log(err)
			} else {
				res.json(tasks);
			}
		});
	};

	this.check = function (req,res){
		console.log(req.body)
		Task.update({_id: req.body.id}, {checked: req.body.status}, (err, task) => {
			if (err) {
				console.log(err);
			} else {
				res.json(task);
			}
		});
	};

	this.delete = function (req,res){
		Task.remove({}, (err) => {
			if (err) {
				console.log(err);
			} else {
				res.json({success: 'success'})
			}
		})
	}

	this.create = function (req,res){
		User.findOne({name: req.body.user}, (err, user) => {
			var newTask = new Task(req.body);
			newTask.save((err) => {
				if (err) {
					res.json(err)
				} else {
					user.tasks.push(newTask);
					user.save((err) => {
						if (err) {
							console.log(err);
						} else {
							User.findOne({name: req.body.user}).populate('tasks').exec((err, tasks) => {
								console.log(tasks)
								if (err) {
									console.log(err)
								} else {
									res.json(tasks);
								}
							})
						}
					});
				}
			});
		});
	};
}

module.exports = new TasksController();