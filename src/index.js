import configurations from './config/configurations';
import schema from './modules';
import Server from './src/server';

const server = new Server(configurations);

(() => {
    server.setupApollo(schema);
})();