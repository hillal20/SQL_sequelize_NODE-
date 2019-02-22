const fs = require("fs");
const sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";

const db = {};
