'use strict';

(function () {
	class TaskService {
		constructor($resource) {
		    return $resource('/api/tasks/:id/:controller', {
		      id: '@_id'
		    });
		}
	}

	angular.module('<%= scriptAppName %>')
	  .factory('Task', TaskService);

})();
