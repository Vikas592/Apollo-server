require('dotenv').config();
import { object, string, number } from 'joi';

// define validation for all the env vars
const envVarsSchema = object({
    NODE_ENV: string()
        .default('development'),
    PORT: number()
        .default(9001),
}).unknown()
    .required();

const { value: envVars } = envVarsSchema.validate(process.env);

const configurations = Object.freeze({
    env: envVars.NODE_ENV,
    port: envVars.PORT,
});

export default configurations;