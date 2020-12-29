const client = require('./client');

function dataClient({ config }) {
  // create an instance of the database client
  const configClient = client(config.database);

  // expose the client so it is available everywhere "server" is available
  return configClient;
}

module.exports = dataClient;
