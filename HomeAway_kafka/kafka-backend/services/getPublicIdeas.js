var Ideas = require("../../Backend/models/idea");

require("../../Backend/db/mongoose");
var ObjectID = require("mongodb").ObjectId;

console.log(
  "---------------------INSIDE /SERVICES/GET_PUBLIC_IDEAS.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services getPublicIdeas.js handle request:" + JSON.stringify(msg)
  );

  //property details logic

  Ideas.find(
    {},
    {
      idea_id: 1,
      title: 1,
      category: 1,
      abstract: 1,
      like_count: 1
    }
  ).then(
    docs => {
      console.log("Documents fetched from MongoDB: ");
      console.log(JSON.stringify(docs, undefined, 2));
      callback(null, JSON.stringify(docs, undefined, 2));
    },
    err => {
      console.log("Error getting Ideas.");
      callback(null, []);
    }
  );
}

exports.handle_request = handle_request;
