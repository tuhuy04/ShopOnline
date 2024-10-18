import * as dotenv from "dotenv";
dotenv.config("../../.env");

export const env = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME
}
