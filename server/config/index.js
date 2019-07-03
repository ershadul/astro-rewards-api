module.exports = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || 3000,
  SUPERUSER: process.env.SUPERUSER,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
};
