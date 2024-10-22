import express from "express";
import { env } from "./configs/environment.js";
import { apiV1 } from "./routes/v1/index.js";
import bodyParser from 'body-parser';

const bootServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });
  app.use("/v1", apiV1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log("Server is running at port: ", env.APP_PORT);
  });  
}

bootServer();
