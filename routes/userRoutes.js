const Router = require("express").Router();
const middlewares = require("../middlewares/jwt");
const controller = require("../controllers/userControllers");

Router.get("/", controller.getUsers)
  .get("/:id", middlewares.checkToken, controller.getDetailUser)
  .patch("/edit/:role_id/:id", middlewares.checkToken, controller.updateUser)
  .delete(
    "/delete/:role_id/:id",
    middlewares.checkToken,
    controller.deleteUser
  );

module.exports = Router;
