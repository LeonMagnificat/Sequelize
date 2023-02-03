import sequelize from "../../db.js";
import { DataTypes } from "sequelize";

const productCategoryModel = sequelize.define("ProductCategory", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
});

export default productCategoryModel;
