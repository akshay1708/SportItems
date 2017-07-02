angular.module("sportsStore") 
  .controller("sportsStoreCtrl", function ($scope,$http) {
        $scope.data = {};

          $http.get('http://localhost:5000/api/products')
      .then(function (data) {
       console.log(data.data.data);
      $scope.data.products = data.data.data;
  })
  ,(function (error) {
  $scope.data.error = error;
  });

});
