const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());
app.use(cookieParser());
const router = require("./router/auth"); //Router
app.use(router);

const PORT = process.env.PORT; //Port

require("./database/connection"); //Database

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
