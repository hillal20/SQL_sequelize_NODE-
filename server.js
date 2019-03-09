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
  operatorsAliases: false
  // define: {
  //   // the same define in the creation of the model
  //   // freezeTableName: true, /** no plural tables  */
  //   //timestamps: false
  // }
});

db.authenticate()
  .then(msg => {
    console.log("=== database is connected===");
  })
  .catch(err => {
    console.log(" === err in database connection ===");
  });

connectionFn(db, server);
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
/////////////////////////// create  post table

const Posts = db.define("Post", {
  // id: {
  //   primaryKey: true,
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV4
  // },
  title: Sequelize.STRING,
  content: Sequelize.TEXT
});
///// ////////////////////////  create  comments table

const Comment = db.define("Comment", {
  the_comment: Sequelize.STRING
});

//////////////////// create Project table

const Project = db.define("Project", {
  title: Sequelize.STRING
});
////////////////////////////////////  associations

Posts.belongsTo(UserModel2); /* puts foreignkey userId in post table or */
//Posts.belongsTo(UserModel2, { as: "UserRef", foreignKey: "userId" });
// to change  UserModel2Id to userId;

Posts.hasMany(Comment, { as: "All_Comments" });

UserModel2.belongsToMany(Project, {
  as: "Project_tasks",
  through: "UserModel2Projects"
});
Project.belongsToMany(UserModel2, {
  as: "Project_workers",
  through: "UserModel2Projects"
});

//////////////////////////////////   create data in tables
db.sync({
  force: true
})
  .then(() => {
    UserModel2.bulkCreate(_USERS)
      .then(msg => console.log("msg ===>", msg))
      .catch(err => console.log("err ===>", err));
  })
  .then(msg => {
    Posts.create({
      UserModel2Id: 1,
      title: "first post ",
      content: " post content  1 "
    });
  })
  .then(msg => {
    Posts.create({
      UserModel2Id: 2,
      title: "second  post ",
      content: " post content  2"
    });
  })
  .then(msg => {
    Posts.create({
      UserModel2Id: 3,
      title: "third  post ",
      content: " post content  3 "
    });
  })
  .then(msg => {
    Posts.create({
      UserModel2Id: 3,
      title: "first post ",
      content: " post content  1 "
    });
  })

  .then(msg => {
    Comment.create({
      PostId: 1,
      the_comment: "comment 1 "
    });
  })
  .then(msg => {
    Comment.create({
      PostId: 2,
      the_comment: "comment 2"
    });
  })
  .then(msg => {
    Project.create({
      title: "project 1"
    }).then(project => {
      project.setProject_workers([4, 5]);
    });
  })
  .then(msg => {
    Project.create({
      title: "project 2"
    }).then(project => {
      project.setProject_workers([1, 3]);
    });
  })
  .then(msg => {
    Project.create({
      title: "project 3"
    });
  })

  .catch(err => {
    console.log("==>", err);
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
/////////// single post with comments
server.get("/singlepost", (req, res) => {
  Posts.findById(1, {
    include: [
      {
        model: Comment,
        as: "All_Comments",
        attributes: ["the_comment"]
      },
      { model: UserModel2 }
    ]
  })
    .then(msg => {
      res.json({ posts: msg });
    })
    .catch(err => {
      res.json({ err: "===>error" });
    });
});

///////////////////////// add a worker
server.get("/addusertoproject", (req, res) => {
  Project.findById(3)
    .then(project => {
      project.addProject_workers(6);
    })
    .then(msg => {
      res.send("user 6 is added to project 3 ");
    })
    .catch(err => {
      res.send(" *** err ****");
    });
});

///////////////// get users and projects

server.get("/usersandprojects", (req, res) => {
  UserModel2.findAll({
    attributes: ["name"],
    include: [{ model: Project, as: "Project_tasks", attributes: ["title"] }]
  })
    .then(msg => {
      res.json({ msg: msg });
    })
    .catch(err => {
      res.send(" *** err ****");
    });
});

///////////////////////////
server.listen(9999, () => {
  console.log("=== server on 9999 ===");
});
