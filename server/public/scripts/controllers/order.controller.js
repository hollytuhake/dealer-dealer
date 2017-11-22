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
    vm.getOrders = function () { //getting data
        console.log('in getOrders');
        $http.get('/orders').then(function (response) {
            vm.orders = response.data;
        });
    }

    //    POST ROUTES -- post new order
    vm.addOrder = function (orderToAdd) {
        console.log('in addOrder');
        console.log(orderToAdd);
        $http.post('/orders', orderToAdd).then(function (req, res) {
            console.log('adding order');
            alert('Order Added');
            vm.getOrders();
        }).catch(function (err) {
            console.log('Add Order Failed!');
            alert('Order add failed, try again.');
        });
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
    }

    vm.getOrders();
}]);