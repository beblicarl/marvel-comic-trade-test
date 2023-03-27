import dotenv from 'dotenv';

dotenv.config();

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_LIFETIME: process.env.JWT_LIFETIME,
};
