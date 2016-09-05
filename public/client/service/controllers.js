"use strict";

angular.module(`sozaicApp.controller`, [`sozaicApp.serviceFactories`])

.controller(`FbController`, function ($scope, GetFeed) {
  $scope.posts = [];
  $scope.specificAction = (dataObj) => {

    GetFeed.fbSpAction(dataObj).then(function(resp) {

      if (resp) {
        console.log(resp);
      }
    }).catch(err => {
          console.error(err);
    })
  }
  $scope.authFB = () => GetFeed.authFB();
  $scope.fbFeed = () => {
    GetFeed.fbFeed().then(function(resp) {

      if (resp) {
        $scope.posts = resp.data;
      }
    }).catch(err =>{
        console.error(err);
    })
  }
})

.controller('YouTubeController', function($scope, GetFeed) {
  $scope.title = `youtube`;
  $scope.videos = [];

  $scope.authYouTube = () => GetFeed.authYouTube();
  $scope.youTubeFeed = function() {
    GetFeed.youTubeFeed().then(function(response) {
      let channels = response.data.items;
      for (let video of channels) {
        $scope.videos.push(video.id.videoId);
      }
      console.log($scope.videos);
    })
  }
  //
  // $scope.getIframeSrc = function (videoId) {
  //   return 'https://www.youtube.com/embed/' + videoId;
  // };
})

 .filter('youtubeEmbedUrl', function ($sce) {
    return function(videoId) {
      return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId);
    };
  })

.controller(`IGController`, function ($scope, GetFeed) {
  $scope.title = `Instagram`;
  $scope.photos = [];
  $scope.authInstagram = () => GetFeed.authInstagram();
  $scope.instagramFeed = () => {
    GetFeed.instagramFeed().then(function(response) {
      $scope.photos = response.data.data;
    })
  }
})

.filter('instagramEmbedUrl', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url + "embed");
  };
})

.controller(`TwtrController`, function ($scope, GetFeed) {
  $scope.title = `twitter`;
  $scope.tweets = [];
  $scope.authTwitter = () => GetFeed.authTwitter();
  $scope.twitterFeed = () => {

    GetFeed.twitterFeed().then(function(response) {
      $scope.tweets = response.data;
    }).catch(err => console.error(err));
  }
})
