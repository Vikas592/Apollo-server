import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import Query from './user';
import { join } from 'path';


const typesArray = loadFilesSync(join(__dirname, './**/*.graphql'));
const typeDefs = mergeTypeDefs(typesArray, { all: true });

export default { resolvers: { Query: { ...Query } }, typeDefs };