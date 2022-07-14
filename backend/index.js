require("dotenv").config();
const cookieSession = require("cookie-session");
// const session = require("express-session");
const express = require("express");
const cors = require("cors");
require("./passport");
const passport = require("passport");
const authRoutes = require("./routes/auth.routes");
const app = express();

//import routes

const port = process.env.PORT || 5000;

app.use(
  cookieSession({
    name: "session",
    keys: ["abudu"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);

app.listen(port, () => console.log(`Listening on port : ${port}`));
