"use strict";

/* Useful links:
https://developers.facebook.com/tools/explorer/665947800248819?method=GET&path=me%2Fvideos%3Ffields%3Ddescription%2Cupdated_time%2Cid%2Cembed_html&version=v2.7
http://www.barelyfitz.com/screencast/html-training/css/positioning/
https://developers.facebook.com/docs/graph-api/reference/v2.7/user/feed
*/

angular.module(`sozaicApp.fbController`, [`sozaicApp.serviceFactories`, `ngSanitize`])

.controller(`FbController`, function ($scope, GetFeed, $sce) {
  console.log('hello FB Controller');
  $scope.posts = [];
  $scope.allPosts = [];
  function integrateVids(all) {
    if (all.videos.data.length) {
      console.log('videos present: ', all.videos.data);

      all.videos.data.forEach((vid, iV, vidsArr) => {
        vid.created_time = vid.updated_time;
        let vidEpoch = new Date(vid.created_time).getTime();
        console.log(vidEpoch);
        let last = true;
        all.postsData.forEach((post, iPost, postsArr) => {
          let postEpoch = new Date(post.created_time).getTime();
          console.log(postEpoch);
          if (vidEpoch > postEpoch) {
            postsArr.splice(iPost, 0, vid);
            last = false;
          }
          if (last && iPost === postsArr.length - 1) {
            postsArr.push(vid);
          }
        })
      })
    } //end of if()
    console.log(all);
  };

  function setProfPic(all){
    all.forEach((post, i, arr) => {
      if (post.from) {
        post.profUrl = post.from.picture.data.url
      } else {
        post.profUrl = $scope.profPic;
     }
    })
  };

  $scope.authFB = () => GetFeed.authFB();
  $scope.fbFeed = () => {
    GetFeed.fbFeed().then(function(resp) {
      console.log(`FB Feed Controller`);
      console.log(resp);
      if (resp) {
        integrateVids(resp.data);
        $scope.profPic = resp.data.profPic.url;
        setProfPic(resp.data.postsData);
        /* TODO:
        videos
        new Date('2016-08-31T03:01:32+0000').getTime()
        */
        $scope.posts = resp.data.postsData;
      }
    }).catch(err =>{
        console.error(err);
    })
  }
})

.filter('trustUrl', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
})

// $scope.specificAction = (dataObj) => {
//   console.log('spAc controller activated');
//   // console.log(type);
//   console.log(GetFeed.fbSpAction);
//   console.log(GetFeed.fbFeed);
//   GetFeed.fbSpAction(dataObj).then(function(resp) {
//     console.log(`FB spAct controllers `);
//     console.log(resp);
//     if (resp) {
//       console.log(resp);
//     }
//   }).catch(err => {
//         console.error(err);
//   })
// }
;
