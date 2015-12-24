'use strict';

angular.module('gameofnodesClientNewestTryApp')
  .config(configEnd);

configEnd.$inject = ['$stateProvider'];

function configEnd($stateProvider) {
  $stateProvider
    .state('endGame', {
      url: '/game/end',
      templateUrl: 'app/game/end/end.html',
      controller: 'EndCtrl as gameEndVm',
      params: {'winnerName': 'Default player 1'}
    });
}
