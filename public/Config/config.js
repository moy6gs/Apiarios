
 var app = angular.module('Ap', ['ngResource','ngRoute']);
 app.config(function($routeProvider ,$locationProvider) {


     $routeProvider
     .when("/", {
          templateUrl: "main.html",
          controller: "Home"
     })

     .when("/registrar", {
         templateUrl : "registrar.html",
         controller: "Registrar"

     })
     .when("/comprar/:flor",{
       templateUrl : "comprar.html",
       controller: "Comprar"
     })
     .when("/login",{
       templateUrl : "login.html",

     })
     .when("/pedidos",{
          templateUrl : "pedidos.html",
          controller  : "Pedidos"
     })
     .when("/cambiarcontraseña",{
          templateUrl : "cambiarcontraseña.html",
          controller  : "newpass"
     })
     .when("/compraexitosa/:total/:cantidad",{
       templateUrl : "compraexitosa.html",
       controller : "compraexitosa"
     })
     .when("/productos",{
       templateUrl : "_productos.html",
       controller : "Home"
     })
     .when("/contacto",{
       templateUrl : "_contacto.html",
       controller : "Home"
     })

 });
