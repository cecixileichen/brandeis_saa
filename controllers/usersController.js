const User = require("../models/user");
const getUserParams = (body) => {
    return {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
      graduationYear: body.graduationYear,
      job: body.job,
      company: body.company,
      city: body.city,
      state: body.state,
      country: body.country,
      zipCode: body.zipCode,
      bio: body.bio,
      interest: body.interest
    };
  };

  module.exports = {
    index: (req, res, next) => {
      console.log("asdf")
      User.find()
        .then((users) => {
          console.log(users)
          res.locals.users = users;
          next();
        })
        .catch((error) => {
          console.log(`Error fetching users: ${error.message}`);
          next(error);
      });
    },
    indexView: (req, res) => {
      res.render("users/index");
    },
    new: (req, res) => {
      res.render("users/new");
    },
    create: (req, res, next) => {
      let userParams = getUserParams(req.body);
      User.create(userParams)
        .then((user) => {
          req.flash(
            "success",
            `${user.fullName}'s account created successfully!`
          );
          res.locals.redirect = "/users";
          res.locals.user = user;
          next();
        })
        .catch((error) => {
          console.log(`Error saving user: ${error.message}`);
          req.flash(
            "error",
            `Failed to create user account because: ${error.message}.`
          );
          res.locals.redirect = "/users/new";
          next();
        });
    },
    redirectView: (req, res, next) => {
      let redirectPath = res.locals.redirect;
      if (redirectPath) res.redirect(redirectPath);
      else next();
    },
    show: (req, res, next) => {
      let userId = req.params.id;
      User.findById(userId)
        .then((user) => {
          res.locals.user = user;
          next();
        })
        .catch((error) => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
    },
    showView: (req, res) => {
      res.render("users/show");
    },
    edit: (req, res, next) => {
      let userId = req.params.id;
      User.findById(userId)
        .then((user) => {
          res.render("users/edit", {
            user: user,
          });
        })
        .catch((error) => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
    },
    update: (req, res, next) => {
      let userId = req.params.id,
        userParams = getUserParams(req.body);
      User.findByIdAndUpdate(userId, {
        $set: userParams,
      })
        .then((user) => {
          res.locals.redirect = `/users/${userId}`;
          res.locals.user = user;
          next();
        })
        .catch((error) => {
          console.log(`Error updating user by ID: ${error.message}`);
          next(error);
        });
    },
    delete: (req, res, next) => {
      let userId = req.params.id;
      User.findByIdAndDelete(userId)
        .then(() => {
          res.locals.redirect = "/users";
          next();
        })
        .catch((error) => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next();
        });
    },
  }