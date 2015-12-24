'use strict';

angular.module('gameofnodesClientNewestTryApp')
  .controller('GameCtrl', GameCtrl);

GameCtrl.$inject = ['$scope', '$state', '$http', 'appConfig', 'gameEngine'];

function GameCtrl($scope, $state, $http, appConfig, gameEngine) {
  var vm          = this
  ,   backendURL  = appConfig.backendURL
  ,   getRulesURL = appConfig.getRulesURL;

  vm.player1Name = null;
  vm.player2Name = null;

  vm.startGame = startGame;

  function startGame() {

    function successCallback(response) {
      console.log('Rules have been successfully loaded.');

      gameEngine.init(vm.player1Name, vm.player2Name, response.data);

      $state.go('runGame');
    }

    function errorCallback(response) {
      console.log('There was an error loading the rules. Reverting to default rules.');
      console.log(response);

      gameEngine.init(vm.player1Name, vm.player2Name);

      $state.go('runGame');
    }

  	$http.get(backendURL + getRulesURL).then(successCallback, errorCallback);
  };
}
