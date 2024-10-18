import express from "express";
import { boardsRouter } from "./boards.route.js";

const router = express.Router();

router.use("/boards", boardsRouter);

export const apiV1 = router;
