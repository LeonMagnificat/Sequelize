import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import ProductModel from "./model.js";

const productRouter = express.Router();

productRouter.post("/", async (req, res, next) => {
  try {
    const {} = await ProductModel.create(req.body);
  } catch (error) {
    next(error);
  }
});

export default productRouter;
