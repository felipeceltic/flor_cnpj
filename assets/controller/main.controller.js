(function () {
  'use strict';

  angularjs.controller('angularjs', ['$scope', 'receitaService', 'zendeskService', function ($scope, receitaService, zendeskService) {

    var CNPJ = null;

    client.get('ticket').then(function (data) {
      //console.log(data.ticket.id);
      zendeskService.getTicket(data.ticket.id).then(function (data) {
        // console.log(data.ticket.organization_id);
        if (data.ticket.organization_id != null && data.ticket.organization_id != undefined) {

          zendeskService.organizationCNPJ(data.ticket.organization_id).then(function (data) {
            //console.log(data.organization.organization_fields.cnpj);
            CNPJ = data.organization.organization_fields.cnpj.replace(/[^\w]/g, '');

            if (CNPJ != null && CNPJ !== undefined) {

              document.getElementById('cnpj').value = CNPJ;
              document.getElementById('cnpj').disabled = true;

              //Faz a chamada da API externa Vtex de CPF
              receitaService.consultCNPJ(CNPJ).then(function (data) {
                //Retorno success
                $scope.value_cnpj = data;
                document.getElementById('alertcnpjerror').classList.replace("d-flex", "d-none"); //Oculta o alerta caso já estivesse renderizado
                document.getElementById('tablecnpj').hidden = false; //Exibe a tabela
                client.invoke('resize', { width: '100%', height: '400px' });
                $('#cnpjModal').modal('show');
                //console.log(data)
              }).catch(function (error) {
                //Retorno error
                //$scope.error = error.responseText;
                console.log(error.responseText)
              })
            }
          })
        } else {
          //Seleciona o formulário da Receita
          document.getElementById('consultaCNPJ').addEventListener('submit', function (event) {
            event.preventDefault()

            //Captura o valor do Campo CEP digitado pelo usuário
            CNPJ = document.getElementById('cnpj').value;

            //Faz a chamada da API externa Vtex de CPF
            receitaService.consultCNPJ(CNPJ).then(function (data) {
              //Retorno success
              $scope.value_cnpj = data;
              document.getElementById('alertcnpjerror').classList.replace("d-flex", "d-none"); //Oculta o alerta caso já estivesse renderizado
              document.getElementById('tablecnpj').hidden = false; //Exibe a tabela
              client.invoke('resize', { width: '100%', height: '400px' });
              $('#cnpjModal').modal('show');
              //console.log(data)
            }).catch(function (error) {
              //Retorno error
              //$scope.error = error.responseText;
              console.log(error.responseText)
            })

          });
        }
      })
    });

  }]);

})();