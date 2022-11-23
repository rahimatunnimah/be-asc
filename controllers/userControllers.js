const model = require("../models/userModels");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUser();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getUserById(id);

    if (getData.rows.length === 0) {
      res.send("user not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { role_id, id } = req.params;
    const { fullname, email } = req.body;

    const getData = await model.getUserById(id);

    if (role_id !== "1") {
      res.status(400).send("user updates can only be done by the Superadmin");
    } else if (getData.rowCount > 0) {
      let inputFullname = fullname || getData.rows[0].fullname;
      let inputEmail = email || getData.rows[0].email;
      let message = "";

      if (fullname) message += "fullname,";
      if (email) message += "email,";

      await model.updateUser({
        fullname: inputFullname,
        email: inputEmail,
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

const deleteUser = async (req, res) => {
  try {
    const { role_id, id } = req.params;
    const getData = await model.getUserById(id);

    if (role_id !== 1) {
      res.status(400).send("user updates can only be done by the Superadmin");
    } else if (getData.rowCount > 0) {
      const deleteUser = await model.deleteUser(id);
      if (deleteUser) {
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
  getUsers,
  getDetailUser,
  updateUser,
  deleteUser,
};
