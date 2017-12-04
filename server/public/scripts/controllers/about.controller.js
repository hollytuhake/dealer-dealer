myApp.controller('AboutController', ['UserService', function (UserService) {
    console.log('AboutController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    console.log(vm.userObject);


}]);
