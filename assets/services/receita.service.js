(function () {
  'use strict';

  angularjs.service('receitaService', ["$q", function ($q) {

    var client = ZAFClient.init();

    return {

      consultCNPJ: function (cnpj) {

        var deferred = $q.defer();

        client.request({
          url: 'https://receitaws.com.br/v1/cnpj/'+cnpj,
          type: 'GET',
          contentType: 'application/json'
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error)
        });
        return deferred.promise;
      },

    }

  }])

})();