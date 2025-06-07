const userModel = require("../models/user.model.js");
const userServices = require("../services/user.services.js");
const { validationResult } = require("express-validator");

// module.exports.registerUser = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { firstName, lastName, email, password } = req.body;

//   const hashedPassword = await userModel.hashPassword(password);

//   const user = await userServices.createUser({
//     firstName,
//     lastName,
//     email,
//     password: hashedPassword,
//   });

//   const token = user.generateAuthToken();

//   res.status(201).json({ token, user });
// };

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password); // ✅ Corrected here

  const user = await userServices.createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};
