'use strict';

angular.module('gameofnodesClientNewestTryApp')
  .controller('RunCtrl', RunCtrl);

RunCtrl.$inject = ['gameEngine', '$state'];

function RunCtrl(gameEngine, $state) {
  var vm = this;

  vm.executeMove = executeMove;

  vm.player1Name       = gameEngine.player1.name;
  vm.player2Name       = gameEngine.player2.name;
  vm.gameLog           = gameEngine.getGameLog();
  vm.gameRules         = gameEngine.getRules();

  vm.currentPlayerName = vm.player1Name;
  vm.currentRound      = 1;
  vm.selectedRule      = vm.gameRules[0];

  function executeMove() {
    var executionResult = gameEngine.executeMove(vm.currentPlayerName, vm.selectedRule);

    if (gameEngine.end)
      $state.go('endGame', { winnerName: executionResult.winner });
    else {
      vm.currentPlayerName = executionResult.currentPlayerName;
      vm.currentRound      = executionResult.currentRound;
    }
  };
}
