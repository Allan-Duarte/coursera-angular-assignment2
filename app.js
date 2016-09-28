(function () {
'use strict';

var toBuyItems = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolates",
    quantity: "5"
  },
  {
    name: "Eggs",
    quantity: "12"
  }
];

angular.module('ShoppingListCheckOff', [])

// Declarations
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


// ToBuy Controller Implementation
ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService) {
  $scope.toBuyItems = toBuyItems;

  $scope.buyItem = function(index){
  	var boughtItem = $scope.toBuyItems.splice(index, 1);
  	ShoppingListCheckOffService.buyItem(boughtItem[0].name, boughtItem[0].quantity);
  };
}


// AlreadyBought Controller Implementation
AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
  $scope.boughtItems = ShoppingListCheckOffService.getItems();
  $scope.boughtItemsEmpty = ($scope.boughtItems.length === 0);
}


// ShoppingListCheckOff Service Implementation
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [];

  service.buyItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

})();