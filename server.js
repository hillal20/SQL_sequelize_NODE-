const express = require("express");
const server = express();
const Sequelize = require("sequelize");
const { connectionFn } = require("./createUsers");
const _USERS = require("./data.json");
const Op = Sequelize.Op;

const db = new Sequelize("db", "user", "pass", {
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

db.authenticate()
  .then(msg => {
    console.log("=== database is connected===");
  })
  .catch(err => {
    console.log(" === err in database connection ===");
  });

//connectionFn(db);
/////////////////////////////////// model.create

// const UserModel = db.define(
//   "UserModel",
//   {
//     uuid: {
//       type: Sequelize.UUID,
//       primaryKey: true,
//       defaultValue: Sequelize.UUIDV4
//     },
//     name: {
//       type: Sequelize.STRING,
//       validate: {
//         len: [3, 9] // 3 min char and 7 max char
//       }
//     },
//     bio: Sequelize.TEXT,
//     address: Sequelize.TEXT,
//     zipCode: Sequelize.INTEGER,
//     fullAdd: Sequelize.STRING
//   },
//   {
//     hooks: {
//       beforeValidate: () => {
//         console.log("== before validate ");
//       },
//       afterValidate: () => {
//         console.log("== after validate ");
//       },
//       beforeCreate: userModel => {
//         userModel.fullAdd = `${userModel.address} ${userModel.zipCode}`;
//         console.log("== before create ");
//       },
//       afterCreate: () => {
//         console.log("== after create ");
//       }
//     }
//   }
// );

// db
//   .sync({ force: true })
//   .then(() => {
//     UserModel.create({
//       name: "billal",
//       bio: "hahahahah",
//       address: "settara jijel",
//       zipCode: 18340
//     });
//   })
//   .catch(err => {
//     console.log("==>", err);
//   });

///////////////////////////// routes
server.get("/user", (req, res) => {
  UserModel.create({
    name: "wahid",
    bio: "adouani",
    address: "milal algeria ",
    zipCode: 18340
  })
    .then(msg => {
      res.json(msg);
    })
    .catch(err => {
      res.json({ msg: "short name" });
    });
});
/////////////// model.bulkCreate
const UserModel2 = db.define("UserModel2", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

db.sync({})
  .then(() => {
    UserModel2.bulkCreate(_USERS)
      .then(msg => console.log("msg ===>", msg))
      .catch(err => console.log("err ===>", err));
  })
  .catch(err => {
    console.log("==>", err);
  });
//////////////////// findAll users

server.get("/users", (req, res) => {
  UserModel2.findAll({
    where: {
      name: {
        [Op.like]: "K%"
      }
    }
  })
    .then(msg => {
      res.json({ users: msg });
    })
    .catch(err => {
      res.json({ err: "error" });
    });
});

////// findAll users

server.get("/allusers", (req, res) => {
  UserModel2.findAll({})
    .then(msg => {
      res.json({ users: msg });
    })
    .catch(err => {
      res.json({ err: "error" });
    });
});
//////////////////////// findById

server.get("/one", (req, res) => {
  UserModel2.findById(11)
    .then(msg => {
      res.json({ users: msg });
    })
    .catch(err => {
      res.json({ err: "error" });
    });
});
///////////////////////// delete

server.get("/delete", (req, res) => {
  UserModel2.destroy({ where: { id: 3 } })
    .then(msg => {
      res.json({ users: "deleted" });
    })
    .catch(err => {
      res.json({ err: "error" });
    });
});
//////////////////////////////// update
server.get("/update", (req, res) => {
  UserModel2.update(
    { name: "settara", email: "jijel", password: "YJS38YVO6CD" },
    {
      where: {
        id: 11
      }
    }
  )
    .then(msg => {
      res.json({ users: "updated" });
    })
    .catch(err => {
      res.json({ err: "error" });
    });
});
/////////////////////////// create posts table
const Posts = db.define("Post", {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  title: Sequelize.STRING,
  content: Sequelize.TEXT
});

Posts.belongsTo(UserModel2); // puts foreignkey userId in post table

db.sync({})
  .then(msg => {
    Posts.create({
      UserId: 1,
      title: "first post ",
      content: " post content  1 "
    });
  })
  .catch(err => {
    console.log("post err =====> ");
  });

////////////// all posts
server.get("/allposts", (req, res) => {
  Posts.findAll({})
    .then(msg => {
      res.json({ users: msg });
    })
    .catch(err => {
      res.json({ err: "===>error" });
    });
});
////// all posts include users

server.get("/allpostswithusers", (req, res) => {
  Posts.findAll({
    include: [UserModel2]
  })
    .then(posts => {
      res.json({ posts: posts });
    })
    .catch(err => {
      res.json({ err: "error" });
    });
});
///////////////////////////
server.listen(9999, () => {
  console.log("=== server on 9999 ===");
});
