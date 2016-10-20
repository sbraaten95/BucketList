app.factory('taskFactory', ['$http', function ($http){
	var userTasks = [];
	var factory = {};

	factory.getAllTasks = function (callback){
		$http.get('/tasks').then((data) => {
			callback(data.data);
		});
	};

	factory.getUserTasks = function (id, callback){
		$http.get('/tasks/' + id).then((data) => {
			userTasks = data.data.tasks;
			callback(userTasks);
		});
	};

	factory.create = function (task, callback){
		$http.post('/tasks', task).then((data) => {
			if (data.data && data.data.errors) {
				callback(data.data);
			} else {
				userTasks = data.data.tasks;
				callback(userTasks);
			}
		});
	};

	factory.delete = function (){
		$http.delete('/tasks').then((data) => {
			console.log(data);
		});
	};

	factory.check = function (change){
		$http.put('/tasks', change);
	}

	return factory;	
}])