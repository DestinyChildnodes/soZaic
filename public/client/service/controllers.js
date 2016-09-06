"use strict";

angular.module(`sozaicApp.controller`, [`sozaicApp.serviceFactories`])

// .controller(`FbController`, function ($scope, GetFeed) {
//   console.log('hello FB Controller');
//   $scope.posts = [];
//   // $scope.profPic = ``;
//   $scope.specificAction = (dataObj) => {
//     console.log('spAc controller activated');
//     // console.log(type);
//     console.log(GetFeed.fbSpAction);
//     console.log(GetFeed.fbFeed);
//     GetFeed.fbSpAction(dataObj).then(function(resp) {
//       console.log(`FB spAct controllers `);
//       console.log(resp);
//       if (resp) {
//         console.log(resp);
//       }
//     }).catch(err => {
//           console.error(err);
//     })
//   }
//   $scope.authFB = () => GetFeed.authFB();
//   $scope.fbFeed = () => {
//     GetFeed.fbFeed().then(function(resp) {
//       console.log(`FB Feed Controller`);
//       console.log(resp);
//       if (resp) {
//         /* TODO:
//         videos
//         new Date('2016-08-31T03:01:32+0000').getTime()
//         */
//         $scope.posts = resp.data.postsData;
//         $scope.profPic = resp.data.profPic.url;
//       }
//     }).catch(err =>{
//         console.error(err);
//     })
//   }
// })

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
        }
      }
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
