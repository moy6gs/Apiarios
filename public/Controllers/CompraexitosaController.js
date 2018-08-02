var app= angular.module('Ap');

app.controller('compraexitosa', function ($scope,$resource,$routeParams) {
  
  var total =$routeParams.total;
  var cantidad= $routeParams.cantidad;
  $scope.cantidad=cantidad;
  $scope.total=total;

})
