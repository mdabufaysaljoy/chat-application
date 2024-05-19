const { validationResult } = require("express-validator");

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedError = errors.mapped();
  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    remove;
    uploaded;
    file;
    if (req.file);
  }
};
