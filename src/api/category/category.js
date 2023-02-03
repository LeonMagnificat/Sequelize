import express from "express";
import CategoryModel from "./model.js";

const categoryRouter = express.Router();

categoryRouter.post("/", async (req, res, next) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.status(201).send(category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await CategoryModel.findAll();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

categoryRouter.post("/bulk", async (req, res, next) => {
  try {
    const categories = await CategoryModel.bulkCreate([{ name: "mobile" }, { name: "TV" }, { name: "Shoes" }, { name: "Cars" }]);
    res.send(categories.map((c) => c));
  } catch (error) {
    next(error);
  }
});

export default categoryRouter;
