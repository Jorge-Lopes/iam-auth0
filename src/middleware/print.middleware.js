const printIncomingRequest = (req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  console.log("Headers:", req.headers["cookie"]);
  console.log("Body:", req.body);
  next();
};

export default printIncomingRequest;
