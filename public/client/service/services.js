angular.module(`sozaicApp.serviceFactories`, [])

.factory(`GetFeed`, function($http, $window){
  let ytFeed = function(){
    console.log("inside factory")
    return $http({
      method: 'GET',
      url: 'api/youtube'
    })
  };
  let authTwitter = function(callback){
    $window.location.href = "http://" + $window.location.host + "/api/twitter/auth";
    callback();
  };

  let twitterFeed = function(){
    return $http({
      method: 'GET',
      url: 'api/twitter/feed'
    }).then((response) => {
      console.log("inside twitterFeed")
      return response;
    })
  };

  return {
    ytFeed : ytFeed,
    authTwitter: authTwitter,
    twitterFeed : twitterFeed
  }
});
