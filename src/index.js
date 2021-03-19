const configurations = require('./config/configurations');
const schema = require('./modules');
const Server = require('./server');

const server = new Server(configurations);

(() => {
    server.setupApollo(schema);
})();