"use strict";

angular.module(`sozaicApp`, [`sozaicApp.controller`,`sozaicApp.serviceFactories`, `sozaicApp.fbController`, `ui.router`])
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state(`fbFeed`, {
      url: `/feed/facebook`,
      templateUrl: `/pages/facebook.html`,
      controller: `FbController`
    })
    .state(`youTubeFeed`, {
      url: `/feed/youtube`,
      templateUrl: `/pages/youtube/youtube.html`,
      controller: `YouTubeController`
    })
    .state(`igFeed`, {
      url: `/feed/instagram`,
      templateUrl: `/pages/instagram.html`,
      controller: `IGController`
    })
    .state(`twitterFeed`, {
      url: `/feed/twitter`,
      templateUrl: `/pages/twitter.html`,
      controller: `TwtrController`
    })
})
