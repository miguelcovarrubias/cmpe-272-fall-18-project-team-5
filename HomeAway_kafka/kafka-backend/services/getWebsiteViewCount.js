var persist = require("./persistence");
console.log(
  "---------------------INSIDE /SERVICES/GET_WEBSITE_VIEW_COUNT.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services getWebsiteViewCount.js handle request:" + JSON.stringify(msg)
  );

  persist.getWebsiteViewCount().then(
    count => {
      console.log("Count: ", count);
      console.log(JSON.stringify(count, undefined, 2));
      callback(null, JSON.stringify(count, undefined, 2));
    },
    err => {
      console.log("Unable to get view count. Try again.");
      callback(null, []);
    }
  );
}

exports.handle_request = handle_request;
