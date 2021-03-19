const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { userQuery } = require('./user');
const { join } = require('path');


const typesArray = loadFilesSync(join(__dirname, './**/*.graphql'));
const typeDefs = mergeTypeDefs(typesArray, { all: true });

module.exports = { resolvers: { Query: { ...userQuery } }, typeDefs };