import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import ReviewModel from "../review/model.js";

const UsersModel = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UsersModel.hasMany(ReviewModel, { foreignKey: { allowNull: false } });
ReviewModel.belongsTo(UsersModel);

export default UsersModel;
