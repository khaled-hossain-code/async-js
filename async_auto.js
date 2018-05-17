const async = require('async');

function get_username (cb) {
  console.log('in get_username');
  setTimeout(() => {
    cb(null, "Arian");
  }, 1000);
}

function connect_to_db (cb) {
  console.log('in connect_to_db');
  let connected;

  setTimeout(() => {
    connected = true; // simulate db failure making it false

    if(connected) { cb(null, connected)}
    else { cb( new Error('could not connect'))}
  }, 1000);
}

function check_user_exists (result, cb) {
  console.log('inside  check user exists');
  console.log(result);// {connected_to_db: true, get_username: "Arian"}

  let userExists;

  setTimeout(()=> {
    userExists = false;

    if(userExists){
      cb(new Error('User already exist in db'))
    }else {
      userExists = true;
      cb(null, userExists);
    }
  }, 1000);
}

function sign_up (result, cb) {
  console.log('in sign_up');

  let username = result.get_username,
    isDBConnected = result.connect_to_db,
    userExists = result.check_user_exists;

  setTimeout(() => {
    if(isDBConnected && userExists) {
      cb(null, {status: 200, msg: 'Successfully signed up user'});
    }else {
      cb(new Error('Error signing up'));
    }
  }, 2000);
}

async.auto({
  get_username,
  connect_to_db,
  check_user_exists: ['get_username', 'connect_to_db', check_user_exists], // check_user_exists function depends on get_user, connect_to_db
  sign_up: ['check_user_exists', sign_up] // sign_up depends on check_user_exists
}, (err, res) => {
  console.log(res);
  /*
  { get_username: 'Arian',
  connect_to_db: true,
  check_user_exists: true,
  sign_up: { status: 200, msg: 'Successfully signed up user' } }
  */
})