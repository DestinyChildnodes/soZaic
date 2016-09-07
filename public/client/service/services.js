"use strict";


angular.module(`sozaicApp.serviceFactories`, [])

.factory(`GetFeed`, ($http, $window) => {
  let mixedArray = [];
  // latest timestamp of last thing of same type
  let lastTweet = 0;


  let addNewest = (arr) => {
    console.log("CALLED ADD NEWESTTTT")
    let isYoutube = false;
    console.log('called add nestesetesfsd')
    var property;
    // this checks the type of media object
    if (arr[0].created_at){
      property = `created_at`;
    } else if (arr[0].snippet){
      property = `snippet.publishedAt`;
      isYoutube = true;
    } else if (arr[0].created_time){
      property = `created_time`;
    }
    let isAlreadyType = false;
    if (mixedArray.length > 0){
      mixedArray.forEach(function(prop){
        console.log("HELLLOOOOOO", mixedArray);
        // if (property === `created_at` || property === `snippet.publishedAt`){
        //    prop[property] = Date.parse(prop[property])/1000;
        // }

        console.log(prop[property], lastTweet);
        if(property === `snippet.publishedAt` && prop['snippet']) {
          if (prop['snippet']['publishedAt'] > lastTweet){
            lastTweet = prop['snippet']['publishedAt'];
            isAlreadyType = true;
            console.log('identified youtube thing')
          }
        } else {
          if (prop[property] && prop[property] > lastTweet){
            lastTweet = prop[property];
            isAlreadyType = true;
          }
        }
      })
    }

    if(!isAlreadyType) {
      lastTweet = 0;
    }
      // mixedArray = mixedArray.concat(arr);
    arr.forEach(function(item) {
      if(isYoutube) {
        console.log('it is a youtube item', lastTweet, item['snippet']['publishedAt'])
        if(Date.parse(item['snippet']['publishedAt'])/1000 > lastTweet) {
          console.log('passed the test');
          mixedArray.push(item);
        }
      } else if (property === `created_at`){
        if (Date.parse(item[property])/1000 > lastTweet){
          mixedArray.push(item)
        }
      }else {
        if(item[property] > lastTweet) {
          mixedArray.push(item);
        }
      }
    })

    console.log('final mixed array', mixedArray)
    // lastTweet = arr[arr.length-1][property];
  }

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
      console.log(response);
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
      // console.log(response)
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
    fbSpAction : fbSpAction,
    mixedArray: mixedArray,
    addNewest : addNewest,
    lastTweet : lastTweet,
  fbPostFactory
  }
});
