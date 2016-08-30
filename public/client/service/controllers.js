angular.module(`sozaicApp.controller`, [`sozaicApp.serviceFactories`])

.controller(`FbController`, function ($scope, GetFeed) {

  $scope.title = `facebook`;
  $scope.info = `1111111`;
  console.log('hello world');
  $scope.selected = function() {
  }
})

.controller('YouTubeController', function($scope, GetFeed) {

  $scope.title = `facebook`;
  $scope.info = `1111111`;
  console.log('hello world');
  $scope.selected = function() {
  }
})

.controller(`IGController`, function ($scope, GetFeed) {

})
.controller(`TwtrController`, function ($scope, GetFeed) {
  $scope.title = `twitter`;
  $scope.tweets = [];
  $scope.authTwitter = () => GetFeed.authTwitter()
  $scope.twitterFeed = () => {
    GetFeed.twitterFeed().then(function(response) {
      console.log(response)
      $scope.tweets = response.data;
    }).catch(err => console.error(err));
  }

})
