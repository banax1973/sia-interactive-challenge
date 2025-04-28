import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const SERVER_PORT_DEFAULT = 3000;
const TEMPERATURE_INTERVAL_DEFAULT = 30000

const schema = Joi.object({
  SERVER_PORT: Joi.number().default(SERVER_PORT_DEFAULT),
  LATITUDE: Joi.number().required(),
  LONGITUDE: Joi.number().required(),
  TEMPERATURE_INTERVAL: Joi.number().default(TEMPERATURE_INTERVAL_DEFAULT)
}).unknown();

const { error, value: env } = schema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const PORT = env.SERVER_PORT;
export const LATITUDE = env.LATITUDE;
export const LONGITUDE = env.LONGITUDE;
export const TEMPERATURE_INTERVAL = env.TEMPERATURE_INTERVAL;