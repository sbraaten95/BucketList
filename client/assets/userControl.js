app.controller('userControl', ['$location', '$cookies', '$routeParams', 'userFactory', 'taskFactory', function ($location, $cookies, $routeParams, uF, tF){
	var _this = this;
	this.currentUser = {};
	this.userTasks = [];
	this.tasks = [];

	this.getCurrentUser = function (id){
		uF.getCurrentUser(id, function (data){
			_this.currentUser = data;
		});
	};
	this.getCurrentUser($routeParams.id);

	this.getTasks = function (id){
		this.userTasks = [];
		tF.getUserTasks($routeParams.id, function (data){
			_this.userTasks = data;
			_this.getAllTasks();
		});
	}
	this.getTasks($routeParams.id);

	this.getAllTasks = function (){
		tF.getAllTasks(function (data){
			_this.tasks = data;
			var check = '';
			for (var i in _this.tasks) {
				if (_this.tasks[i].shared_user == _this.currentUser._id && _this.tasks[i].shared_user != check) {
					console.log(i)
					_this.userTasks.push(_this.tasks[i]);
					check = _this.tasks[i];
				}
			}
			console.log(_this.userTasks)
		})
	}

	this.logout = function (){
		$cookies.remove('user');
		$location.path('/login');
	}
}]);