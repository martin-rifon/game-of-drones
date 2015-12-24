'use strict';

angular.module('gameofnodesClientNewestTryApp')
  .controller('GameCtrl', GameCtrl);

GameCtrl.$inject = ['$scope', '$state', '$http', 'appConfig', 'gameEngine'];

function GameCtrl($scope, $state, $http, appConfig, gameEngine) {
  var vm          = this;

  vm.player1Name = null;
  vm.player2Name = null;

  vm.winListByWinCount = gameEngine.getWinListByWinCount();

  vm.startGame = startGame;

  function startGame() {

      gameEngine.init(vm.player1Name, vm.player2Name);
      $state.go('runGame');
  };
}
