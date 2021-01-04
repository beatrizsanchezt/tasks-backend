const client = require('./client');

function dataClient({ config }) {
  // expose the client so it is available everywhere "server" is available
  return client(config.database);
}

module.exports = dataClient;
