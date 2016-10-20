app.factory('userFactory', ['$http', function ($http){
	var users = [];
	var factory = {};

	factory.login = function (inputUser, callback){
		console.log(inputUser);
		$http.post('/users', inputUser).then((data) => {
			console.log(data)
			if (data.data && data.data.errmsg) {
				callback(data.data);
			} else {
				user = data.data;
				callback(data);
			}
		});
	};

	factory.delete = function (){
		$http.delete('/users').then((data) => {
			console.log(data);
		});
	};

	factory.getUsers = function (callback){
		$http.get('/users').then((data) => {
			callback(data.data);
		});
	};

	factory.getCurrentUser = function (id, callback){
		console.log(id)
		$http.get('/users/' + id).then((data) => {
			console.log(data);
			callback(data.data);
		});
	};

	return factory;	
}])