`use strict`;

angular.module(`sozaicApp`, [`sozaicApp.controller`,`sozaicApp.serviceFactories`, `ui.router`])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state(`fbFeed`, {
      url: `/feed/facebook`,
      templateUrl: `/pages/facebook/facebook.html`,
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
;
