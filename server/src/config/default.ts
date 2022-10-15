import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  saltWorkFactor: process.env.SALT,
};
