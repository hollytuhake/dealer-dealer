myApp.service('OrderProductsService', ['$http', 'UserService', function ($http, UserService) {
    console.log('OrderProductsService created');
    var vm = this;
    vm.userService = UserService;
    vm.orderProducts = {};
    vm.testOs = 'orderproductservicegettingthere';

    //    GET ROUTES -- get orders for DOM
    vm.getOrderProducts = function () { //getting data
        console.log('in getOrderProducts');
        $http.get('/orderproducts').then(function (response) {
            vm.orderProducts = response.data;
            console.log(vm.orderProducts);
        });
    }
    vm.getOrderProducts();

}]);