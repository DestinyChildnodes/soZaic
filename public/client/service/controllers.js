"use strict";

angular.module(`sozaicApp.controller`, [`sozaicApp.serviceFactories`])

.controller(`FbController`, function ($scope, GetFeed) {
  console.log('hello FB Controller');
  $scope.posts = [];
  $scope.authFB = () => GetFeed.authFB();
  $scope.fbFeed = () => {
    GetFeed.fbFeed().then(function(resp) {
      console.log(`FB Feed Controller`);
      console.log(resp);
      if (resp) {
        $scope.posts = resp.data;
      }
      //TODO: make like TwtrController, to handle data coming in
    }).catch(err =>{
        console.error(err);
    })
  }
})

.controller('YouTubeController', function($scope, GetFeed) {
  $scope.title = `youtube`;
  $scope.videos = [];
  console.log('hello world');
  $scope.authYouTube = () => GetFeed.authYouTube();
  $scope.youTubeFeed = function() {
    GetFeed.youTubeFeed().then(function(response) {
      $scope.videos = response.data.items;
      console.log("This is controller", $scope.videos);
    })
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
      console.log(response);
      $scope.tweets = response.data;
    }).catch(err => console.error(err));
  }

})
