"use strict";

angular.module(`sozaicApp.controller`, [`sozaicApp.serviceFactories`])

.controller('YouTubeController', function($scope, GetFeed) {
  $scope.title = `youtube`;
  $scope.videos = [];
  $scope.authYouTube = () => GetFeed.authYouTube();
  $scope.youTubeFeed = function() {
    GetFeed.youTubeFeed().then(function(response) {
      let channels = response.data;
      // console.log(response.data)
      for (let channel of channels) {
        if (channel.items.length > 0) {
          $scope.videos = $scope.videos.concat(channel.items);
          console.log($scope.videos,"sdasdasd");
        }
      }
      GetFeed.mixedArray = GetFeed.mixedArray.concat($scope.videos);
    })

  }
  //
  // $scope.getIframeSrc = function (videoId) {
  //   return 'https://www.youtube.com/embed/' + videoId;
  // };
})

 .filter('youtubeEmbedUrl', function ($sce) {
    return function(video) {
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed?listType=playlist&list=' + video.id);
    };
  })

.controller(`IGController`, function ($scope, GetFeed) {
  $scope.title = `Instagram`;
  $scope.photos = [];
  $scope.authInstagram = () => GetFeed.authInstagram();
  $scope.instagramFeed = () => {
    GetFeed.instagramFeed().then(function(response) {
      $scope.photos = response.data.data;
      GetFeed.mixedArray = GetFeed.mixedArray.concat($scope.photos);
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
      GetFeed.mixedArray = GetFeed.mixedArray.concat($scope.tweets);
    }).catch(err => console.error(err));
  }
})

.controller(`MixedController`, function($scope, GetFeed){
  $scope.content = [];
  $scope.loadContent = () => {
    $scope.content = GetFeed.mixedArray;
    console.log("MixedController",$scope.content);
  }
  $scope.sortContent = (item) => {
    if(item.created_at || item.snippet){
      var created_at = item.created_at === undefined ? item.snippet.publishedAt : item.created_at;
      var epoch = Date.parse(created_at)/1000;
    }
    console.log(epoch,"EPOCH");
    console.log(item.created_time,"INSTAGRAM");
    return -(epoch || item.created_time );
  }
})
