const mongoose = require("mongoose");

const DB = process.env.MONGODB_CONNECTION;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(`Database connection failed!\nError is: ${err}`);
  });
