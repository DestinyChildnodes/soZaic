"use strict";

angular.module(`sozaicApp.controller`, [`sozaicApp.serviceFactories`])

.controller(`FbController`, function ($scope, GetFeed) {

  $scope.title = `facebook`;
  $scope.info = `1111111`;
  console.log('hello world');
  $scope.authFB = () => GetFeed.authFB();
  $scope.fbFeed = () => {
    GetFeed.fbFeed().then(function(resp) {
      console.log(resp);
      //TODO: make like TwtrController, to handle data coming in
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
  $scope.title = `Instagram`;
  $scope.photos = [];
  $scope.authInstagram = () => GetFeed.authInstagram();
  $scope.instagramFeed = () => {
    GetFeed.instagramFeed().then(function(response) {
      console.log(response.data.data)
      $scope.photos = response.data.data;
    })
  }
})

.controller(`TwtrController`, function ($scope, GetFeed) {
  $scope.title = `twitter`;
  $scope.tweets = [];
  $scope.authTwitter = () => GetFeed.authTwitter();
  $scope.twitterFeed = () => {
    GetFeed.twitterFeed().then(function(response) {
      console.log(response);
      $scope.tweets = response.data;
    }).catch(err => console.error(err));
  }

})
