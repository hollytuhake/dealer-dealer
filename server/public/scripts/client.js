var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'md.data.table']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/dealers', {
      templateUrl: 'views/templates/dealers.html',
      controller: 'DealerController as dc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/orders', {
      templateUrl: 'views/templates/orders.html',
      controller: 'OrderController as oc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/products', {
      templateUrl: 'views/templates/products.html',
      controller: 'ProductController as pc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    }) 
    .otherwise({
      redirectTo: 'home'
    });
});
