app.factory('userFactory', ['$http', function ($http){
	var users = [];
	var factory = {};
	factory.login=(inputUser, callback)=>{
		$http.post('/users', inputUser).then((data)=>{
			if (data.data && data.data.errmsg) {
				callback(data.data);
			} else {
				user = data.data;
				callback(data);
			}
		});
	};
	factory.getUsers=(callback)=>{
		$http.get('/users').then((data)=>{
			callback(data.data);
		});
	};
	factory.getCurrentUser=(id, callback)=>{
		$http.get(`/users/${id}`).then((data)=>{
			callback(data.data);
		});
	};
	return factory;	
}]);