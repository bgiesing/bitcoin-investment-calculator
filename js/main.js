var bitcoinCalculator = angular.module('bitcoinCalculator', ['nvd3ChartDirectives']);
bitcoinCalculator.controller('bitcoinController', function($scope, $http){

  $.ajax({
    url: "https://bitpay.com/api/rates",
    type: "GET",
    dataType: 'json',
    error: function(method, url, resp){
      console.error( "bad request " + method + " to " + url + " resp: " + resp );
    },
    success: function(data){
      $scope.rates = data;
      for(var i=0;i<data.length;i++){
        if (data[i].code == "USD"){
          $scope.currRate = data[i].rate;
          break;
        }
      }
      $scope.initalAmt  = 5000;
      $scope.newAmt     = function(price){return price/$scope.currRate * $scope.initalAmt;}
      $scope.profit     = function(price){return price/$scope.currRate * $scope.initalAmt - $scope.initalAmt;}

      $scope.$apply()
    },
  });

  $scope.exampleData = [{
    "key": "Quantity",
    "bar": true,
    "values": [
      [10, 20],
      [20, 40],
      [30, 60],
      [40, 80],
      [50, 100]
    ]
  }];
});
