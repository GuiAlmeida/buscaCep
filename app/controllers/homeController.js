app.controller('homeController', ['$scope', '$http', 'toaster',
  function ($scope, $http, toaster) {

    $scope.mycallback = function(map) {
      $scope.mymap = map;
      $scope.$apply();
    };

    $scope.buscarCEP = function () {
      var cep = $scope.cep;
      var url = 'https://viacep.com.br/ws/' + cep + '/json/';

      // Recupera cep
      $http({
        method: 'GET',
        url: url
      }).then(function (r) {
        $scope.dadosCEP = r.data;
        console.log($scope.dadosCEP);
      }, function (rr) {
        toaster.pop("error", "Oops", "Algo deu errado! Por favor, confira os dados e tente novamente.");
      });
    }

  }

]);