var app= angular.module('Ap');

app.controller('Comprar', function ($scope,$resource,$routeParams) {

$scope.total=0;
  var flor=$routeParams.flor;

  $scope.flor=flor;
  var api=$resource("/api/user_data").get().$promise.then(function(user) {
    $scope.user="Iniciar Sesion"
    if(user.success)
    {
      $scope.user=user.username;
      $('#ale').css('display','none');
    }
  })

  var api=$resource('/precios/'+flor).get().$promise.then(function(data){

      $scope.precioflor=data.precio;

  });

  $scope.calc=function() {
    $scope.total=$scope.cantidad*$scope.precioflor;
  }

  $scope.pedir=function () {

    if(validar())
    {

    var api=$resource('/pedidos');
    $scope.fecha="2018-07-28";
    api.save({
      dire:$scope.direccionenv,
      amount:$scope.total,
      date:$scope.fecha,
      cant:$scope.cantidad,
      flor:$scope.flor
    },function (res) {
      window.location="/"+res.redire;
    })
  }
  else {
    $('#ale2').css('display','initial');
  }
  }

  function validar() {

    if($scope.direccionenv==undefined) return false;
    if($scope.cantidad==undefined) return false;
    if($scope.fecha==undefined) return false;

      return true;
  }



});
