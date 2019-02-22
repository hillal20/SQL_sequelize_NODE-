const express = require("express");
const server = express();

server.listen(9999, () => {
  console.log("=== server on 9999 ===");
});
