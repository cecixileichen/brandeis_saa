exports.respondAbout = (req, res) => {
  res.render("about");
};

exports.respondHome = (req, res) => {
  res.render("index");
};

exports.respondContact = (req, res) => {
  res.render("contact");
};
exports.respondEvent = (req, res) => {
  res.render("event");
};

exports.respondJobs = (req, res) => {
  res.render("jobs");
};