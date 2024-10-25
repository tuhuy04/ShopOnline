import express from "express";
import { boardsRouter } from "./boards.route.js";
import { accessRouter } from "./access.route.js";
import { productsRouter } from "./products.route.js";

const router = express.Router();

router.use("/boards", boardsRouter);
router.use('/auth', accessRouter);
router.use('/products', productsRouter);

export const apiV1 = router;
