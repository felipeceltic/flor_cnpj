(function () {
  'use strict';

  angularjs.service('zendeskService', ["$q", function ($q) {

    var client = ZAFClient.init();

    return {

      getTicket: function (ticket_id) {
        var deferred = $q.defer();
        
        client.request({
          url: '/api/v2/tickets/'+ticket_id,
          type: 'GET',
          contentType: 'application/json'
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error)
        });
        return deferred.promise;
      },

      organizationCNPJ: function (organization_id) {

        var deferred = $q.defer();
      
        client.request({
          url: '/api/v2/organizations/'+organization_id,
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