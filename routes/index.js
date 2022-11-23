const express = require("express");

const userRoutes = require("./userRoutes");
const brandRoutes = require("./brandRoutes");
const clientRoutes = require("./clientRoutes");
const authRoutes = require("./authRoutes");

const Router = express.Router();

Router.use("/user", userRoutes);
Router.use("/brand", brandRoutes);
Router.use("/client", clientRoutes);
Router.use("/auth", authRoutes);

module.exports = Router;
