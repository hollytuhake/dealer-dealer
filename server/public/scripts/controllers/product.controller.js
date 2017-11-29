myApp.controller('ProductController', ['$http', 'UserService', 'ProductService', function ($http, UserService, ProductService) {
    console.log('ProductController created');
    var vm = this;
    vm.userService = UserService;
    vm.productService = ProductService;
    vm.showUpdate = false;
    vm.showProducts = true;
    vm.productToUpdate = {};
    vm.products = {};

    vm.showFormClick = function () {
        vm.showForm = !vm.showForm;
    }

    vm.showUpdateForm = function(product){
        vm.showUpdate = true;
        vm.showProducts = false;
        vm.productToUpdate = product;
    }

    vm.getProducts = function(){
        console.log('in getProducts on controller');
        ProductService.getProducts().then(function(response){
            vm.products = response.data;
        })
    }

    vm.addProduct = function (productToAdd) {
        ProductService.addProduct(productToAdd);
        vm.getProducts();
    }



    vm.deleteProduct = function (productId) {
        ProductService.deleteProduct(productId);
        vm.getProducts();
    }

    vm.updateProduct = function (productToUpdate){
        ProductService.updateProduct(productToUpdate);
        vm.showUpdate = !vm.showUpdate;
        vm.showProducts = !vm.showProducts;
    }

    vm.getProducts();

}]);