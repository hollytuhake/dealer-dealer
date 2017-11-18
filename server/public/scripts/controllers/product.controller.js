myApp.controller('ProductController', ['$http', 'UserService', function ($http, UserService) {
    console.log('ProductController created');
    var vm = this;
    vm.userService = UserService;

    var vm = this;
    vm.userService = UserService;
    vm.showForm = false;

       //GET ROUTES -- get products for DOM
    vm.getProducts = function () { //getting data
        console.log('in getProducts');
        $http.get('/products').then(function (response) {
            vm.products = response.data;
        });
    }

    vm.showFormClick = function () {
        vm.showForm = !vm.showForm;
    }

    vm.getProducts();
}]);