const register = {
  name: {
    notEmpty: {
      errorMessage: 'The Name field is required',
      bail: true, // stop next validations
    },
    isString: {
      errorMessage: 'The Name field must be a string',
    },
  },
  email: {
    notEmpty: {
      errorMessage: 'The Email field is required',
      bail: true,
    },
    isEmail: {
      errorMessage: 'The Email field should be a valid email',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'The Password field is required',
      bail: true,
    },
    isLength: {
      errorMessage: 'Password should be at least 6 chars long',
      options: { min: 6 },
    },
  },
};

const login = {
  email: {
    notEmpty: {
      errorMessage: 'The Email field is required',
      bail: true,
    },
    isEmail: {
      errorMessage: 'The Email field should be a valid email',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'The Password field is required',
      bail: true,
    },
  },
};

const forgetPass = {
  email: {
    notEmpty: {
      errorMessage: 'The Email field is required',
      bail: true,
    },
    isEmail: {
      errorMessage: 'The Email field should be a valid email',
    },
  },
};

const renewPass = {
  email: {
    notEmpty: {
      errorMessage: 'The Email field is required',
      bail: true,
    },
    isEmail: {
      errorMessage: 'The Email field should be a valid email',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'The Password field is required',
      bail: true,
    },
  },
};

module.exports = { register, login, forgetPass, renewPass };
