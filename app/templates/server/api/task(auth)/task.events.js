/**
 * Task model events
 */

'use strict';

import {EventEmitter} from 'events';<% if (filters.mongooseModels) { %>
import Task from './Task.model';<% } if (filters.sequelizeModels) { %>
import {Task} from '../../sqldb';<% } %>
var TaskEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TaskEvents.setMaxListeners(0);

// Model events<% if (filters.mongooseModels) { %>
var events = {
  'save': 'save',
  'remove': 'remove'
};<% } if (filters.sequelizeModels) { %>
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};<% } %>

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];<% if (filters.mongooseModels) { %>
  Task.schema.post(e, emitEvent(event));<% } if (filters.sequelizeModels) { %>
  Task.hook(e, emitEvent(event));<% } %>
}

function emitEvent(event) {
  return function(doc<% if (filters.sequelizeModels) { %>, options, done<% } %>) {
    TaskEvents.emit(event + ':' + doc._id, doc);
    TaskEvents.emit(event, doc);<% if (filters.sequelizeModels) { %>
    done(null);<% } %>
  }
}

module.exports = TaskEvents;
