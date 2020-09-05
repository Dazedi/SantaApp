"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const dotenv = require("dotenv");
const Joi = require("@hapi/joi");
dotenv.config({ path: path.join(__dirname, "../../../.env") });
const envSchema = Joi.object()
    .keys({
    NODE_ENV: Joi.string().valid("development", "production").required(),
    SMTP_USER: Joi.string().required(),
    SMTP_PASS: Joi.string().required(),
    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.number().required()
})
    .unknown();
const { value: env, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const config = {
    env: env.NODE_ENV,
    smtp: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    }
};
exports.default = config;