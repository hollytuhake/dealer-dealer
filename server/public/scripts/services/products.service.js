myApp.service('ProductService', ['$http', 'UserService', function ($http, UserService) {
    console.log('ProductService created');
    var vm = this;
    vm.userService = UserService;
    vm.showUpdate = false;
    vm.showProducts = true;
    vm.productToUpdate = {};
    vm.products = {};
    vm.testPs = 'productservicegettingthere';

    //GET ROUTES -- get products for DOM
    vm.getProducts = function () { //getting data
        console.log('in getProducts');
        return $http.get('/products').then(function (response) {
            return response;        
        });
    }

    //    POST ROUTES -- post new product
    vm.addProduct = function (productToAdd) {
        console.log('in addproduct');
        console.log(productToAdd);
        $http.post('/products', productToAdd).then(function (req, res) {
            console.log('adding product');
            alert('Product Added');
        }).catch(function (err) {
            console.log('Add Product Failed!');
            alert('Product add failed, try again.');
        });
    }

    vm.deleteProduct = function (productId) {
        console.log('in deleteProduct');
        console.log(productId);
        $http.delete('/products/' + productId).then(function (req, res) {
            console.log('deleting product');
        }).catch(function (err) {
            console.log('delete Product Failed!');
            alert('Delete product failed, try again.');
        });
        vm.getProducts();
    }

    vm.updateProduct = function (updatingProduct) {
        console.log('update submit clicked');
        $http.put('/products/' + updatingProduct.id, updatingProduct).then(function (req, res) {
            console.log('product updated');
            alert('Product Updated');
            vm.getProducts();
        }).catch(function (err) {
            console.log('Update Product Failed!');
            alert('Update Product failed, try again.');
        });
        console.log("product to update", updatingProduct);
    }

}]);