'use strict';

angular.module('gameofnodesClientNewestTryApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        onEnter: function($state) {
  		    $state.go('game');
  		  }
      });
  });
