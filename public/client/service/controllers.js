angular.module(`sozaicApp.controller`, [`sozaicApp.serviceFactories`])
.controller(`FbController`, function($scope, GetFeed) {
  console.log(`controller fb`)
  $scope.title = `facebook`;
  $scope.info = `1111111`;
  console.log('hello world');
  $scope.selected = function() {
  }
})

.controller('YouTubeController', function($scope, GetFeed) {
  console.log(`controller fb`)
  $scope.title = `facebook`;
  $scope.info = `1111111`;
  console.log('hello world');
  $scope.selected = function() {
  }
})

.controller(`IGController`, function($scope, GetFeed){

})
.controller(`TwtrController`, function($scope, GetFeed) {
  $scope.title = `twitter`;
})