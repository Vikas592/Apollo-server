require('dotenv').config();
import * as _Joi from 'joi';
let Joi = _Joi.default;


// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .default('development'),
    PORT: Joi.number()
        .default(9001),
}).unknown()
    .required();

const { value: envVars } = envVarsSchema.validate(process.env);

const configurations = Object.freeze({
    env: envVars.NODE_ENV,
    port: envVars.PORT,
});

export default configurations;