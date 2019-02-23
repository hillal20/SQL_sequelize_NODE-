const express = require("express");
const server = express();
const Sequelize = require("sequelize");

const connection = new Sequelize("db", "user", "pass", {
  host: "localhost",
  dialect: "sqlite",
  storage: "db.sqlite",
  operatorsAliases: false
});

connection
  .authenticate()
  .then(msg => {
    console.log("=== database is connected===");
  })
  .catch(err => {
    console.log(" === err in database connection ===");
  });
server.listen(9999, () => {
  console.log("=== server on 9999 ===");
});
