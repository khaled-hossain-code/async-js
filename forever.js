const async = require('async');


function monitor(next){
  
  console.log('Doing this Asynchronous job forever');

  setTimeout( ()=> {
    next();
    // next(new Error('Error happend stop the loop'));
  }, 1000);
}

async.forever(monitor, (err) => {
  console.log(err);
});