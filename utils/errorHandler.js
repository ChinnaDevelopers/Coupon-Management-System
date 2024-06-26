const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.message) {
      console.log(err.message);
      res.status(400).render("message", { error: err.message });
      return;
    }
    console.log(err);
    res.status(400).render("message", { error: err });
  } else {
    next();
  }
};

module.exports = errorHandler;
