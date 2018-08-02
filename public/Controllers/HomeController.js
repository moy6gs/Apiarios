var app= angular.module('Ap');

app.controller('Home', function($scope,$resource){
  var api=$resource("/api/user_data").get().$promise.then((user)=> {
    if(user.success)
    {
      $scope.user=user.username;
      $scope.id=user.id;
      $('#menu').css("display", "none");
      $('#logd').css("display", "initial");
      $('#com').css("display","initial")

    }
  })
  var api=$resource('/precios').get().$promise.then(function(precios){
    $scope.preciomezquite=precios.mezquite;
    $scope.preciocampo=precios.campo;
  });

  var api=$resource('/comentarios');
  $scope.comentarios=api.query();

  $scope.comentar=function() {
  console.log("se"+$scope.user)
  var comentario={
    user:$scope.user,
    id:$scope.id,
    descripcion:$scope.comentario
  };
  console.log(comentario)
  var send=$resource('/comentarios').save(comentario,function (res) {

    console.log(res)
    $scope.comentarios.push(comentario)
  })
  }


});
