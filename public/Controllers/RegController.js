var app= angular.module('Ap');

app.controller('Registrar', function ($scope,$resource,$filter) {

  $scope.valores=function()
  {
    if(validar())
    {
      var date=$filter('date')(new Date($scope.birthdate),'yyyy-MM-dd');
      $scope.birthdate=date
      var api=$resource('/reg');
      api.save({
        nombre:$scope.nom,
        apep:$scope.ap,
        apem:$scope.am,
        tel:$scope.phone,
        direccion:$scope.dire,
        emaill:$scope.email,
        birth:$scope.birthdate,
        direff:$scope.diref,
        rfcn:$scope.rfc,
        sex:$scope.sexo,
        username:$scope.user,
        password:$scope.pass

      },function (res) {


        if(res.session)
        {
          var api=$resource('/login');
          api.save({
            username:res.user,
            password:res.pass
          },function(res){

            window.location='/index.html';

          })
        }
      }

    )
  }
  else {
    $('#ale').css('display','initial')
  }
}

function validar() {
  if($scope.nom==undefined) return false;
  if($scope.ap==undefined) return false;
  if($scope.am==undefined) return false;
  if($scope.phone==undefined) return false;
  if($scope.nom==undefined) return false;
  if($scope.dire==undefined) return false;
  if($scope.email==undefined) return false;
  if($scope.birthdate==undefined) return false;
  if($scope.diref==undefined) return false;
  if($scope.rfc==undefined) return false;
  if($scope.sexo==undefined) return false;
  if($scope.user==undefined) return false;
  if($scope.pass==undefined) return false;

  return true;

}




})
