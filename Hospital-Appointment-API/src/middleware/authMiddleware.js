const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let account = await Doctor.findById(decoded.id);

      if (!account) {
        account = await Patient.findById(decoded.id);
      }

      if (!account) {
        res.status(401);
        throw new Error("Not authorized");
      }

      req.user = account;

      next();

    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };