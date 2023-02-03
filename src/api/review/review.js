import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import ProductModel from "../products/model.js";
import UsersModel from "../users/model.js";
import ReviewModel from "./model.js";

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res, next) => {
  try {
    const review = await ReviewModel.create(req.body);
    res.status(201).send(review);
  } catch (error) {
    next(error);
  }
});
reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await ReviewModel.findAll({ include: [{ model: UsersModel }, { model: ProductModel }] });
    res.status(201).send(reviews);
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;
