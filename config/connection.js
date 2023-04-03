const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/socialNetworkDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.log(`Mongoose default connection error: ${err}`);
  });

module.exports = mongoose;
