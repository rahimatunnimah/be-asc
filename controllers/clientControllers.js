const model = require("../models/clientModels");
const modelUser = require("../models/userModels");
const { ErrorResponse } = require("../utils/errorResponse");

const getClients = async (req, res) => {
  try {
    const getData = await model.getAllClient();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const getDetailClient = async (req, res) => {
  try {
    const id = req.params;
    const getData = await model.getClientById(id);

    if (getData.rows.length === 0) {
      res.send("client not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const createClient = async (req, res) => {
  const { client_name, brand, user_id } = req.body;
  const { role_id } = req.params;

  if (role_id === "3") {
    const addData = await model.createClient({
      client_name,
      brand,
      user_id,
    });
    if (!addData?.rowCount) throw new ErrorResponse("Data failed to add", 400);

    return res.status(200).send({ message: "Add client success!" });
  } else {
    return res.status(400).send({ message: "Role Id invalid!" });
  }
};

const updateClient = async (req, res) => {
  try {
    const { role_id, id } = req.params;
    const { client_name, brand } = req.body;
    const getData = await model.getClientById(id);

    if (role_id !== "3") {
      res.status(400).send("client updates can only be done by the Member");
    } else if (getData.rowCount > 0) {
      let inputClientname = client_name || getData.rows[0].client_name;
      let inputBrand = brand || getData.rows[0].brand;

      let message = "";

      if (client_name) message += "client_name,";
      if (brand) message += "brand,";

      await model.updateClient({
        client_name: inputClientname,
        brand: inputBrand,
        role_id,
        id,
      });
      res.status(200).send(`${message} successfully changed`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { role_id, id } = req.params;
    const getData = await model.getClientById(id);

    if (role_id !== "3") {
      res.status(400).send("client deleted can only be done by the Member");
    } else if (getData.rowCount > 0) {
      const deleted = await model.deleteClient(id);
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
  getClients,
  getDetailClient,
  createClient,
  updateClient,
  deleteClient,
};
