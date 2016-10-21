/******************************************************
*   Preliminary controller. Handles login requests.   *
******************************************************/

app.controller('loginControl', ['$location', '$cookies', 'userFactory', function ($location, $cookies, uF){
	var _this = this;
	this.login=()=>{
		uF.login(this.inputUser, (data)=>{
			$cookies.put('user', data.data._id);
			$location.path('/dashboard');
		});
	};
}]);