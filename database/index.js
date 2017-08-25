const mysql = require('mysql')

const production = {
  host: 'kickesport-db.crcchsi2oqby.ap-southeast-1.rds.amazonaws.com',
  user: 'kickesport',
  password: 'kickesportstrong',
  database: 'kickesport',
  timeout: 60000,
  port: 3306
}
const development = {
  host: '127.0.0.1',
  user: 'root',
  password: 'kickesportstrong',
  database: 'kickesport',
  timeout: 60000,
  port: 3306
}

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(process.env.NODE_ENV === 'production' ? production : development); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}
handleDisconnect();


exports.getConnection = function () {
    return connection;
}
