const movie = {
  name: {
    notEmpty: {
      errorMessage: 'The Name field is required',
      bail: true, // stop next validations
    },
    isString: {
      errorMessage: 'The Name field must be a string',
    },
  },
  score: {
    isInt: {
      options: { min: 1, max: 5 },
      errorMessage: 'The Score field must be a integer number between 1 and 5',
    },
  },
  dateCreated: {
    isString: {
      errorMessage: 'The Date Created field is required',
    },
  },
  GenderId: {
    isInt: {
      errorMessage: 'The Genero Id field must be a integer number',
      bail: true,
    },
  },
  image: {
    isString: {
      errorMessage: 'The Image field must be a string',
    },
  },
};
module.exports = { movie };
