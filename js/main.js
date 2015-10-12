var bitcoinCalculator = angular.module('bitcoinCalculator', ['nvd3ChartDirectives']);
bitcoinCalculator.controller('bitcoinController', function($scope, $http){

  $.ajax({
    url: "https://bitpay.com/api/rates/usd",
    type: "GET",
    dataType: 'json',
    error: function(method, url, resp){
      console.error( "bad request https://bitpay.com/api/rates/usd");
    },
    success: function(data){
      $scope.rates = data;
      if (data["code"] == "USD") $scope.currRate = data["rate"];
      $scope.initalAmt  = 5000;
      $scope.newAmt     = function(price){return price/$scope.currRate * $scope.initalAmt;}
      $scope.profit     = function(price){return price/$scope.currRate * $scope.initalAmt - $scope.initalAmt;}

      $scope.$apply()
    },
  });

  $scope.xAxisTickFormatFunction = function(){
    return function(date){
      return d3.time.format('%x')(new Date(date));
    };
  };

  $scope.bpiEndDate = new Date();
  $scope.bpiStartDate = new Date()
  $scope.bpiStartDate.setYear($scope.bpiEndDate.getFullYear() - 2);



  $.ajax({
    url: "https://api.coindesk.com/v1/bpi/historical/close.json?start=" +
      $scope.bpiStartDate.toJSON().slice(0,10) + "&" +
      $scope.bpiEndDate.toJSON().slice(0,10),
    type: "GET",
    dataType: 'json',
    error: function(resp, err){
      console.error( "bad request http://api.coindesk.com/v1/bpi/historical/close.json");
    },
    success: function(data){
      var dataArray = $.map(data.bpi, function (value, index){
        return [[new Date(index).getTime(), value]];
      });
      debugger
      $scope.bitcoinHistoricalData = [{
        "key": "Prices",
        "values": dataArray
      }];

      $scope.$apply()
    },
  });

});
