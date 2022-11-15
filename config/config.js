const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

module.exports = {
  'development': {
    'username': DATABASE_USER,
    'password': DATABASE_PASSWORD,
    'database': DATABASE_NAME,
    'host': DATABASE_HOST,
    'dialect': 'mysql',
  },
  'staging': {
    'username': DATABASE_USER,
    'password': DATABASE_PASSWORD,
    'database': DATABASE_NAME,
    'host': DATABASE_HOST,
    'dialect': 'mysql',
  },
  'production': {
    'username': DATABASE_USER,
    'password': DATABASE_PASSWORD,
    'database': DATABASE_NAME,
    'host': DATABASE_HOST,
    'dialect': 'mysql',
  },
};
