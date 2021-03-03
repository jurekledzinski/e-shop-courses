const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

const port = process.env.PORT || 5000;

require("./configs/passport")(passport);

const {
  atlasUrl,
  nodeEnv,
  sessionName,
  secretSession,
} = require("./configs/config");

console.log(atlasUrl, "atlas url");
console.log(nodeEnv, "nodeEnv");
console.log(sessionName, "sessionName");
console.log(secretSession, "secretSession");
console.log(port, "port");

mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

console.log(db, "To jest db");

mongoose.connection.on("error", (err) => {
  console.log(err, "to jest error mongo");
});
mongoose.connection.once("open", () => {
  console.log("Baza danych podłaczona poprawnie");
});

const loginRouter = require("./routes/login");
const coursesRouter = require("./routes/courses");
const registrationRouter = require("./routes/registration");
const userLoginLogout = require("./routes/userLoginLogout");
const usersRegistered = require("./routes/users");
const cart = require("./routes/cart");
const commentProduct = require("./routes/commentProduct");
const orderDetails = require("./routes/orderDetails");
const orderPaid = require("./routes/orderPaid");
const userProfile = require("./routes/userProfile");
const advertiseSlider = require("./routes/advertiseSlider");
const advertOption = require("./routes/advertOption");

const app = express();

app.use(compression());
app.use(helmet());
app.disable("x-powered-by");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.use(
  session({
    name: sessionName,
    secret: secretSession,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "session",
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 1,
      secure: nodeEnv === "production" ? true : false,
      sameSite: nodeEnv === "production" ? "none" : "lax",
    },
  })
);

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' firebasestorage.googleapis.com *.firebasestorage.googleapis.com mongodb.com *.mongodb.com paypal.com *.paypal.com; img-src * 'self' data: https:;font-src *; object-src 'self';script-src 'self' 'sha256-muinbbhYT4ByGcX7i9h85DyS1kl3Gt7qraXrucPlmEA=' paypal.com *.paypal.com;style-src 'self' 'unsafe-inline' fontawesome.com *.fontawesome.com fonts.google.com *.fonts.google.com fonts.googleapis.com *.fonts.googleapis.com;"
  );
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/login", loginRouter);
app.use("/courses", coursesRouter);
app.use("/register", registrationRouter);
app.use("/user", userLoginLogout);
app.use("/users", usersRegistered);
app.use("/shopping-cart", cart);
app.use("/customer-review", commentProduct);
app.use("/order-details", orderDetails);
app.use("/order-paid", orderPaid);
app.use("/user-profile", userProfile);
app.use("/add-advertise", advertiseSlider);
app.use("/advert-choice", advertOption);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    let pathUrl = req.path.replace(/^\//, "").replace(/\/$/, "");

    if (pathUrl && pathUrl.endsWith(".js")) {
      const options = { headers: { "content-type": "application/javascript" } };
      let index = pathUrl.indexOf("/");
      let nameOfFile = pathUrl.slice(index);
      res.sendFile(
        path.join(__dirname, "client", "build", nameOfFile),
        options
      );
    } else {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    }
  });
}

app.use((error, req, res, next) => {
  console.log(error, "error middleware");
  res.status(error.status || 500);

  res.json({
    alert: error.message,
    statusCode: error.status,
    errorMsg: error.msgError,
  });
});

app.listen(port);

module.exports = app;
