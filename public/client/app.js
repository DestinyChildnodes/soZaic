`use strict`;

angular.module(`sozaicApp`, [`ui.router`])

.controller(`FbController`, function($scope) {
  console.log(`controller fb`)
  $scope.title = `facebook`;
  $scope.info = `1111111`;
  console.log('hello world');
  $scope.selected = function() {
  }
})

.controller('YouTubeController', function($scope) {
  console.log(`controller fb`)
  $scope.title = `facebook`;
  $scope.info = `1111111`;
  console.log('hello world');
  $scope.selected = function() {
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state(`fbFeed`, {
      url: `/feed/facebook`,
      templateUrl: `/pages/facebook/facebook.html`,
      controller: `FbController`
    })
    .state(`youTubeFeed`, {
      url: `/feed/youtube`,
      templateUrl: `/pages/youtube/youtube.html`,
      controller: `YouTubeController`
    })
})

.controller(`TwtrController`, function($scope) {
  $scope.title = `twitter`;
})

.controller(`YouTubeController`, function($scope, Authorize){
  $scope.data = {};
  $scope.ytAuthor = function(user, pass){
    console.log("inside controller")
    Authorize.ytAuthorize(user, pass)
    .then(function(data){
      $scope.data = data;
      console.log(data);
    })
  }
  $scope.youTubeGet = function(){
    
    //'https://gdata.youtube.com/feeds/api/users/default/subscriptions?v=2'
  };
})

.factory(`YTAuthorize`, function($http){
  let ytAuthorize = function(user, pass){
    console.log("inside factory")
    return $http({
      method: 'POST',
      url: './pages/youtube/ytlogin.html'
    })
  }

  return {
    ytAuthorize : ytAuthorize
  }
})







;
