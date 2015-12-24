'use strict';

angular.module('gameofnodesClientNewestTryApp')
  .config(configApp);

configApp.$inject = ['$stateProvider', '$urlRouterProvider'];

function configApp($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/game',
      templateUrl: 'app/game/game.html',
      controller: 'GameCtrl as gameVm'
    });
}
