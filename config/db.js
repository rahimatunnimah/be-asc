// const Postgre = require("pg").Pool;

// const connection = new Postgre({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// module.exports = connection;

const { Pool, Client } = require("pg");
require("dotenv").config();

console.log("process.env.ENV_MODE", process.env.ENV_MODE);
let connection;
if (process.env.ENV_MODE === "prod") {
  connection = new Client({
    connectionString: process.env.DB_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  connection = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
}

const connect = async () => {
  try {
    const response = await connection.connect();
    if (response) console.log("Connect to database");
  } catch (err) {
    console.log(err);
  }
};

connect();
module.exports = connection;
