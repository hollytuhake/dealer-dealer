myApp.controller('OrderController', function (UserService) {
    console.log('OrderController created');
    var vm = this;
    vm.userService = UserService;
})