app.controller('homeController', ['$scope', '$http', 'toaster',
  function ($scope, $http, toaster) {


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
    };

    
    $scope.closeMap = function () {
      $scope.dadosCEP = false;
      $scope.cep = null;
      $scope.form.cep.$pristine = true;
      document.querySelector("#cep").focus();
    };

  }

]);