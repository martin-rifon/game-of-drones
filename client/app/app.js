'use strict';

angular.module('gameofnodesClientNewestTryApp', [
  'gameofnodesClientNewestTryApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngMessages',
  'LocalStorageModule'
])
  .config(function($urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {
    $urlRouterProvider .otherwise('/');

    $locationProvider.html5Mode(true);

    // CORS.
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Local storage.
    localStorageServiceProvider.setPrefix('gameOfNodes');
  });
