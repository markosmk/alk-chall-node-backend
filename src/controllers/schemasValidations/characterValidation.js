const character = {
  name: {
    notEmpty: {
      errorMessage: 'The Name field is required',
      bail: true, // stop next validations
    },
    isString: {
      errorMessage: 'The Name field must be a string',
    },
  },
  age: {
    isInt: {
      errorMessage: 'The Age field must be a integer number',
    },
  },
  weight: {
    isInt: {
      errorMessage: 'The Weight field must be a integer number',
    },
  },
  history: {
    isString: {
      errorMessage: 'The History field must be a string',
    },
  },
  image: {
    isString: {
      errorMessage: 'The Image field must be a string',
    },
  },
};

module.exports = { character };
