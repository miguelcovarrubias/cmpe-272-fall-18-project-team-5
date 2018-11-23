var sql = require("mysql");

var dbConfig = {
  host: "127.0.0.1",
  database: "testingDB",
  user: "root",
  password: "admin123",
  socketPath: "/tmp/mysql.sock"
};

let connection = null;

function getSQLConnection() {
  return new Promise((resolve, reject) => {
    if (connection) {
      resolve(connection);
    } else {
      connection = new sql.createConnection(dbConfig);

      connection.connect(function(err) {
        if (err) {
          console.log("unable to connect: ", error);
          closeSQLConnection();
          reject(err);
        }
        console.log("Connected!");
        resolve(connection);
      });
    }
  });
}

function closeSQLConnection() {
  connection.close();
  connection = null;
  console.log("Database closed successfully");
}

module.exports = {
  getSQLConnection,
  closeSQLConnection
};
