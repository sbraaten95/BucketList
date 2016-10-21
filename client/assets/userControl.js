/****************************************************************************
*   Finalizing controller. Accompanies and completes dashboard controller   *
****************************************************************************/

app.controller('userControl', ['$location', '$cookies', '$routeParams', 'userFactory', 'taskFactory', function ($location, $cookies, $routeParams, uF, tF){
	var _this = this;
	this.currentUser = {};
	this.userTasks = [];
	this.tasks = [];
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
	this.getTasks=(id)=>{
		this.userTasks = [];
		tF.getUserTasks($routeParams.id, (data)=>{
			_this.userTasks = data;
			_this.getAllTasks();
		});
	}
	this.getAllTasks=()=>{
		tF.getAllTasks((data)=>{
			_this.tasks = data;
			_this.fetchSharedTasks();
		});
	};
	this.logout=()=>{
		$cookies.remove('user');
		$location.path('/login');
	};
	this.getCurrentUser($routeParams.id);
	this.getTasks($routeParams.id);
}]);