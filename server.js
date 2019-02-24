const express = require("express");
const server = express();
const Sequelize = require("sequelize");

const connection = new Sequelize("db", "user", "pass", {
  host: "localhost",
  dialect: "sqlite",
  storage: "db.sqlite",
  operatorsAliases: false,
  define: {
    // the same define in the creation of the model
    freezeTableName: true,
    timestamps: false
  }
});

connection
  .authenticate()
  .then(msg => {
    console.log("=== database is connected===");
  })
  .catch(err => {
    console.log(" === err in database connection ===");
  });

/////////////////////////////////// models

const UserModel = connection.define(
  "UserModel",
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        len: [3, 9] // 3 min char and 7 max char
      }
    },
    bio: Sequelize.TEXT
  },
  {
    hooks: {
      beforeValidate: () => {
        console.log("== before validate ");
      },
      afterValidate: () => {
        console.log("== after validate ");
      },
      beforeCreate: () => {
        console.log("== before create ");
      },
      afterCreate: () => {
        console.log("== after create ");
      }
    }
  }
);

connection.sync({ force: true });

///////////////////////////// routes
server.get("/user", (req, res) => {
  UserModel.create({
    name: "hil",
    bio: "bio for hilal"
  })
    .then(msg => {
      res.json(msg);
    })
    .catch(err => {
      res.json({ msg: "short name" });
    });
});

///////////////////////////
server.listen(9999, () => {
  console.log("=== server on 9999 ===");
});
