// * external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// * internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const inboxRouter = require("./router/inboxRouter");
const userRouter = require("./router/userRouter");

const app = express();
dotenv.config();

// * database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("database is connected successfully"))
  .catch((err) => console.log(err));

// * requset parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  * set view engine
app.set("view engine", "ejs");

// * set static folder
app.use(express.static(path.join(__dirname, "public")));

// * cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// * routing setup
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

//  * 404 error handler
app.use(notFoundHandler);

// * common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listening to http://localhost:${process.env.PORT}`);
});
