angular.module(`sozaicApp.serviceFactories`, [])
.factory(`GetFeed`, function($http){
  let ytFeed = function(){
    console.log("inside factory")
    return $http({
      method: 'GET',
      url: 'api/youtube'
    })
  };
  let twitterFeed = function(){
    return $http({
      method: 'GET',
      url: 'api/twitter'
    })
  }

  return {
    ytFeed : ytFeed,
    twitterFeed : twitterFeed
  }
});