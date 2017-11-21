myApp.controller('ProductController', ['$http', 'UserService', function ($http, UserService) {
    console.log('ProductController created');
    var vm = this;
    vm.userService = UserService;

    var vm = this;
    vm.userService = UserService;
    vm.showUpdate = false;
    vm.showProducts = true;
    vm.productToUpdate = {
        // name: 'name',
        // costtomake: 75,
        // directprice: 150,
        // dealerprice: 115,
        // distroprice: 100,
        // upc: 123456748647
    };


       //GET ROUTES -- get products for DOM
    vm.getProducts = function () { //getting data
        console.log('in getProducts');
        $http.get('/products').then(function (response) {
            vm.products = response.data;
        });
    }

    vm.showFormClick = function () {
        vm.showForm = !vm.showForm;
    }

    //    POST ROUTES -- post new product
    vm.addProduct = function (productToAdd) {
        console.log('in addproduct');
        console.log(productToAdd);
        $http.post('/products', productToAdd).then(function (req, res) {
            console.log('adding product');
            alert('Product Added');
            vm.getProducts();
        }).catch(function (err) {
            console.log('Add Product Failed!');
            alert('Product add failed, try again.');
        });
    }

    vm.showUpdateForm = function(product){
        vm.productToUpdate = product;
        console.log('update clicked');
        vm.showUpdate = !vm.showUpdate;
        vm.showProducts = !vm.showProducts;
        console.log(vm.productToUpdate); 
    }

    vm.deleteProduct = function (productId) {
        console.log('in deleteProduct');
        console.log(productId);
        $http.delete('/products/' + productId).then(function (req, res) {
            console.log('deleting product');
            alert('Product Deleted');
        }).catch(function (err) {
            console.log('delete Product Failed!');
            alert('Delete product failed, try again.');
        });
        vm.getProducts();
    }

    vm.updateProduct = function (updatingProduct){
        console.log('update submit clicked');
        $http.put('/products/'+ updatingProduct.id, updatingProduct).then(function (req, res) {
            console.log('adding product');
            alert('Product Added');
            vm.getProducts();
        }).catch(function (err) {
            console.log('Update Product Failed!');
            alert('Update Product failed, try again.');
        });
        console.log("product to update",updatingProduct);
        vm.showUpdate = !vm.showUpdate;
        vm.showProducts = !vm.showProducts;
    }

    vm.getProducts();
}]);