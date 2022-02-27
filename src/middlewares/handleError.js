const errorHandler = (err, req, res, next) => {
  let error = null;
  if (err.errors) {
    error = err.errors?.map((item) => {
      const { instance, original, ...newItem } = item;
      return newItem;
    });
  } else if (err.message) {
    error = err.message;
  } else {
    error = err;
  }

  res.header('Content-Type', 'application/json');
  return res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: error,
    error: 'Uups..Server error!!! Please contact the system admin',
    data: null,
  });
};

module.exports = errorHandler;
