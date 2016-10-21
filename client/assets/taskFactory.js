app.factory('taskFactory', ['$http', function ($http){
	var userTasks = [];
	var factory = {};
	factory.getAllTasks=(callback)=>{
		$http.get('/tasks').then((data)=>{
			callback(data.data);
		});
	};
	factory.getUserTasks=(id, callback)=>{
		$http.get(`/tasks/${id}`).then((data)=>{
			userTasks = data.data.tasks;
			callback(userTasks);
		});
	};
	factory.create=(task, callback)=>{
		$http.post('/tasks', task).then((data)=>{
			if (data.data && data.data.errors) {
				callback(data.data);
			} else {
				userTasks = data.data.tasks;
				callback(userTasks);
			}
		});
	};
	factory.check=(change)=>{
		$http.put('/tasks', change);
	};
	return factory;
}]);