const express = require("express");
const knex = require("./database");
const routes = express.Router();

routes.get("/users", (req, res) => {
  knex("users").then((results) => {
    return res.json(results);
  });
});

module.exports = routes;
