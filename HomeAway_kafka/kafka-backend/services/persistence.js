var connectionManager = require("./connectionManager");
var sql = require("mysql");
var dbQueries = require("./dbQueries");

function connectToDatabase(execute) {
  return new Promise((resolve, reject) => {
    connectionManager
      .getSQLConnection()
      .then(execute)
      .catch(err => {
        reject(err);
      });
  });
}

function getWebsiteViewCount() {
  return new Promise((resolve, reject) => {
    connectToDatabase(connection => {
      connection.query(dbQueries.getWebsiteViewCountSQL, function(
        err,
        result,
        fields
      ) {
        if (err) reject(err);
        console.log(fields);
        console.log(result[0].view_count);
        resolve(result[0].view_count);
      });
    });
  });
}

function getUsersCount() {
  return new Promise((resolve, reject) => {
    connectToDatabase(connection => {
      connection.query(dbQueries.getUsersCountSQL, function(
        err,
        result,
        fields
      ) {
        if (err) reject(err);
        console.log(fields);
        console.log(result[0].users_count);
        resolve(result[0].users_count);
      });
    });
  });
}

module.exports = {
  getWebsiteViewCount,
  getUsersCount
};
