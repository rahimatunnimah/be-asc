const model = require("../models/brandModels");
const modelUser = require("../models/userModels");

const getBrands = async (req, res) => {
  try {
    const getData = await model.getAllBrand();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const getDetailBrand = async (req, res) => {
  try {
    const id = req.params;
    const getData = await model.getBrandById(id);

    if (getData.rows.length === 0) {
      res.send("brand not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const { role_id } = req.params;
    const { brand_name, client_id } = req.body;

    if (role_id !== "3") {
      res.status(400).send("create brand can only be done by the Member");
    } else {
      await model.createBrand({
        brand_name,
        client_id,
      });
      res.status(200).send({ message: "New brand added successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { role_id, id } = req.params;
    const { brand_name, client_id } = req.body;
    const getData = await model.getUserById(id);

    if (role_id !== "3") {
      res.status(400).send("brand updates can only be done by the Member");
    } else if (getData.rowCount > 0) {
      let inputBrandname = brand_name || getData.rows[0].brand_name;
      let inputClientId = client_id || getData.rows[0].client_id;

      let message = "";

      if (brand_name) message += "client_name,";
      if (client_id) message += "brand,";

      await model.updateBrand({
        brand_name: inputBrandname,
        client_id: inputClientId,
        id,
      });
      res.status(200).send(`${message} successfully changed`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { role_id, id } = req.params;
    const getData = await model.getBrandById(id);

    if (role_id !== "3") {
      res.status(400).send("brand deleted can only be done by the Member");
    } else if (getData.rowCount > 0) {
      const deleted = await model.deleteBrand(id);
      if (deleted) {
        res.send(`data id ${id} successfully deleted`);
      } else {
        res.status(400).send("data failed to delete");
      }
    } else {
      res.status(400).send("data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getBrands,
  getDetailBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
