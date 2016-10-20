var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(($routeProvider) => {
	$routeProvider.when('/login', {
		controller: 'loginControl',
		templateUrl: 'partials/login.html'
	}).when('/dashboard/:id', {
		controller: 'dashControl',
		templateUrl: 'partials/dashboard.html'
	}).when('/dashboard', {
		controller: 'dashControl',
		templateUrl: 'partials/dashboard.html'
	}).when('/user/:id', {
		controller: 'userControl',
		templateUrl: 'partials/user.html'
	}).otherwise({
		redirectTo: '/login'
	});
});