import sequelize from "../../db.js";
import { DataTypes } from "sequelize";
import productCategoryModel from "./productCategory.js";
import CategoryModel from "../category/model.js";
import ReviewModel from "../review/model.js";

const ProductModel = sequelize.define("product", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

ProductModel.belongsToMany(CategoryModel, {
  through: productCategoryModel,
  foreignKey: { name: "ProductId", allowNull: false },
});
CategoryModel.belongsToMany(ProductModel, {
  through: productCategoryModel,
  foreignKey: { name: "categoryId", allowNull: false },
});

ProductModel.hasMany(ReviewModel, { foreignKey: { allowNull: false } });
ReviewModel.belongsTo(ProductModel);

export default ProductModel;
