const async = require('async');
const stack = [];

const func1 = (cb) => {
  setTimeout(() => {
    // cb(null, 'func1'); //this one finishes third and then result is sent
    cb(new Error('error'), null);
  }, 100);
};

const func2 = (cb) => {
  setTimeout(() => {
    cb(null, 'func2'); //this one finish second
  }, 200);
};

const func3 = (cb) => {
  setTimeout(() => {
    cb(null, 'func3'); //this one will finish first
  }, 300);
};

stack.push(func1);
stack.push(func2);
stack.push(func3);


async.parallel(stack, (err, results) => { //all getting executed parallel
  // console.log(err); // Error: error
  console.log(results); // [ 'func1', 'func2', 'func3' ]
                        // [ null, 'func2', 'func3']
                        // [ null ] if first function send error
});