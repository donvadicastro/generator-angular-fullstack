'use strict';

(function() {

class TaskCtrl {

  constructor($http, Task<% if (filters.socketio) { %>, $scope, socket<% } %>) {
    // Use the User $resource to fetch all tasks
    this.tasks = Task.query();
    this.newTask = {};
    
    $http.get('/api/tasks/status').then(response => {
		  this.status = response.data; <% if (filters.socketio) { %>
      socket.syncUpdates('taskStatus', this.status);<% } %>
	  });
    
    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;<% if (filters.socketio) { %>
      socket.syncUpdates('thing', this.awesomeThings);<% } %>
    });<% if (filters.socketio) { %>

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('taskStatus');
    });<% } %>
  }

  add() {
    var task = this.newTask;
      
    task.created = new Date();
    task.reserved = false;
    task.completed = false;
    
    Task.save(task).$promise.then(res => {
      this.tasks.push(res);
      this.newTask = {};
    });
  }

  delete(task) {
    Task.remove({ id: task._id });
    this.tasks.splice(this.$index, 1);
  }
}

angular.module('<%= scriptAppName %>')
  .controller('TaskCtrl', TaskCtrl);

})();
