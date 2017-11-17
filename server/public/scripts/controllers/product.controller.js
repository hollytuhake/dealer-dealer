myApp.controller('ProductController', function (UserService) {
    console.log('ProductController created');
    var vm = this;
    vm.userService = UserService;
})