var app= angular.module('Ap');

app.controller('Pedidos', function ($scope,$resource) {
  var api=$resource('/api/user_data').get().$promise.then(function (user) {

    if(!user.success) window.location="/index.html";
    $scope.pedidos=$resource('/users/'+user.id+'/pedidos').query(function () {
console.log($scope.pedidos.length)
          if($scope.pedidos.length==0)
          {
            $('#ale').css('display','initial')
            $('#showpedidos').css('display','none')
          }
          else {
            if($scope.baucher!="sin baucher")
            {

            }
          }
        })
    });




});
