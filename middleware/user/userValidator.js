const User = require("../../models/People");
const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
const path = require("path");
const { unlink } = require("fs");

const addUserValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("name msut be 3 characters")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("name must not contain other than character")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("email is already used");
        }
      } catch (error) {
        throw new createError(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("mobile number must be bangladeshi")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("mobile number is already used");
        }
      } catch (error) {
        throw new createError(error.message);
      }
    }),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded file
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
      }
      // response the error
      res.status(500).json({
          errors: mappedErrors
      })
  }
};

module.exports = {
    addUserValidator,
    addUserValidationHandler
};
