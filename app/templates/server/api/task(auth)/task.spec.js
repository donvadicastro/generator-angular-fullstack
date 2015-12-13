'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var taskCtrlStub = {
  index: 'taskCtrl.index',
  show: 'taskCtrl.show',
  reserve: 'taskCtrl.reserve',
  create: 'taskCtrl.create',
  update: 'taskCtrl.update',
  destroy: 'taskCtrl.destroy'
};

var authServiceStub = {
  isAuthenticated: function() {
    return 'authService.isAuthenticated';
  },
  hasRole: function(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var taskIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './task.controller': taskCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Task API Router:', function() {

  it('should return an express router instance', function() {
    <%= expect() %>taskIndex<%= to() %>equal(routerStub);
  });

  describe('GET /api/tasks', function() {

    it('should route to task.controller.index', function() {
      <%= expect() %>routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'taskCtrl.index')
        <%= to() %>.have.been.calledOnce;
    });

  });

  describe('GET /api/tasks/:id', function() {

    it('should route to task.controller.show', function() {
      <%= expect() %>routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'taskCtrl.show')
        <%= to() %>.have.been.calledOnce;
    });

  });

  describe('POST /api/tasks', function() {

    it('should route to task.controller.create', function() {
      <%= expect() %>routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'taskCtrl.create')
        <%= to() %>.have.been.calledOnce;
    });

  });

  describe('PUT /api/tasks', function() {

    it('should route to task.controller.reserve', function() {
      <%= expect() %>routerStub.put
        .withArgs('/', 'taskCtrl.reserve')
        <%= to() %>.have.been.calledOnce;
    });

  });

  describe('PUT /api/tasks/:id', function() {

    it('should route to task.controller.update', function() {
      <%= expect() %>routerStub.put
        .withArgs('/:id', 'authService.isAuthenticated', 'taskCtrl.update')
        <%= to() %>.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tasks/:id', function() {

    it('should route to task.controller.update', function() {
      <%= expect() %>routerStub.patch
        .withArgs('/:id', 'authService.isAuthenticated', 'taskCtrl.update')
        <%= to() %>.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tasks/:id', function() {

    it('should route to task.controller.destroy', function() {
      <%= expect() %>routerStub.delete
        .withArgs('/:id', 'authService.isAuthenticated', 'taskCtrl.destroy')
        <%= to() %>.have.been.calledOnce;
    });

  });

});
