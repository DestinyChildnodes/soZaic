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
      template: `<div>hello</div>`,
      // controller: `FbController`

      controller: function() {
        console.log('hey')
      }
    })
})

.controller(`TwtrController`, function($scope) {
  $scope.title = `twitter`;
})
;
