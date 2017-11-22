myApp.controller('OrderController', ['$http', 'UserService', function ($http, UserService) {
    console.log('OrderController created');
    var vm = this;
    vm.userService = UserService;
    vm.showOrders=true;
    vm.showOrderForm=false;
    vm.showUpdateForm = false
    vm.orderToUpdate = {};

    vm.showOrderFormClick = function (){
        console.log('in showOrderFormClick');
        vm.showOrderForm = !vm.showOrderForm;
    }

    vm.showUpdateFormClick = function(order){
        console.log('in showUpdateFormClick');
        vm.orderToUpdate = order
        vm.showOrders = !vm.showOrders
        vm.showUpdateForm = !vm.showUpdateForm;
    }

    //    GET ROUTES -- get orders for DOM
    vm.getDealers = function () { //getting data
        console.log('in getOrders');
        $http.get('/orders').then(function (response) {
            vm.orders = response.data;
        });
    }

    vm.getDealers();
}]);