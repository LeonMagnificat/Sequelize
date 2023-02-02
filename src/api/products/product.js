import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import ProductModel from "./model.js";

const productRouter = express.Router();

productRouter.post("/", async (req, res, next) => {
  try {
    const addedProduct = await ProductModel.create(req.body);
    res.status(200).send(addedProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/", async (req, res, next) => {
  try {
    const product = await ProductModel.findAll();
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:productId", async (req, res, next) => {
  const product = await ProductModel.findByPk(req.params.productId);
  if (product) {
    res.status(200).send(product);
  }
});

productRouter.put("/:productId", async (req, res, next) => {
  try {
    const [updatedRow, product] = await ProductModel.update(req.body, { where: { id: req.params.productId }, returning: true });
    console.log(updatedRow);
    if (updatedRow === 1) {
      res.status(200).send(product);
    }
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const updatedRow = await ProductModel.destroy({ where: { id: req.params.productId } });
    if (updatedRow === 1) {
      res.status(200).send({ message: "Product deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
});

export default productRouter;
