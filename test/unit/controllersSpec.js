'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
  var scope, ctrl, $httpBackend;

  beforeEach(module('myApp.controllers'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://localhost:8080/tasks').
      respond([{text: 'test'}, {done: false}]);
    scope = $rootScope.$new();
    ctrl = $controller('TodoCtrl', {$scope: scope});
  }));

  it('should define the controller', inject(function() {
    expect(ctrl).toBeDefined();
  }));

  it('should create "tasks" model with test tasks fetched from xhr',
    inject(function() {
      expect(scope.tasks).toBeUndefined();
      $httpBackend.flush();
      expect(scope.tasks).toEqual(
        [{text: 'test'}, {done: false}]);
    })
  );
});
