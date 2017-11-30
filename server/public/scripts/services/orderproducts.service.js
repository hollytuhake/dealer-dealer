myApp.service('OrderProductsService', ['$http', 'UserService', function ($http, UserService) {
    console.log('OrderProductsService created');
    var vm = this;
    vm.userService = UserService;
    vm.orderProducts = {};
    vm.testOs = 'orderproductservicegettingthere';
    vm.orderProductToAdd = {};
    vm.ordersForAddOrderProducts = {};

    //    GET ROUTES -- get orders for DOM
    vm.getOrderProducts = function () { //getting data
        console.log('in getOrderProducts');
        $http.get('/orderproducts').then(function (response) {
            vm.ordersForAddOrderProducts = response.data;
            console.log(vm.ordersForAddOrderProducts);
            var latest = Math.max.apply(Math, vm.ordersForAddOrderProducts.map(function (o) { return o.id }));
            console.log(latest);
            vm.orderId = latest;
        });
    }

    vm.addOrderProducts = function (orderId, products){
        for (i = 0; i < products.length; i += 1) {
            vm.orderProductToAdd = {
                quantity: products[i].quantity,
                order_id: vm.orderId,
                product_id: products[i].id
            };
            console.log(vm.orderProductToAdd);
            $http.post('/orderproducts', vm.orderProductToAdd).then(function (req, res) {
                console.log('adding order quantities');
            }).catch(function (err) {
                console.log('Add Quantities Failed!');
                alert('Order Quantities failed, try again.');
            });
        }
        alert('Order Quantities Added');
    }

    vm.getOrderProducts();
}]);