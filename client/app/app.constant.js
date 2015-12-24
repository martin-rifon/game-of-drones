(function(angular, undefined) {
'use strict';

angular.module('gameofnodesClientNewestTryApp.constants', [])

.constant('appConfig', {roundWinsForVictory:3,backendURL:'http://ec2-52-34-175-249.us-west-2.compute.amazonaws.com/gameofnodes-server/public/index.php/',storeStatURL:'gameOfDronesStats',getRulesURL:'gameOfDronesStats/rules'})

;
})(angular);