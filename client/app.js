`use strict`;

angular.module(`sozaicApp`, [`ui.router`])

.controller(`FbController`, function($scope) {
  console.log(`controller fb`)
  $scope.title = `facebook`;
  $scope.info = `1111111`;
  console.log('hello world');
  $scope.selected = function() {
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state(`fbFeed`, {
      url: '/feed/facebook',
      templateUrl: `/pages/facebook.html`,
      controller: `FbController`

      // controller: function() {
      //   console.log('hey')
      // }
    })
})

.controller(`TwtrController`, function($scope) {
  $scope.title = `twitter`;
})
;
