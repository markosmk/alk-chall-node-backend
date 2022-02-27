const { validationResult, checkSchema } = require('express-validator');

// parallel processing
const validate = (validations) => {
  // validations = [checkSchema(validations)];
  return async (req, res, next) => {
    await Promise.all(
      [checkSchema(validations)].map((validation) => validation.run(req))
    );
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = validate;
