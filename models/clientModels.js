const db = require("../config/db");

const getAllClient = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM clients ORDER BY id DESC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getClientById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM clients WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const createClient = (client) => {
  const { client_name, brand, user_id } = client;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO clients (client_name, brand, user_id) VALUES ($1, $2, $3) RETURNING *`,
      [client_name, brand, user_id],
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

const updateClient = (client) => {
  const { client_name, brand, id } = client;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE clients SET client_name = $1, brand = $2 WHERE id = $3`,
      [client_name, brand, id],
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

const deleteClient = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM clients WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllClient,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
