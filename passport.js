const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./models/model");

// Pre-defined user data
const users = [
  {
    id: 1,
    name: "saacid",
    email: "saacid@gmail.com",
    password: "$2b$10$sEZ2L16DPWnykosmLTbX1uHaIFsjS6x1UPHyL1tIVofbmjb/pukdy",
    role: "admin",
  },
  {
    id: 2,
    name: "jamilo",
    email: "jamilo@gmail.com",
    password: "$2b$10$9C.T0J1sL71H/iWmytKcjuwX8Bd6QOoFG/abttpT6K0txbPp.xPOe", // Hashed password: "password2"
    role: "teacher",
  },
  {
    id: 3,
    name: "nasri",
    email: "nasri@gmail.com",
    password: "$2b$10$S0QNSm2BB9WiCUgYV11qsO7ST2SfrmmsBU2mOzyW3c/FwQttzV8c6", // Hashed password: "password3"
    role: "teacher",
  },
];

// User serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = users.find((user) => user.id === id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Local strategy for authentication
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = users.find((user) => user.email === email);
        if (!user) {
          console.log("No user with that email");
          return done(null, false, { message: "No user with that email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          console.log("No user with that password");
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
