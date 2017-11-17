myApp.controller('DealerController', function (UserService) {
    console.log('DealerController created');
    var vm = this;
    vm.userService = UserService;

    vm.hey ='hey';
})