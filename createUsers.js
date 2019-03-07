const express = require("express");
const Sequelize = require("sequelize");
const UsersData = require("./data.json");
const Router = express.Router();

const connectionFn = (db, server) => {
  const userModel3 = db.define("userModel3", {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
  });

  userModel3.create({
    name: "jalol",
    email: "jalloa@jjjj.ccom",
    password: "nannaanananana"
  });

  server.get("/allusers3", (req, res) => {
    userModel3
      .findAll()
      .then(msg => res.json({ msg: msg }))
      .catch(err => res.json(err));
  });
};

module.exports = { connectionFn: connectionFn };
