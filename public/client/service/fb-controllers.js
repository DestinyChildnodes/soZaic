"use strict";

angular.module(`sozaicApp.fbController`, [`sozaicApp.serviceFactories`])

.controller(`FbController`, function ($scope, GetFeed) {
  console.log('hello FB Controller');
  $scope.posts = [];
  // $scope.profPic = ``;
  $scope.specificAction = (dataObj) => {
    console.log('spAc controller activated');
    // console.log(type);
    console.log(GetFeed.fbSpAction);
    console.log(GetFeed.fbFeed);
    GetFeed.fbSpAction(dataObj).then(function(resp) {
      console.log(`FB spAct controllers `);
      console.log(resp);
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
      console.log(`FB Feed Controller`);
      console.log(resp);
      if (resp) {
        /* TODO:
        videos
        new Date('2016-08-31T03:01:32+0000').getTime()
        */
        $scope.posts = resp.data.postsData;
        $scope.profPic = resp.data.profPic.url;
      }
    }).catch(err =>{
        console.error(err);
    })
  }
})
