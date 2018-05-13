const async = require('async');
const _ = require('lodash');

const taskList = _.times(10, _.uniqueId.bind(null, 'task_')); // ['task_1', 'task_2'......]

const tasksQueue = async.queue( function (myTask, cb) {
  console.log(`Performing task: ${myTask.name}`);
  console.log(`Task remains: ${tasksQueue.length()}`);

  setTimeout(() => { //this is the function doing asynchronous work for all tasks
    console.log(`Fetched Age for ${myTask.name}`);
    const randomAge = Math.floor(Math.random() * Math.floor(60));
    cb(null, randomAge);
  }, 1000);
}, 1);

_.each(taskList, (task) => { //pushing all the 10 tasks
  tasksQueue.push({name: task}, function (err, result) { //when we push we give a callback for collecting result
    console.log(`Got result for ${this.data.name}: ${result}`);
  })
});

// When all is processed, drain is called
tasksQueue.drain = function() {
  console.log('all items have been processed.');
};

//Puts a tasks in front of the queue
tasksQueue.unshift({name: 'Most important task'}, function(err) {
  //Done
  if (err) {
    console.log(err);
  }
});

// add some items to the queue (batch-wise)
tasksQueue.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
  console.log('finished processing item');
});
