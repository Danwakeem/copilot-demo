const getCredentials = () => {
  if (process.env.NODE_ENV === 'local') {
    require('dotenv').config();
  }

  const {
    username: user,
    host,
    dbname: database,
    password: password,
    port
  } = JSON.parse(process.env.COPILOTDEMOCLUSTER_SECRET);

  return {
    user,
    host,
    database,
    password,
    port
  };
};

module.exports = {
  getCredentials,
};
