const config = {
  db: {
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  jwt_secret: process.env.JWT_SECRET,
  app_host: process.env.APP_HOST || 'localhost',
  app_port: process.env.APP_PORT || 8000,
  sendgrid_key: process.env.SENDGRID_KEY,
  sendgrid_verified: process.env.SENDGRID_VERIFIED, //verified sender
};
module.exports = config;
