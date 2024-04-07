let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rishabh',
    database: 'notes-app'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

  const createNoteTable = `CREATE TABLE IF NOT EXISTS notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    date VARCHAR(255)
)`;

connection.query(createNoteTable, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

module.exports = connection;