const async = require('async');
const stack = [];

const func1 = (cb) => {
  setTimeout(() => {
    cb(null, 'func1');
  }, 300);
};

const func2 = (res, cb) => {
  setTimeout(() => {
    console.log(`inside func2 - ${res}`); // func1
    cb(null, 'func2');
  }, 100);
};

stack.push(func1);
stack.push(func2);


async.waterfall(stack, (err, res) => {
  console.log(`waterfall res: ${res}`); // func2
});


