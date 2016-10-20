app.controller('loginControl', ['$location', '$cookies', 'userFactory', function ($location, $cookies, uF){
	var _this = this;
	this.errors = {};

	this.login = function (){
		this.errors = {};
		uF.login(this.inputUser, function (data){
			if (data.errors) {
				_this.errors = data.errors;
			} else {
				console.log(data.data._id);
				$cookies.put('user', data.data._id);
				$location.path('/dashboard/' + data.data._id);
			}
		});
	};
}])