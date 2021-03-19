import express from "express";
import { ApolloServer } from 'apollo-server-express';


export default class Server {

    constructor (config) {
        this.config = config;
        this.app = new express();
        this.run = this.run.bind(this);
    }
    run() {
        const { port, env } = this.config;
        this.httpServer.listen(port, () => {
            console.info(`server is listening on ${port}`);
        });
        return this;
    }

    setupApollo = async (schema) => {
        this.server = new ApolloServer({
            ...schema,
            onHealthCheck: () => new Promise((resolve) => {
                resolve('I am OK');
            }),
        });
        this.server.applyMiddleware({ app });
        this.httpServer = createServer(app);
        this.run();
    };
}

