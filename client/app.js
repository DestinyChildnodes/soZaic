`use strict`;

angular.module(`sozaicApp`, [])

.config(function($routeProvider){
	$routeProvider
		.when('/twitter', {
			templateUrl: './pages/twitter.html',
			controller: 'TwitterController'
		})
		.when('/instagram', {
			templateUrl: './pages/instagram.html',
			controller: 'InstagramController'
		})
})

.controller(`TwitterController`, function($scope) {
  $scope.title = `twitter`;
})
.controller(`InstagramController`, function($scope){
	$scope.title = `instagram`;
})
