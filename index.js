const async = require('async');
const stack = [];

const func1 = (cb) => {
  setTimeout(() => {
    cb(null, 'func1');
  }, 300);
};

const func2 = (cb) => {
  setTimeout(() => {
    cb(null, 'func2');
  }, 200);
};

const func3 = (cb) => {
  setTimeout(() => {
    cb(null, 'func3');
  }, 100);
};

stack.push(func1);
stack.push(func2);
stack.push(func3);


async.parallel(stack, (err, results) => {
  console.log(results);
});