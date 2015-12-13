'use strict';

import app from '../..';
import {Task} from '../../sqldb';

var genTask = function() {
  Task.bulkCreate([{
    name: 'Task1',
    created: new Date(),
    reserved: false,
    completed: false
  }, {
    name: 'Task2',
    created: new Date(),
    reserved: false,
    completed: false
  }]);
};

describe('Task Model', function() {
  before(function() {
    // Sync and clear tasks before testing
    return Task.sync().then(function() {
      return Task.destroy({ where: {} });
    });
  });

  beforeEach(function() {
    genTask();
  });

  afterEach(function() {
    return Task.destroy({ where: {} });
  });

  it('should begin with 2 tasks', function() {
    return Task.findAll().should
      .eventually.have.length(2);
  });

  it('should reserve only one task for execution', function(done) {
    Task.findAll({where: {reserved: false}})
      .then(function(result) {
        expect(result.length).to.equal(2);
        return Task.reserve();
      })
      .then(function(result) {
        expect(result.getDataValue('name')).to.equal('Task1');
        return Task.findAll({where: {reserved: false}});
      })
      .then(function(result) {
        expect(result.length).to.equal(1);
        return Task.reserve();
      })
      .then(function(result) {
        expect(result.getDataValue('name')).to.equal('Task2');
        return Task.findAll({where: {reserved: false}});
      })
      .then(function(result) {
        expect(result.length).to.equal(0);
        return Task.reserve();
      })
      .then(function(result) {
        expect(result).to.equal.null;
        done();
      });
  });

  it('should use only active task to reserve', function(done) {
    Task.findOne({where: {reserved: false}})
      .then(function(result) {
        result.setDataValue('completed', true);
        return result.save({fields: ['completed']});
      })
      .then(function(result) {
        expect(result.getDataValue('name')).to.equal('Task1');
        return Task.reserve();
      })
      .then(function(result) {
        expect(result.getDataValue('name')).to.equal('Task2');
        done();
      });
  });
});
