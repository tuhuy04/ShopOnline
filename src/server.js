import express from "express";
import { env } from "./configs/environment.js";
import { apiV1 } from "./routes/v1/index.js";

const bootServer = () => {
  const app = express();

  app.use(express.json());
  app.use("/v1", apiV1);

  app.listen(env.APP_HOST, env.APP_PORT, () => {
    console.log("Server is running at port: ", env.APP_PORT);
  });
}

bootServer();
