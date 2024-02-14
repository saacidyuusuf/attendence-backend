const express = require("express");
require("dotenv").config();
const app = express();
const { User, Class } = require("./models/model");
const projectRouter = require("./routes/classes");
const projectlogin = require("./routes/login");
const { authRole ,checkAuthenticated} = require("./auth");
const connectDb = require("./db/connect");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
app.set("view-engine", "ejs");
const { scopeClasses } = require("./permission/classes");

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SessionSecret,
    resave: false, //should we resave our session vari if nothing has changed
    saveUninitialized: false, // uwanna save empty value
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(setUser);

app.use("/classes", projectRouter);
app.use("/login", projectlogin);

app.get("/", checkAuthenticated, (req, res) => {
  res.send("home");
});

app.get("/dashboard", checkAuthenticated,async (req, res) => {
  const user = req.user;
  try {
    const classes =  await Class.find({});
    res.json(scopeClasses(user, classes));
  } catch (err) {
    res.status(500).json({ msg: "error fetching dash classes" });
  }
});

app.get(
  "/admin",
  authRole("admin"),
  checkAuthenticated,
  (req, res) => {
    res.send("ADmin see all classes");
  }
);

async function setUser(req, res, next) {
  const userid = req.body.userid;
  if (userid) {
    try {
      req.user = await User.findOne({ id: userid });
      if (!req.user) {
        return res.status(401).json({ message: "Invalid User" });
      }
    } catch (err) {
      res.status(500);
      return res.send("failed to fetch users");
    }
  }

  next();
}



async function start() {
  try {
    await connectDb(process.env.MONGO_URL);
    console.log("connected to db");
    app.listen(5000, () => {
      console.log("lestining on 50000");
    });
  } catch (err) {
    console.log(err);
  }
}

start();
