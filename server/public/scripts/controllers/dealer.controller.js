myApp.controller('DealerController', ['$http', 'UserService', function ($http, UserService) {
    console.log('DealerController created');
    var vm = this;
    vm.userService = UserService;
    vm.showForm = false;
    vm.dealerToAdd = {
     };

//    GET ROUTES -- get dealers for DOM
   vm.getDealers = function (){ //getting data
        console.log('in getDealers');
        $http.get('/dealers').then(function (response) {
            vm.dealers = response.data;
        });
    }

    vm.showFormClick = function(){
        vm.showForm = !vm.showForm;
    }

    //    POST ROUTES -- post new dealer
    vm.addDealer = function(dealerToAdd) {
        console.log('in addDealer');
        console.log(dealerToAdd);
        $http.post('/dealers', dealerToAdd).then(function (req, res) {
            console.log('adding dealer');
            alert('Dealer Added');
        }).catch(function (err) {
            console.log('Add Dealer Failed!');
            alert('Dealer add failed, try again.');
        });
        vm.getDealers();
    }

    vm.getDealers();
}]);

