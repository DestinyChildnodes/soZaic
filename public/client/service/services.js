"use strict";


angular.module(`sozaicApp.serviceFactories`, [])

.factory(`GetFeed`, ($http, $window) => {

  let authTwitter = () => {
    //http://localhost:8080/api/twitter/auth/
    $window.location.href = "http://" + $window.location.host + "/api/twitter/auth";
  };

  let authFB = () => {
    $window.location.href = `http://${window.location.host}/api/facebook/auth`;
  }

  let twitterFeed = () => {
    return $http({
      method: 'GET',
      url: 'api/twitter/feed'
    }).then((response) => {
      return response;
    }).catch(err => {console.error(err)})
  };

  let fbFeed = () => {
    return $http({
      method: `GET`,
      data: `yodata`,
      params: {"key": "yoparams"},
      url: `api/facebook/feed`
    }).then(resp => {
      return resp;
    }).catch( err => {
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

  const fbPostFactory = (input) => {
    return $http({
      method: `POST`,
      url: `api/facebook/feed/post`,
      data: { newPost: input }
    }).then( (resp) => {
      console.log(`fbPostFactory success`);
      console.log(resp);
    })
  }

  let fbSpAction = (dataObj) => {
    return $http({
      method: `GET`,
      url: `api/facebook/feed/specific`,
      params: dataObj
    }).then((response) => {
      return response
    }).catch( err => {
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

  // let twitterFormat = (username, id) => {
  //   return $http({
  //     method: `GET`,
  //     url: `https://publish.twitter.com/oembed?url=https://twitter.com/`+username+`/status/`+id
  //   }).then(res => {
  //     console.log(res.html)
  //     return res.html;
  //
  //   })
  // }

  return {
    authTwitter: authTwitter,
    fbFeed: fbFeed,
    authFB: authFB,
    authYouTube : authYouTube,
    youTubeFeed : youTubeFeed,
    twitterFeed : twitterFeed,
    authInstagram : authInstagram,
    instagramFeed : instagramFeed,
    // twitterFormat : twitterFormat,
    fbSpAction : fbSpAction
  }
});
