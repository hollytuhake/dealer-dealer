myApp.service('DealerService', ['$http', 'UserService', function ($http, UserService) {
    console.log('DealerService created');
    var vm = this;
    vm.userService = UserService;
    vm.dealerToAdd = {};
    vm.dealerToUpdate = {};

    //    GET ROUTES -- get dealers for DOM
    vm.getDealers = function () { //getting data
        console.log('in getDealers');
        $http.get('/dealers').then(function (response) {
            vm.dealers = response.data;
        });
    }

    vm.deleteDealer = function (dealerId) {
        console.log('in deleteDealer');
        console.log(dealerId);
        $http.delete('/dealers/' + dealerId).then(function (req, res) {
            console.log('deleting dealer');
            alert('Dealer Deleted');
            vm.getDealers();
        }).catch(function (err) {
            console.log('delete Dealer Failed!');
            alert('Delete dealer failed, try again.');
        });
    }

    //    POST ROUTES -- post new dealer
    vm.addDealer = function (dealerToAdd) {
        console.log('in addDealer');
        console.log(dealerToAdd);
        $http.post('/dealers', dealerToAdd).then(function (req, res) {
            console.log('adding dealer');
            alert('Dealer Added');
            vm.getDealers();
        }).catch(function (err) {
            console.log('Add Dealer Failed!');
            alert('Dealer add failed, try again.');
        });
    }

    vm.updateDealer = function (updatingDealer) {
        console.log('update dealer submit clicked');
        $http.put('/dealers/' + updatingDealer.id, updatingDealer).then(function (req, res) {
            alert('Dealer Updated');
            vm.getDealers();
        }).catch(function (err) {
            console.log('Update Dealer Failed!');
            alert('Update Dealer failed, try again.');
        });
        console.log("dealer to update", updatingDealer);
        vm.showDealerUpdate = !vm.showDealerUpdate;
        vm.showDealers = !vm.showDealers;
    }

}]);