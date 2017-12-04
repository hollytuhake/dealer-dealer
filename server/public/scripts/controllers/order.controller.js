myApp.controller('OrderController', ['$http', 'UserService','OrderProductsService', 'ProductService', function ($http, UserService, OrderProductsService, ProductService) {
    console.log('OrderController created');
    var vm = this;
    vm.userService = UserService;
    vm.ops = OrderProductsService;
    vm.productService = ProductService;
    vm.showOrders=true;
    vm.showOrderForm=false;
    vm.showOrderProductsForm = false;
    vm.showUpdateForm = false
    vm.orderToUpdate = {};
    vm.orderProducts = {};
    vm.products = {};
    vm.orderToAdd = {};
    vm.orderProductsToAdd = {
        quantity: 0,
    }
    vm.orderId = 0;
    vm.showStart = true;

   // SweetAlert.success(title, message);

    console.log(vm.productService.testPs);
    console.log(vm.ops.testOs);
    
    vm.showOrderFormClick = function (){
        console.log('in showOrderFormClick');
        vm.showOrderForm = !vm.showOrderForm;
        vm.showStart = !vm.showStart;
        vm.showOrders = !vm.showOrders;
    }

    vm.showUpdateFormClick = function(order){
        console.log('in showUpdateFormClick');
        vm.orderToUpdate = order
        vm.showOrders = !vm.showOrders
        vm.showUpdateForm = !vm.showUpdateForm;
        vm.showStart = !vm.showStart;
    }

    vm.showOrderProductsFormClick = function(){
        vm.showOrderForm = !vm.showOrderForm;
        vm.showOrderProductsForm = !vm.showOrderProductsForm;
        vm.ops.getOrderProducts();
    }

    //    GET ROUTES -- get orders for DOM
    vm.getOrders = function () { //getting data
        console.log('in getOrders');
        $http.get('/orders').then(function (response) {
            vm.orders = response.data;
            vm.ops.getOrderProducts();
            vm.getProducts();
        }).then(function(){
            console.log(vm.orders);
            vm.orderProducts = vm.ops.orderProducts;
            console.log(vm.orderProducts);
            vm.products = vm.productService.products;
            console.log(vm.products);
            console.log(vm.orders);
            for(i=0; i<vm.orders.length; i+=1){
                vm.orders[i].shipby = moment(vm.orders[i].dateordered).add(vm.orders[i].quotedlead, 'days').format('MM/DD/YY');
            }
        });
    }

    vm.getProducts = function () {
        ProductService.getProducts().then(function (response) {
            vm.products = response.data;
        })
    }


    //    POST ROUTES -- post new order
    vm.addOrder = function (orderToAdd) {
        console.log('in addOrder');
        console.log(orderToAdd);
        $http.post('/orders', orderToAdd).then(function (req, res) {
            console.log('adding order');
        }).then(function(orderToAdd){
            vm.showOrderProductsFormClick();
        }).catch(function (err) {
            console.log('Add Order Failed!');
            alert('Order add failed, try again.');
        });
    }

    vm.addOrderProducts = function (orderId, products) {
        vm.ops.addOrderProducts(vm.orderId, vm.products);
        vm.getOrders();
        vm.showStart = !vm.showStart;
        vm.showOrderProductsForm = !vm.showOrderProductsForm;
        vm.showOrders = !vm.showOrders
    }

    vm.deleteOrder = function (orderId) {
        console.log('in deleteOrder');
        console.log(orderId);
        $http.delete('/orders/' + orderId).then(function (req, res) {
            console.log('deleting order');
            alert('Order Deleted');
            vm.getOrders();
        }).catch(function (err) {
            console.log('delete Order Failed!');
            alert('Delete order failed, try again.');
        });
    }

    vm.updateOrder = function (updatingOrder) {
        console.log('update order submit clicked');
        $http.put('/orders/' + updatingOrder.id, updatingOrder).then(function (req, res) {
            alert('Order Updated');
            vm.getOrders();
        }).catch(function (err) {
            console.log('Update Order Failed!');
            alert('Update Order failed, try again.');
        });
        console.log("order to update", updatingOrder);
        vm.showOrders = !vm.showOrders
        vm.showUpdateForm = !vm.showUpdateForm;
        vm.showStart = !vm.showStart;
    }

    vm.getOrders();
}]);