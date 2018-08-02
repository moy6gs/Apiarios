var app= angular.module('Ap');

app.controller('newpass', function ($scope,$resource) {

  var api=$resource("/api/user_data").get().$promise.then(function(user) {

    $scope.user=user.username;
    $scope.id=user.id;
    console.log("el id "+$scope.id)
    if(!user.success) window.location="/index.html";

  })

  $scope.cambiar=function() {

    var User=$resource('/users/'+$scope.id, null, {
      update: {method: 'PUT'}
    });

    var user=User.get().$promise.then(function(user){

      if(user.password==$scope.oldpass)
      {
        user.password=$scope.newpass;
        user.oldpass=$scope.oldpass;
        if($scope.newpass==$scope.confirm)
        {
          user.$update(function (response) {
            console.log(response)
            $('#cambiada').addClass('valid-feedback d-block')
          });
        }else {
          $('#errorconfirmar').addClass('invalid-feedback d-block')
        }
      }else {
        {console.log('hey')
        $('#erroractual').addClass('invalid-feedback d-block')
      }
    }

  });



}




})
