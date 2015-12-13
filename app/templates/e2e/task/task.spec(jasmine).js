'use strict';

var config = browser.params;
var TaskModel = require(config.serverConfig.root + '/server/sqldb').Task;

describe('Main View', function() {
  var loginPage, taskPage;

  beforeEach(function(done) {
    TaskModel.destroy({ where: {} }).then(done);

    loginPage = require('../account/login/login.po');
    taskPage = require('../task/task.po');
  });

  beforeEach(function() {
    browser.get(config.baseUrl + '/login');
    loginPage.login({ name: 'Test User', email: 'admin@example.com', password: 'admin' });

    browser.get(config.baseUrl + '/task');
  });

  it('should add new task correct', function () {
    taskPage.submit({name: 'Task1'});
    var data = taskPage.taskTbl.all(by.repeater('task in tasks'));

    expect(data.count()).toBe(1);
    expect(data.get(0).getText()).toMatch(/Task1 \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z false false/);

    taskPage.submit({name: 'Task2'});
    var data = taskPage.taskTbl.all(by.repeater('task in tasks'));

    expect(data.count()).toBe(2);
    expect(data.get(1).getText()).toMatch(/Task2 \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z false false/);
  });
});
