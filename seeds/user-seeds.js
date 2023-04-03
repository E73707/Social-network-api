const mongoose = require("mongoose");
const User = require("../models/User");
const dbConnection = require("../config/connection");

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", function () {
  console.log("Connected to the database");

  const userSeed = [
    {
      username: "testuser1",
      email: "testuser1@example.com",
    },
    {
      username: "testuser2",
      email: "testuser2@example.com",
    },
    {
      username: "testuser3",
      email: "testuser3@example.com",
    },
  ];

  User.deleteMany({})
    .then(() => User.insertMany(userSeed))
    .then((data) => {
      console.log("User data inserted!");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});
