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
          $scope.videos = $scope.videos.concat(channel.items.slice(0, 2));
          console.log($scope.videos,"sdasdasd");
        }
      }
      GetFeed.addNewest($scope.videos);
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
      console.log(response.data.data);
      $scope.photos = response.data.data;
      GetFeed.addNewest($scope.photos);
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
      // GetFeed.addNewest($scope.tweets);
      // if (GetFeed.mixedArray.length > 0){
      //   GetFeed.mixedArray.forEach(function(prop){
      //     if (prop.id > GetFeed.lastTweet){
      //       GetFeed.mixedArray = GetFeed.mixedArray.concat(prop);
      //     }
      //   })
      // } else {
      //   GetFeed.mixedArray = GetFeed.mixedArray.concat($scope.tweets);
      // }
      // GetFeed.lastTweet = response.data[response.data.length-1].id;
    }).catch(err => console.error(err));
  }
})

.controller(`MixedController`, function($scope, GetFeed){
  $scope.content = [];

  $scope.sortContent = (item) => {
    if(item.created_at || item.snippet){
      //if not instagram, then it is youtube
      var created_at = item.created_at === undefined ? item.snippet.publishedAt : item.created_at;
      var epoch = Date.parse(created_at)/1000;
    }
    console.log(epoch,"EPOCH");
    console.log(item.created_time,"INSTAGRAM");
    return -(epoch || item.created_time );
  }
  $scope.getFeeds = () => {
    GetFeed.twitterFeed().then(function(response) {
      $scope.content = $scope.content.concat(response.data);
    })

    GetFeed.instagramFeed().then(function(responseIns) {
      $scope.content = $scope.content.concat(responseIns.data.data);
    })

    GetFeed.youTubeFeed().then(function(response) {
      let channels = response.data;
      for (let channel of channels) {
        if (channel.items.length > 0) {
          $scope.content = $scope.content.concat(channel.items.slice(0, 2));
        }
      }
    })
  }


})
