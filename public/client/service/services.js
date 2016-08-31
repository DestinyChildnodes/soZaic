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
      url: `api/facebook/feed`
    }).then(resp => {
      console.log(resp);
      return resp;
    }).catch( err => console.error(err) )

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

  return {
    authTwitter: authTwitter,
    fbFeed: fbFeed,
    authFB: authFB,
    authYouTube : authYouTube,
    youTubeFeed : youTubeFeed,
    twitterFeed : twitterFeed
  }
});
