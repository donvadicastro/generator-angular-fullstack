'use strict';

import app from '../..';<% if (filters.mongooseModels) { %>
import Task from './Task.model';<% } %><% if (filters.sequelizeModels) { %>
import {Task} from '../../sqldb';<% } %>
import request from 'supertest';

describe('Task API:', function() {
  var user;

  // Clear users before testing
  before(function() {
    return <% if (filters.mongooseModels) { %>User.removeAsync().then(function() {<% }
       if (filters.sequelizeModels) { %>User.destroy({ where: {} }).then(function() {<% } %>
      <% if (filters.mongooseModels) { %>user = new User({<% }
         if (filters.sequelizeModels) { %>user = User.build({<% } %>
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return <% if (filters.mongooseModels) { %>user.saveAsync();<% }
         if (filters.sequelizeModels) { %>user.save();<% } %>
    }).then(function(user) {
        request(app)
          .post('/auth/local')
          .send({
            email: 'test@example.com',
            password: 'password'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            token = res.body.token;
            done();
          });
    });
  });

  // Clear users after testing
  after(function() {
    <% if (filters.mongooseModels) { %>return User.removeAsync();<% }
       if (filters.sequelizeModels) { %>return User.destroy({ where: {} });<% } %>
  });

  describe('GET /api/tasks', function() {
    var tasks;

    beforeEach(function(done) {
      request(app)
        .get('/api/tasks')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          tasks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tasks.should.be.instanceOf(Array);
    });

  });


  describe('GET /api/tasks/status', function() {
    var status;

    beforeEach(function(done) {
      request(app)
        .get('/api/tasks/status')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          status = res.body;
          done();
        });
    });

    it('should respond with tasks status', function() {
      status.total.should.equal(0);
      status.completed.should.equal(0);
    });

  });

  describe('POST /api/tasks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tasks')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'New Task',
          info: 'This is the brand new task!!!',
          reserved: false,
          completed: false,
          created: new Date()
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTask = res.body;
          done();
        });
    });

    it('should respond with the newly created task', function() {
      newTask.name.should.equal('New Task');
      newTask.info.should.equal('This is the brand new task!!!');
    });

  });

  describe('PUT /api/tasks', function() {
    var updatedTask

    beforeEach(function(done) {
      request(app)
        .put('/api/tasks/')
        .send({})
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTask = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTask = {};
    });

    it('should respond with the updated task', function() {
      updatedTask.name.should.equal('New Task');
      updatedTask.info.should.equal('This is the brand new task!!!');
      updatedTask.reserved.should.equal(true);
      updatedTask.completed.should.equal(false);
    });

  });

  describe('GET /api/tasks/:id', function() {
    var task;

    beforeEach(function(done) {
      request(app)
        .get('/api/tasks/' + newTask._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          task = res.body;
          done();
        });
    });

    afterEach(function() {
      task = {};
    });

    it('should respond with the requested task', function() {
      task.name.should.equal('New Task');
      task.info.should.equal('This is the brand new task!!!');
    });

  });

  describe('PUT /api/tasks/:id', function() {
    var updatedTask

    beforeEach(function(done) {
      request(app)
        .put('/api/tasks/' + newTask._id)
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'Updated Task',
          info: 'This is the updated task!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTask = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTask = {};
    });

    it('should respond with the updated task', function() {
      updatedTask.name.should.equal('Updated Task');
      updatedTask.info.should.equal('This is the updated task!!!');
    });

  });

  describe('DELETE /api/tasks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tasks/' + newTask._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when task does not exist', function(done) {
      request(app)
        .delete('/api/tasks/' + newTask._id)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });
});
