import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import CategoryModel from "../category/model.js";
import ReviewModel from "../review/model.js";
import ProductModel from "./model.js";
import productCategoryModel from "./productCategory.js";

const productRouter = express.Router();

productRouter.post("/", async (req, res, next) => {
  try {
    const addedProduct = await ProductModel.create(req.body);
    if (req.body.categories) {
      await productCategoryModel.bulkCreate(
        req.body.categories.map((category) => {
          return { categoryId: category, ProductId: addedProduct.id };
        })
      );
    }
    res.status(200).send(addedProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.name) {
      query.name = { [Op.iLike]: `${req.query.name}%` };
    }
    const product = await ProductModel.findAll({ include: [{ model: CategoryModel, attributes: ["name"], through: { attributes: [] } }, { model: ReviewModel }] });
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

productRouter.put("/:productId/categories", async (req, res, next) => {
  try {
    const productCategory = await productCategoryModel.create({
      ProductId: req.params.productId,
      categoryId: req.body.categories,
    });

    res.status(201).send(productCategory);
  } catch (error) {
    next(error);
  }
});

export default productRouter;
