/*********************************************************
*   Primary controller. Facilitates main functionality   *
*********************************************************/

app.controller('dashControl', ['$location', '$cookies', 'userFactory', 'taskFactory', function ($location, $cookies, uF, tF){
	var _this = this;
	this.currentUser = {};
	$scope.users = [];
	this.userTasks = [];
	this.tasks = [];
	this.errors = {};
	this.fetchSharedTasks=()=>{
		for (var i in _this.tasks) {
			if (_this.tasks[i].shared_user == _this.currentUser._id) {
				_this.userTasks.push(_this.tasks[i]);
			}
		}
	};
	this.getCurrentUser=(id)=>{
		uF.getCurrentUser(id, (data)=>{
			_this.currentUser = data;
		});
	};
	this.getUsers=()=>{
		uF.getUsers((data)=>{
			$scope.users = data;
		});
	};
	this.getTasks=(id)=>{
		this.userTasks = [];
		tF.getUserTasks($cookies.get('user'), (data)=>{
			_this.userTasks = data;
			_this.getAllTasks();
		});
	};
	this.getAllTasks=()=>{
		tF.getAllTasks((data)=>{
			_this.tasks = data;
			_this.fetchSharedTasks();
		});
	};
	this.createTask=()=>{
		var task = {
			user: this.currentUser.name,
			checked: false,
			title: this.newTask.title,
			description: this.newTask.description,
			shared_user: this.newTask.shared_user
		};
		tF.create(task, (data)=>{
			_this.errors = {};
			if (data.errors) {
				_this.errors = {
					title: data.errors.description.message,
					desc: data.errors.title.message
				};
			} else {
				_this.userTasks = data;
				_this.getAllTasks();
			}
		});
	};
	this.check=(id)=>{
		var change = {
			id: id,
			status: this.checked.status
		};
		tF.check(change);
		$location.path('/dashboard');
	};
	this.logout=()=>{
		$cookies.remove('user');
		$location.path('/login');
	};
	this.getCurrentUser($cookies.get('user'));
	this.getUsers();
	this.getTasks($cookies.get('user'));
}]);