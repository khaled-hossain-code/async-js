const async = require('async');
const stack = [];

const func1 = (cb) => {
  cb(null, 'func1');
};

const func2 = (cb) => {
  cb(null, 'func2');
};

const func3 = (cb) => {
  cb(null, 'func3');
};

stack.push(func1);
stack.push(func2);
stack.push(func3);


async.parallel(stack, (err, results) => {
  console.log(results);
});