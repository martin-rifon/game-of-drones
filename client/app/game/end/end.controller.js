'use strict';

angular.module('gameofnodesClientNewestTryApp')
  .controller('EndCtrl', EndCtrl);

EndCtrl.$inject = ['$stateParams'];

function EndCtrl($stateParams) {
  var vm = this;

  vm.winner = $stateParams.winnerName;
}