"use strict";
import { Model, DataTypes } from "sequelize";
import DB from "../database/db";

export class User extends Model {}
User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
  },
  {
    sequelize: new DB().getDB(),
  }
);
