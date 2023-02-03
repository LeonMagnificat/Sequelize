import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

const ReviewModel = sequelize.define("review", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default ReviewModel;
