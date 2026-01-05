const AppError = require('../utils/AppError')

exports.isValidArrayValues = (values, allowedValues) => {
  values.forEach((value) => {
    if (!allowedValues.includes(value)) {
      throw new AppError(`Invalid value provided: ${value}`);
    }
  });
};
