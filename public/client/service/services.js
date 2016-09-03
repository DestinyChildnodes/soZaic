"use strict";

angular.module(`sozaicApp.serviceFactories`, [])

.factory(`GetFeed`, ($http, $window) => {
  let authTwitter = () => {
    console.log(`inside twitter factory`);
    //http://localhost:8080/api/twitter/auth/
    $window.location.href = "http://" + $window.location.host + "/api/twitter/auth";
  };

  let authFB = () => {
    console.log(`inside authFB factory`);
    $window.location.href = `http://${window.location.host}/api/facebook/auth`;
  }

  let twitterFeed = () => {
    return $http({
      method: 'GET',
      url: 'api/twitter/feed'
    }).then((response) => {
      console.log(response);
      return response;
    }).catch(err => {console.error(err)})
  };

  let fbFeed = () => {
    console.log(`inside FB factory`);
    return $http({
      method: `GET`,
      data: `yodata`,
      params: {"key": "yoparams"},
      url: `api/facebook/feed`
    }).then(resp => {
      console.log(`FBFeed resp`, resp);
      return resp;
    }).catch( err => {
      console.log(`factory FB Feed error`);
      console.error(err)
    })
  };

  // function fbSpAction () {
  //   console.log(`inside FB factory`);
  //   return $http({
  //     method: `GET`,
  //     data: `yodata`,
  //     params: {"key": "yoparams"},
  //     url: `api/facebook/feed`
  //   }).then(resp => {
  //     console.log(`FBFeed resp`, resp);
  //     return resp;
  //   }).catch( err => {
  //     console.log(`factory FB Feed error`);
  //     console.error(err)
  //   })
  // };

  let fbSpAction = (dataObj) => {
    return $http({
      method: 'GET',
      url: 'api/facebook/feed/specific',
      params: dataObj
    }).then((response) => {
      console.log("inside factory fbSpec", response);
      return response
    }).catch( err => {
      console.log(`factory FB SP Action`);
      console.error(err)
    })
  };

  let authYouTube = () => {
    $window.location.href = "http://" + $window.location.host + "/api/youTube/auth";
  }
  let youTubeFeed = () => {
    return $http({
      method: 'GET',
      url: 'api/youTube/feed'
    }).then((response) => {
      console.log("inside factory ytfeed", response);
      return response
    });
  }

  let authInstagram = () => {
    $window.location.href = "http://" + $window.location.host + "/api/instagram/auth";
  }

  let instagramFeed = () => {
    return $http({
      method: `GET`,
      url: `api/instagram/feed`
    }).then(res => {
      return res;
    })
  }

  return {
    authTwitter: authTwitter,
    fbFeed: fbFeed,
    authFB: authFB,
    authYouTube : authYouTube,
    youTubeFeed : youTubeFeed,
    twitterFeed : twitterFeed,
    authInstagram : authInstagram,
    instagramFeed : instagramFeed,
    fbSpAction
  }
});
