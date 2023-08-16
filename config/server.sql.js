/* globals Promise */

const tedious = require("tedious");
const log = require("next-axiom").log;

const Connection = tedious.Connection;

const request = (query, params = {}) => new Promise((resolve, reject) => {
  const req = new tedious.Request(query, (error, rowCount, rows) => {
    if (error) reject(error);
    resolve({ rowCount, rows });
  });

  const { name, type, value, options } = params;
  req.addParameter(name, type, value, options);

  return req;
});

const serverName = process.env.SQL_SERVER_NAME;
const dbName = process.env.SQL_DB_NAME;
const user = process.env.SQL_USER;
const pass = process.env.SQL_PASS;

const config = {
  server: `${serverName}.database.windows.net`,
  authentication: {
    type: "default",
    options: {
      userName: user,
      password: pass
    }
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: dbName
  }
};

const connection = new Connection(config);

connection.on("connect", err => {
  if (err) {
    log.debug("DB connection failed", {
      err
    });
    throw err;
  }

  // If no error, then good to proceed.
  log.info("DB Connected");
});

// connection.connect();

module.exports = {
  connection,
  request
};
