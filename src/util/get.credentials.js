const getCredentials = () => {
  const {
    username: user,
    host,
    dbname: database,
    password: password,
    port
  } = JSON.parse(process.env.BOOKSTORECLUSTER_SECRET);

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
