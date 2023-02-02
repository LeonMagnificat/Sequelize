import sequelize from "../../db.js";
import { DataTypes } from "sequelize";

const ProductModel = sequelize.define("product", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

export default ProductModel;
