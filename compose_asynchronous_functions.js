const async = require('async');

function addFive(num, cb) {
  setTimeout(() => {
    cb(null, num + 5);
  }, 1000);
}

function multiplyTen(num, cb) {
  setTimeout(() => {
    cb(null, num * 10);
  }, 1000);
}

const multiplyThenAdd = async.compose(addFive, multiplyTen); // addFive(multiplyTen(5)) =>  5 + (10 * 5) = 55

multiplyThenAdd(5, (err, res) => {
  console.log(res); // 55
});

const addThenMultiply = async.seq(addFive, multiplyTen); // execute sequencially (5 + 5) * 10

addThenMultiply(5, (err, res) => {
  console.log(res); // 100
})