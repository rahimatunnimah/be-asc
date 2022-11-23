const db = require("../config/db");

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users ORDER BY users.id DESC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getRoleId = (role_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE role_id = $1`,
      [role_id],
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

const updateUser = (user) => {
  const { fullname, email, role_id, id } = user;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET fullname = $1, email = $2, role_id = $3 WHERE id = $4`,
      [fullname, email, role_id, id],
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

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllUser,
  getUserById,
  getRoleId,
  updateUser,
  deleteUser,
};
