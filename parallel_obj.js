const async = require('async');
let stack = {};

stack.getUserName = (cb) => {
  let userName = 'Bob';

  setTimeout(() => {
    // cb(null, userName);
    cb(new Error('user not found'));
  }, 300);
};

stack.getAge = (cb) => {
  let userAge = 23;

  setTimeout(() => {
    cb(null, userAge);
    // cb(new Error('No Age found'));
  }, 200);
};

stack.getUserGender = (cb) => {
  let userGender = 'M';

  setTimeout(() => {
    cb(null, userGender);
  }, 100);
};


async.parallel(stack, (err, result) => {
  console.log(err); // null
  console.log(result); // { getUserName: 'Bob', getUserGender: 'M', getAge: 23 }
                       // { getUserName: null } when getUsername sends error
})