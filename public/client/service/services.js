"use strict";

angular.module(`sozaicApp.serviceFactories`, [])

.factory(`GetFeed`, ($http, $window) => {
  let ytFeed = () => {
    console.log("inside factory")
    return $http({
      method: 'GET',
      url: 'api/youtube'
    })
  };
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
    //TODO: make like twitterFeed, to get data back from data
    //Do after auth user for FB
  }

  return {
    ytFeed : ytFeed,
    authTwitter: authTwitter,
    twitterFeed : twitterFeed,
    fbFeed: fbFeed,
    authFB: authFB
  }
});
