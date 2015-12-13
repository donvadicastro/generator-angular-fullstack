'use strict';

var TaskPage = function() {
  var form = this.form = element(by.tagName('form'));

  form.name = form.element(by.model('newTask.name'));
  form.submit = form.element(by.css('.btn-default'));

  this.taskTbl = element(by.css('table.table'));

  this.submit = function(data) {
    for (var prop in data) {
      var formElem = form[prop];
      if (data.hasOwnProperty(prop) && formElem && typeof formElem.sendKeys === 'function') {
        formElem.sendKeys(data[prop]);
      }
    }

    form.submit.click();
  };
};

module.exports = new TaskPage();
