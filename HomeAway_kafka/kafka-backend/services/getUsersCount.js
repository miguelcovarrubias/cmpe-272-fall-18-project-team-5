var persist = require("./persistence");
console.log(
  "---------------------INSIDE /SERVICES/GET_USERS_COUNT.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services getUsersCount.js handle request:" + JSON.stringify(msg)
  );

  persist.getUsersCount().then(
    count => {
      console.log("Count: ", count);
      console.log(JSON.stringify(count, undefined, 2));
      callback(null, JSON.stringify(count, undefined, 2));
    },
    err => {
      console.log("Unable to get users count. Try again.");
      callback(null, []);
    }
  );
}

exports.handle_request = handle_request;
