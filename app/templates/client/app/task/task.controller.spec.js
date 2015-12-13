'use strict';

describe('Controller: MainController', function() {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));<% if (filters.uirouter) {%>
  beforeEach(module('stateMock'));<% } %><% if (filters.socketio) {%>
  beforeEach(module('socketMock'));<% } %>

  var scope;
  var MainController;<% if (filters.uirouter) {%>
  var state;<% } %>
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope<% if (filters.uirouter) {%>, $state<% } %>) {
    $httpBackend = _$httpBackend_;
    
    scope = $rootScope.$new();<% if (filters.uirouter) {%>
    state = $state;<% } %>
    TaskCtrl = $controller('TaskCtrl', {
      $scope: scope
    });
  }));

  it('should do something', function() {
  });  
});
