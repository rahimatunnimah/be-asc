const Router = require("express").Router();
const middlewares = require("../middlewares/jwt");
const controller = require("../controllers/clientControllers");

Router.get("/", controller.getClients)
  .get("/:id", middlewares.checkToken, controller.getDetailClient)
  .post("/add/:role_id", middlewares.checkToken, controller.createClient)
  .patch("/edit/:role_id/:id", middlewares.checkToken, controller.updateClient)
  .delete(
    "/delete/:role_id/:id",
    middlewares.checkToken,
    controller.deleteClient
  );

module.exports = Router;
