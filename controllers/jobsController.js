const Job = require("../models/job");
const getJobParams = (body) => {
    return {
      title: body.title,
      company: body.company,
      location: body.location,
      description: body.description,
      requirements: body.requirements,
      salary: body.salary,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      poastDate: body.poastDate,
      deadlineDate: body.deadlineDate,
      isActive: body.isActive,
    };
  };

  module.exports = {
    index: (req, res, next) => {
      Job.find()
        .then((jobs) => {
          console.log(jobs)
          res.locals.jobs = jobs;
          next();
        })
        .catch((error) => {
          console.log(`Error fetching jobs: ${error.message}`);
          next(error);
      });
    },
    indexView: (req, res) => {
      console.log("asdf")
      res.render("jobs/index");
    },
    new: (req, res) => {
      res.render("jobs/new");
    },
    create: (req, res, next) => {
      let jobParams = getJobParams(req.body);
      Job.create(jobParams)
        .then((job) => {
          req.flash(
            "success",
            `${job.title} position created successfully!`
          );
          res.locals.redirect = "/jobs";
          res.locals.job = job;
          next();
        })
        .catch((error) => {
          console.log(`Error saving job: ${error.message}`);
          req.flash(
            "error",
            `Failed to create job because: ${error.message}.`
          );
          res.locals.redirect = "/jobs/new";
          next();
        });
    },
    redirectView: (req, res, next) => {
      let redirectPath = res.locals.redirect;
      if (redirectPath) res.redirect(redirectPath);
      else next();
    },
    show: (req, res, next) => {
      let jobId = req.params.id;
      Job.findById(jobId)
        .then((job) => {
          res.locals.job = job;
          next();
        })
        .catch((error) => {
          console.log(`Error fetching job by ID: ${error.message}`);
          next(error);
        });
    },
    showView: (req, res) => {
      res.render("jobs/show");
    },
    edit: (req, res, next) => {
      let jobId = req.params.id;
      User.findById(jobId)
        .then((job) => {
          res.render("jobs/edit", {
            job: job,
          });
        })
        .catch((error) => {
          console.log(`Error fetching job by ID: ${error.message}`);
          next(error);
        });
    },
    update: (req, res, next) => {
      let jobId = req.params.id,
        jobParams = getJobParams(req.body);
      User.findByIdAndUpdate(jobId, {
        $set: jobParams,
      })
        .then((job) => {
          res.locals.redirect = `/jobs/${jobId}`;
          res.locals.job = job;
          next();
        })
        .catch((error) => {
          console.log(`Error updating job by ID: ${error.message}`);
          next(error);
        });
    },
    delete: (req, res, next) => {
      let jobId = req.params.id;
      User.findByIdAndDelete(jobId)
        .then(() => {
          res.locals.redirect = "/jobs";
          next();
        })
        .catch((error) => {
          console.log(`Error deleting job by ID: ${error.message}`);
          next();
        });
    },
  }