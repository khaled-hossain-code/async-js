const async = require('async');

let counter = 0;

function condition() {
  return counter < 5; //run the loop 5times
}

function apiCall(cb) {
  counter++;
  setTimeout(()=>{
    cb(null, counter);
  }, 1000)
}

async.whilst( condition, apiCall, (err, result) => {
  console.log(result); // we can get the end loops result or we can store all result in arr and access them globally
})