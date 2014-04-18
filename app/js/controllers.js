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
          $scope.tasks.unshift(task);
          $scope.taskText = '';
        });
      };

      $scope.update = function(task) {
        $http.post(tasksEndpoint + "/update", task)
      };

      $scope.purge = function() {
        var oldTasks = $scope.tasks;
        $scope.tasks = [];
        $http.post(tasksEndpoint + "/purge", "").success(function() {
          angular.forEach(oldTasks, function (todo) {
            if (!todo.done) $scope.tasks.push(todo);
          });
        });
      };
    }
  ]);
