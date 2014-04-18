'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TodoCtrl', ['$scope', '$http',
    function($scope, $http) {
      var webServiceBasePath = 'http://localhost:8080';
      var tasksEndpoint = webServiceBasePath + '/tasks';

      $http.get(tasksEndpoint).success(function(data) {
        $scope.tasks = data;
      });

      $scope.addTask = function() {
        var task = { 'text': $scope.taskText, 'done': false };
        $http.post(tasksEndpoint, task).success(function() {
          $scope.tasks.push(task);
          $scope.taskText = '';
        });
      };

      $scope.update = function(task) {
        $http.post(tasksEndpoint + "/update", task)
      };
    }
  ]);
