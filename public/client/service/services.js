angular.module(`sozaicApp.serviceFactories`, [])

.factory(`GetFeed`, function($http, $window){
  let ytFeed = function(){
    console.log("inside factory")
    return $http({
      method: 'GET',
      url: 'api/youtube'
    })
  };
  let authTwitter = function(){
    //  $http({
    //   method: `GET`,
    //   url: `api/twitter/auth`
    // }).then((response) => {
    //   console.log("inside twitterFeed")
    //   return response;
    // })
    $window.location.href = "http://" + $window.location.host + "/api/twitter/auth";

    //http://localhost:8080/api/twitter/auth/
    // callback();
  };

  let twitterFeed = function(){
    return $http({
      method: 'GET',
      url: 'api/twitter/feed'
    }).then((response) => {
      console.log("inside twitterFeed")
      console.log(response);
      return response;
    })
  };

  return {
    ytFeed : ytFeed,
    authTwitter: authTwitter,
    twitterFeed : twitterFeed
  }
});
