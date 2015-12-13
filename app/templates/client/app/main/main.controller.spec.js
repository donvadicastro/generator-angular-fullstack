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
    
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    $httpBackend.expectGET('/api/tasks/status')
      .respond({all: 5, completed: 2});

    scope = $rootScope.$new();<% if (filters.uirouter) {%>
    state = $state;<% } %>
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    $httpBackend.flush();<% if (filters.jasmine) { %>
    expect(MainController.awesomeThings.length).toBe(4);<% } if (filters.mocha) { %>
    <%= expect() %>MainController.awesomeThings.length<%= to() %>.equal(4);<% } %>
  });
  
  it('should attach a status to the controller', function() {
    $httpBackend.flush();<% if (filters.jasmine) { %>
    expect(JSON.stringify(MainController.status)).toBe(JSON.stringify({all: 5, completed: 2}));<% } if (filters.mocha) { %>
    <%= expect() %>JSON.stringify(MainController.status)<%= to() %>.be(JSON.stringify({all: 5, completed: 2}));<% } %>
  });
});
