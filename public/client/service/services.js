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
    //http://localhost:8080/api/twitter/auth/
    $window.location.href = "http://" + $window.location.host + "/api/twitter/auth";
  };

  let twitterFeed = () => {
    return $http({
      method: 'GET',
      url: 'api/twitter/feed'
    }).then((response) => {
      console.log(response);
      return response;
    }).catch(err => {console.error(err)})
  };

  return {
    ytFeed : ytFeed,
    authTwitter: authTwitter,
    twitterFeed : twitterFeed
  }
});
