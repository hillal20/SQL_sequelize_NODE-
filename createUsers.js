const express = require("express");
const Sequelize = require("sequelize");
const Router = express.Router();

const connectionFn = connection => {
  const userModel = connection.define("userModel", {
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      isEmail: true
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        isAlphanumeric: true
      }
    }
  });
};

module.exports = { connectionFn: connectionFn };
