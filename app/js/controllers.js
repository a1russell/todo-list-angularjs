'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TodoCtrl', ['$scope', '$http',
    function($scope, $http) {
      $http.get('http://localhost:8080/tasks').success(function(data) {
        $scope.tasks = data;
      });
    }
  ]);
