const db = require("../config/db");

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const registerUser = (user) => {
  const { fullname, email, password, role_id } = user;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (fullname, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [fullname, email, password, role_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getUserByEmail,
  registerUser,
};
