const model = require("../models/authModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorResponse } = require("../utils/errorResponse");

const register = async (req, res) => {
  const { fullname, email, password, roleId } = req.body;
  const salt = bcrypt.genSaltSync(15);
  const hash = bcrypt.hashSync(password, salt);

  if (roleId === "1" || roleId === "2") {
    const register = await model.registerUser({
      fullname: fullname.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      role_id: roleId,
    });
    if (!register?.rowCount) throw new ErrorResponse("Data failed to add", 400);

    return res.status(200).send({ message: "Register user success!" });
  } else {
    return res.status(400).send({ message: "Role Id invalid!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      return res.status(400).send(`Email and password is required!`);
    }

    const getDataUser = await model.getUserByEmail(email);
    const resultUser = getDataUser?.rows[0];

    if (getDataUser?.rowCount) {
      const checkPasswrod = bcrypt.compareSync(password, resultUser.password);

      if (checkPasswrod) {
        const token = jwt.sign(resultUser, process.env.PRIVATE_KEY, {
          expiresIn: "24h",
        });

        res.status(200).send({
          message: "Login successfully",
          data: { ...resultUser, password: null },
          token,
        });
      } else {
        res.status(401).send("invalid password");
      }
    } else {
      res.status(400).send("user not register");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

module.exports = { login, register };
