const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.message) {
      console.log(err.message);
      res.status(400).json({
        status: "error",
        message: err.message,
      });
      return;
    }
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
  } else {
    next();
  }
};

module.exports = errorHandler;
