'use strict';

describe('Controller: RunCtrl', function () {

  // load the controller's module
  beforeEach(module('gameofnodesClientNewestTryApp'));

  var RunCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RunCtrl = $controller('RunCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
