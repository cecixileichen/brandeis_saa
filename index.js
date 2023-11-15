//setup
const mongoose = require("mongoose");
const express = require("express");
const layouts = require("express-ejs-layouts");
const router = express.Router();
const methodOverride = require("method-override");
const connectFlash = require("connect-flash");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

//setup controllers
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const jobsController = require("./controllers/jobsController");

//setup mongoose
mongoose.connect("mongodb://localhost:27017/brandeis_saa");
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to the database!");
});

//use express
const app = express();
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

//setup project
app.set("port", process.env.PORT || 8080);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//setup flash
router.use(connectFlash());
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(cookieParser("secret_passcode"));
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//set routs
app.use("/", router);
router.get("/", homeController.respondHome);
router.get("/about", homeController.respondAbout);
router.get("/contact", homeController.respondContact);
router.get("/event", homeController.respondEvent);
router.get("/jobs", homeController.respondJobs);

//CRUD for users
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

//CRUD for jobs
router.get("/jobs", jobsController.index, jobsController.indexView);
router.get("/jobs/new", jobsController.new);
router.post("/jobs/create", jobsController.create, jobsController.redirectView);
router.get("/jobs/:id/edit", jobsController.edit);
router.put("/jobs/:id/update", jobsController.update, jobsController.redirectView);
router.get("/jobs/:id", jobsController.show, jobsController.showView);
router.delete("/jobs/:id/delete", jobsController.delete, jobsController.redirectView);

//set error routs
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

//start app
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
