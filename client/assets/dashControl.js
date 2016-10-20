app.controller('dashControl', ['$routeParams', '$location', '$cookies', 'userFactory', 'taskFactory', function ($routeParams, $location, $cookies, uF, tF){
	var _this = this;
	this.currentUser = {};
	this.users = [];
	this.userTasks = [];
	this.tasks = [];
	this.errors = {};

	this.getCurrentUser = function (id){
		uF.getCurrentUser(id, function (data){
			_this.currentUser = data;
			console.log(_this.currentUser)
		});
	};
	this.getCurrentUser($cookies.get('user'))

	this.getUsers = function (){
		uF.getUsers(function (data){
			_this.users = data;
		});
	};
	this.getUsers();

	this.getTasks = function (id){
		this.userTasks = [];
		tF.getUserTasks($cookies.get('user'), function (data){
			_this.userTasks = data;
			_this.getAllTasks();
		});
	}
	this.getTasks($cookies.get('user'));

	this.getAllTasks = function (){
		tF.getAllTasks(function (data){
			_this.tasks = data;
			for (var i in _this.tasks) {
				if (_this.tasks[i].shared_user == _this.currentUser._id) {
					_this.userTasks.push(_this.tasks[i]);
				}
			}
		});
	};

	this.createTask = function (){
		var task = {
			user: this.currentUser.name,
			checked: false,
			title: this.newTask.title,
			description: this.newTask.description,
			shared_user: this.newTask.shared_user
		};

		tF.create(task, function (data){
			console.log(data)
			if (data.errors) {
				_this.errors = data.errors;
			} else {
				_this.userTasks = data;
				_this.getAllTasks();
			}
		});
	};

	this.check = function (id){
		var change = {
			id: id,
			status: this.checked.status
		};

		console.log(change.status)

		tF.check(change);
		$location.path('/dashboard');
	}

	// this.delete = function (){
	// 	tF.delete();
	// 	uF.delete();
	// }
	// this.delete();

	this.logout = function (){
		$cookies.remove('user');
		$location.path('/login');
	}
}]);