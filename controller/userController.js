const User = require("../models/People");
const bcrypt = require("bcrypt");

function getUser(req, res, next) {
  res.render("users");
}
async function addUser(req, res, next) {
  let newUser;
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avater: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }
  // save user or send error
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "user was added successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "unknown occured error",
        },
      },
    });
  }
}

module.exports = {
  getUser,
  addUser,
};
