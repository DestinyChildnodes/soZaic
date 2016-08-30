angular.module(`caller`, [])

.factory(`TwitterCaller`, function($http) {
  const getData = function() {
    $http({
      method: `GET`,
      url: `/api/twitter`
    }).then(function successCallback(resp) {
      console.log(resp);
      return resp;
    })/*, function errorCallback(resp) {
      console.log(resp);
    }*/
  }

  return {
    getData: getData
  };
})
