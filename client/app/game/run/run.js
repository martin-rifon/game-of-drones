'use strict';

angular.module('gameofnodesClientNewestTryApp')
  .config(configRun);

configRun.$inject = ['$stateProvider'];

function configRun($stateProvider) {
  $stateProvider
    .state('runGame', {
      url: '/game/run',
      templateUrl: 'app/game/run/run.html',
      controller: 'RunCtrl as gameExecVm',
      params: {'player1Name': 'Default player 1', 'player2Name': 'Default player 2'}
    });
}