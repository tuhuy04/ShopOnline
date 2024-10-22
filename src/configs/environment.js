import * as dotenv from 'dotenv';
dotenv.config(); 

export const env = {
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: process.env.APP_PORT || 3000,  
  DATABASE_NAME: process.env.DATABASE_NAME || 'test'
};
