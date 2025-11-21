const errorHandler = (err, req, res, next) => {
  res.locals.title = "Error";
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
};

export default errorHandler;
