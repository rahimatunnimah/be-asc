const Router = require("express").Router();
const controller = require("../controllers/authControllers");

Router.post("/register", controller.register).post("/login", controller.login);

module.exports = Router;
