const db = require("../config/db");

const getAllBrand = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT B.*, C.client_name 
      FROM brands B INNER JOIN clients C ON B.client_id = C.id 
      ORDER BY B.id DESC`,
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

const getBrandById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM brands WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const createBrand = (brand) => {
  const { brand_name, client_id } = brand;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO brands (brand_name, client_id) VALUES ($1, $2) RETURNING *`,
      [brand_name, client_id],
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

const updateBrand = (brand) => {
  const { brand_name, client_id, id } = brand;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE brands SET brand_name = $1, client_id = $2 WHERE id = $3`,
      [brand_name, client_id, id],
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

const deleteBrand = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM brands WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllBrand,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
