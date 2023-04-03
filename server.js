const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const userRoutes = require("./routes/api/user-routes");
const thoughtRoutes = require("./routes/api/thought-routes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/socialNetworkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

db.once("open", () => {
  console.log("Connected to MongoDB database");
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
