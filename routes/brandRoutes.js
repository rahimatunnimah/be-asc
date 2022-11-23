const Router = require("express").Router();
const middlewares = require("../middlewares/jwt");
const controller = require("../controllers/brandControllers");

Router.get("/", controller.getBrands)
  .get("/:id", middlewares.checkToken, controller.getDetailBrand)
  .post("/add/:role_id", middlewares.checkToken, controller.createBrand)
  .patch("/edit/:role_id/:id", middlewares.checkToken, controller.updateBrand)
  .delete(
    "/delete/:role_id/:id",
    middlewares.checkToken,
    controller.deleteBrand
  );

module.exports = Router;
