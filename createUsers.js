const express = require("express");
const Sequelize = require("sequelize");
const UsersData = require("./data.json");
const Router = express.Router();
console.log(UsersData);
const connectionFn = connection => {
  connection.sync();

  const userModel2 = connection.define("userModel2", {
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

  userModel2
    .bulkCreate(UsersData)
    .then(msg => {
      console.log("== succesful ===", msg);
    })
    .catch(err => {
      //console.log("== err ==", err);
    });
};

module.exports = { connectionFn: connectionFn };
